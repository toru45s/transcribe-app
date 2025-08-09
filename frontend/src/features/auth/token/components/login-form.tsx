"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "sonner";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useLoginDialogStore } from "@/features/auth/token/stores/use-login-dialog-store";
import { loginService } from "@/features/auth/token/services/login-services";

const formSchema = z.object({
  email: z.email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useUserStore();
  const { onClose } = useLoginDialogStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data, error } = await loginService(values.email, values.password);

      if (error) {
        throw new Error(error);
      }

      if (data?.email) {
        login({ email: data.email });
      }

      onClose();
      toast.success("Login successful.");
    } catch {
      form.setError("email", {});
      form.setError("password", {});

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  type="email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">
          Login
        </Button>
      </form>
    </Form>
  );
}
