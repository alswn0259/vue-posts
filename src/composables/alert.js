import { useAlertStore } from "@/stores/alert"
import { storeToRefs } from "pinia"

export function useAlert() {
  const { alerts } = storeToRefs(useAlertStore());
  const { vAlert, vSuccese } = useAlertStore();
  return {
    alerts,
    vAlert,
    vSuccese,
  }
}