import React, { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  rules?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
}

const CustomTextArea: React.FC<InputProps> = ({
  label,
  name,
  register,
  errors,
  rules,
  disabled,
  className,
  children,
  ...rest
}) => {
  return (
    <textarea
      {...register(name, rules)}
      disabled={disabled}
      className={className}
      {...rest}
    />
  );
};

export default CustomTextArea;
