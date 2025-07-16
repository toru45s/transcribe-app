"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/actions/authentications";
import { toast } from "sonner";
import { useUserStore } from "@/stores/use-user-store";
import { useLoginDialogStore } from "@/stores/use-login-dialog-store";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
});

export function FormEditHistorySet() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { login } = useUserStore();
  const { onClose } = useLoginDialogStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);

      // const { data, error } = await loginUser(formData);

      // if (error) {
      //   throw new Error(error);
      // }

      // login(data.access, data.refresh, data.email);

      onClose();
      toast.success("Login successful.");
    } catch (error) {
      console.error(error);
      form.setError("title", {});

      toast.error("Login failed.", {
        description: "Please try again.",
      });
    }
  }

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
                  placeholder="Lecture for AI ethical uses"
                  {...field}
                  type="text"
                  autoComplete="title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          Save
        </Button>
      </form>
    </Form>
  );
}
