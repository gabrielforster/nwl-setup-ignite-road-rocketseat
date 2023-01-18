import cors from "@fastify/cors";
import fastify from "fastify";

import { habitRoutes } from "./routes/habit";
import { dayRoutes } from "./routes/day"

const app = fastify();

app.register(cors)
app.register(habitRoutes)
app.register(dayRoutes)

app.listen({
  port: 3000,
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})