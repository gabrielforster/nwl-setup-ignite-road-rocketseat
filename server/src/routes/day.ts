import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function dayRoutes(app: FastifyInstance){
  app.get("/day", async (request) => {
    
    const getDayParam = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParam.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')

    const allPossibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        weekDays: {
          some: {
            week_day: parsedDate.get('day')
          },
        },
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabits: true
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.habit_id)

    return { allPossibleHabits, completedHabits  }
  });
}