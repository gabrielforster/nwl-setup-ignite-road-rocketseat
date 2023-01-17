import cors from "@fastify/cors";
import fastify from "fastify";
import { prisma } from "./lib/prisma"

const app = fastify();

app.register(cors)

app.get("/", async (request, reply) => {
  return await prisma.habit.findMany()
})

app.listen({
  port: 3000,
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})