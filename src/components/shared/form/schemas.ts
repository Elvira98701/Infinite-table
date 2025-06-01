import z from "zod";

export const headers = [
  "name",
  "email",
  "age",
  "city",
  "position",
  "phone",
  "company",
  "level",
  "joined",
  "status",
  "department",
  "username",
  "country",
  "extra",
  "linkedin",
] as const;

const keyEnum = z.enum(headers);

export const createSchema = () =>
  z.object({
    fields: z
      .array(
        z.object({
          key: keyEnum,
          value: z.string().min(1, "The field is required"),
        })
      )
      .min(5, "Minimum of 5 fields")
      .max(15, "Maximum of 15 fields"),
  });

export const initialFields = headers
  .slice(0, 5)
  .map((key) => ({ key, value: "" }));

export const formSchema = createSchema();

export type FormValues = z.infer<typeof formSchema>;
