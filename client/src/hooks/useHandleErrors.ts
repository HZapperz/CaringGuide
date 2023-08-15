import { AuthApiError } from "@supabase/supabase-js";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default function useHandleErrors() {
  return async (error: unknown) => {
    if (error instanceof AuthApiError) {
      return toast.error(error.message);
    } else if (error instanceof ZodError) {
      return toast.error(fromZodError(error).toString());
    } else if (error instanceof AxiosError && error.status === 400) {
      return toast.error(error.response?.data.message ?? "Bad request.");
    } else if (error instanceof AxiosError && error.status === 401) {
      return toast.error("You are not authorized to perform this action.");
    } else if (error instanceof AxiosError && error.status === 500) {
      return toast.error("Something went wrong. Please try again later.");
    }
  };
}
