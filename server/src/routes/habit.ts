import { FastifyInstance } from "fastify"
import { z } from "zod"
import dayjs from "dayjs"

import { prisma } from "../lib/prisma"

export async function habitRoutes(app: FastifyInstance) {

  app.get("/habits", async (request, reply) => {
    const habits = await prisma.habit.findMany()
    reply.send(habits)
  })

  app.post("/habits", async (request, reply) => {

    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    })

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf("day").toDate()

    const habit = await prisma.habit.create({
      data: {
        title,
        created_at: today, 
        weekDays: {
          create: weekDays.map((day) => {
            return { week_day: day }
          }),
        }
      },
    })
    return habit
  })
}