import { Hono } from "hono";
import prisma from "../lib/db";
import getUser from "../utils/user";
import getUserData from "../controllers/user/getUser";
import updateUser from "../controllers/user/updateUser";

const userRouter = new Hono();

userRouter.get("/", getUserData);

userRouter.patch("/", updateUser);
userRouter.delete("/:id");

export default userRouter;
