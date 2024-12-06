import { Hono } from "hono";
import prisma from "../lib/db";

const userRouter = new Hono();

userRouter.get("/", async (c) => {
  const user = await prisma.user.findUnique({
    where: { id: "EmR0RqlZ6Zjs38vMeuR8D" },
  });

  return c.json(user);
});

export default userRouter;
