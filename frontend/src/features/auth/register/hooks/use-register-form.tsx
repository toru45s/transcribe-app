import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerService } from "@/features/auth/register/services/register-services";
import { toast } from "sonner";
import { useRegisterDialogStore } from "@/features/auth/register/stores/use-register-dialog-store";
import { useLoginDialogStore } from "@/features/auth/token/stores/use-login-dialog-store";
import { registerSchema } from "@/features/auth/register/schemas/register-schema";

export function useRegisterForm() {
  const { onClose } = useRegisterDialogStore();
  const { onOpen } = useLoginDialogStore();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const { data, error } = await registerService(
        values.email,
        values.password
      );

      if (error) {
        toast.error("Account creation failed.", {
          description: "Please try again.",
        });

        form.setError("email", { type: "server" });
        form.setError("password", { type: "server" });
        form.setError("password_confirmation", { type: "server" });
        return;
      }

      toast.success("Account created successfully.", {
        description: "Please login to continue.",
      });

      form.reset();
      onClose();
      onOpen();

      console.log("data", data);
    } catch {
      toast.error("Account creation failed.", {
        description: "Please try again.",
      });

      form.setError("email", { type: "server" });
      form.setError("password", { type: "server" });
      form.setError("password_confirmation", { type: "server" });
    }
  }

  return {
    form,
    onSubmit,
  };
}
