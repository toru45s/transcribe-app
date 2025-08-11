"use client";

import { Button } from "@/client/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { Input } from "@/client/components/ui/input";
import { useFormEditHistorySet } from "../hooks/use-form-edit-history-set";

type Props = {
  callback: () => void;
};

export function FormEditHistorySet({ callback }: Props) {
  const { form, onSubmit } = useFormEditHistorySet(callback);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="subtitle title"
                  {...field}
                  type="text"
                  autoComplete="title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full md:w-auto"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
