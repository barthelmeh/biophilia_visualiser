import { toast } from "sonner-native";

const ErrorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    richColors: true,
  });
};

const SuccessToast = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    richColors: true,
  });
};

export { ErrorToast, SuccessToast };
