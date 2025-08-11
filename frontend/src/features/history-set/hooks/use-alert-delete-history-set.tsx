import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAlertDeleteHistorySetStore } from "@/features/history-set/stores/use-alert-delete-history-set-store";
import { deleteHistorySetService } from "../services/history-set-services";

export const useAlertDeleteHistorySet = () => {
  const router = useRouter();

  const { isOpen, onClose, historySetTitle, historySetId } =
    useAlertDeleteHistorySetStore();

  const onClickDeleteHistorySet = async () => {
    try {
      const { error } = await deleteHistorySetService(historySetId);
      if (error) {
        console.error("error", error);
        toast.error("Failed to delete history set");
        return;
      }

      toast.success("History set deleted successfully");
      router.push("/histories");
    } catch (error) {
      console.error("Error deleting history set:", error);
      toast.error("Error deleting history set");
    }
  };

  return {
    isOpen,
    historySetTitle,
    onClickDeleteHistorySet,
    onClose,
  };
};
