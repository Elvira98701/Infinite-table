import { Button, Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { formSchema, headers, initialFields, type FormValues } from "./schemas";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { sendFormData } from "@/services/api";

interface FormProps {
  className?: string;
}

export const Form = ({ className }: FormProps) => {
  const mutation = useMutation({
    mutationFn: (newData: Record<string, string>) => sendFormData(newData),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fields: initialFields,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const addField = () => {
    if (fields.length >= 15) return;

    const existingKeys = fields.map((f) => f.key);
    const nextKey = headers.find((key) => !existingKeys.includes(key));
    if (nextKey) {
      append({ key: nextKey, value: "" });
    }
  };

  const onFormSubmit = (data: { fields: { key: string; value: string }[] }) => {
    const result: Record<string, string> = {};
    data.fields.forEach(({ key, value }) => {
      result[key] = value;
    });

    mutation.mutate(result);
  };

  return (
    <div className={cn("", className)}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex items-center gap-2 mb-2">
              <Label
                className="min-w-24 font-bold"
                htmlFor={`fields.${index}.value`}
              >
                {field.key}
              </Label>
              <Input
                {...register(`fields.${index}.value` as const)}
                id={`fields.${index}.value`}
                type="text"
                className="border py-1 rounded-md flex-grow bg-background"
              />
              {fields.length > 5 && (
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 font-bold"
                  variant="outline"
                  size="icon"
                >
                  <X />
                </Button>
              )}
            </div>
            {errors.fields?.[index]?.value && (
              <p className="text-red-600 text-sm">
                {errors.fields[index].value?.message} *
              </p>
            )}
          </div>
        ))}

        {fields.length < 15 && (
          <Button
            type="button"
            onClick={addField}
            variant="outline"
            className="mr-3"
          >
            Add a field
          </Button>
        )}

        <Button
          type="submit"
          loading={mutation.isPending}
          disabled={mutation.isPending}
          className="min-w-32"
        >
          Send
        </Button>
      </form>
    </div>
  );
};
