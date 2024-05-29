import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Colour name can't be blank"),
  hexCode: z.string().min(1, "Colour name can't be blank"),
});
