import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { historySetEditSchema } from "../schemas/history-set-schemas";
import { useDialogEditHistoryStore } from "../stores/use-dialog-edit-history-store";
import { useEffect } from "react";
import { toast } from "sonner";
import { patchHistorySetService } from "../services/history-set-services";

export const useFormEditHistorySet = (callback: () => void) => {
  const form = useForm<z.infer<typeof historySetEditSchema>>({
    resolver: zodResolver(historySetEditSchema),
    defaultValues: {
      title: "",
    },
  });

  const { historySetId, historySetTitle, onClose } =
    useDialogEditHistoryStore();

  useEffect(() => {
    form.setValue("title", historySetTitle || "");
  }, [historySetTitle, form]);

  async function onSubmit(values: z.infer<typeof historySetEditSchema>) {
    try {
      if (!historySetId) throw new Error("History set ID is required");

      const { error } = await patchHistorySetService(
        historySetId,
        values.title
      );

      if (error) {
        form.setError("title", {
          message: "Error updating history set.",
        });

        toast.error("Error updating history set.", {
          description: error?.message,
        });

        return;
      }

      callback();

      onClose();
      toast.success("History set updated successfully.");
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

  return { form, onSubmit };
};
