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
import { useDialogEditHistoryStore } from "@/features/history-set/stores/use-dialog-edit-history-store";
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
      console.log("formData onSubmit", formData);
      if (!historySetId) throw new Error("History set ID is required");

      // await updateHistorySet({
      //   historySetId: historySetId,
      //   formData,
      // });

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
