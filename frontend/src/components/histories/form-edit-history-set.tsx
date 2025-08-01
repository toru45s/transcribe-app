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
import { toast } from "sonner";
import { useUserStore } from "@/stores/use-user-store";
import { useDialogEditHistoryStore } from "@/stores/use-dialog-edit-history-store";
import { updateHistorySet } from "@/actions/history-set";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

  const { token } = useUserStore();
  const { historySetId, historySetTitle, onClose } =
    useDialogEditHistoryStore();
  const router = useRouter();
  useEffect(() => {
    form.setValue("title", historySetTitle || "");
  }, [historySetTitle, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);

      if (!token) throw new Error("Token is required");
      if (!historySetId) throw new Error("History set ID is required");

      await updateHistorySet({ token, historySetId: historySetId, formData });

      onClose();
      toast.success("History set updated successfully.");
      router.refresh();
    } catch (error) {
      console.error(error);
      form.setError("title", {
        message: "Error updating history set.",
      });

      toast.error("Error updating history set.", {
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
