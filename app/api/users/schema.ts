import { z } from "zod";

const schema = z.object(
  {
    name: z.string().min(3, { message: "The name must be at least 3 characters." }),
    email: z.email({ message: "Invalid email address." }),
  }
);

export type SchemaType = z.infer<typeof schema>;

export default schema;