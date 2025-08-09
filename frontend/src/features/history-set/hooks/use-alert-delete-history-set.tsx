import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAlertDeleteHistorySetStore } from "@/features/history-set/stores/use-alert-delete-history-set-store";

export const useAlertDeleteHistorySet = () => {
  const router = useRouter();

  const { isOpen, onClose, historySetTitle } = useAlertDeleteHistorySetStore();

  const onClickDeleteHistorySet = async () => {
    try {
      // await deleteHistorySet({ historySetId });
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
