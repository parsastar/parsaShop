import type {
  Control,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type TRhfProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  isSubmitting: boolean;
  reset: UseFormReset<T>;
  control: Control<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  onSubmit: SubmitHandler<T>;
  getValues: UseFormGetValues<T>;
};
