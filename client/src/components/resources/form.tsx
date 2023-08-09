import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resourceSchema } from "@/schema/resources";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { nanoid } from "nanoid";

const formSchema = resourceSchema;

export type FormValues = z.infer<typeof formSchema>;

interface Props {
  defaultValues?: Partial<FormValues>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isSubmitting: boolean;
}

export default function AccountForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: Props) {
  const supabase = useSupabaseClient();
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function handleSubmit(formValues: FormValues) {
    if (file) {
      const { data, error } = await supabase.storage
        .from("resource-images")
        .upload(formValues.image, file);

      if (!data) {
        return;
      }
    }

    if (formValues.image) {
      onSubmit(formValues);
    }
  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        className="space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="subtitle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"active"}>Blocked</SelectItem>
                  <SelectItem value={"inactive"}>Allowed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setFile(file);
                      field.onChange(nanoid());
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting}>Submit</Button>
      </form>
    </Form>
  );
}
