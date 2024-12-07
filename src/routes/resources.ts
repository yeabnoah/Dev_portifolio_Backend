import { Hono } from "hono";

const resoursesRoute = new Hono();

resoursesRoute.post("/");

export default resoursesRoute;
