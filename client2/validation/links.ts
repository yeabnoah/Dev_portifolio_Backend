import { z } from "zod";

const linkSchema = z.object({
  linkedIn: z.string().url("Invalid LinkedIn URL").optional(),
  telegram: z.string().url("Invalid Telegram URL").optional(),
  github: z.string().url("Invalid GitHub URL").optional(),
  x: z.string().url("Invalid X URL").optional(),
});

export default linkSchema;
