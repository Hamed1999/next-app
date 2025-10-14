import { z } from "zod";

const schema = z.object(
  {
    name: z.string().min(3, { message: "The name must be at least 3 characters." }),
    price: z.number().min(0.001, { message: "The price mustn't be empty." }),
  }
);

export type SchemaType = z.infer<typeof schema>;

export default schema;