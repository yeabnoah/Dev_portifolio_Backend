import { Hono } from "hono";

const skillRoute = new Hono()

skillRoute.post("/")
skillRoute.patch("/:id")
skillRoute.delete("/:id")

export default skillRoute