import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="input"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-xs text-muted-foreground">
              *{description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
