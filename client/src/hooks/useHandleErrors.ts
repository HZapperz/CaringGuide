import { AuthApiError } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default function useHandleErrors() {
  return async (error: unknown) => {
    if (error instanceof AuthApiError) {
      return toast.error(error.message);
    } else if (error instanceof ZodError) {
      return toast.error(fromZodError(error).toString());
    } else if (error instanceof Error && error.name !== "NetworkError") {
      return toast.error("Something went wrong. Please try again later.");
    }
  };
}
