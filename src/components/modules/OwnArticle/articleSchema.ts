import z from "zod";

export const articleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, { message: "Title must be at least 10 characters" })
    .max(60, { message: "Title can't exceed 60 characters" }),
  body: z
    .string()
    .trim()
    .min(250, { message: "Content must be at least 250 characters" }),
  tags: z
    .array(z.string())
    .min(1, { message: "Please select at least one tag" }),
});