import * as z from "zod";

export const schema = z.object({
  dueDate: z.coerce
    .date()
    .min(new Date(), "Due Dates must be set from today onwards"),
  title: z
    .string()
    .min(1, "Titles need to be longer than ")
    .max(50, "Titles need to be shorter than 50 characters."),
  task: z
    .string()
    .min(1)
    .max(200, "Task should be smaller than 200 characters"),
  isComplete: z.boolean(),
  colour: z.coerce.number(),
});

export type TodoFormData = z.infer<typeof schema>;
