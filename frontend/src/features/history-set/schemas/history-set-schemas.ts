import { z } from "zod";

export const historySetEditSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
});
