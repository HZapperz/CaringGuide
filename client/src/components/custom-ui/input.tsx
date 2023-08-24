import React, { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  rules?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  name,
  register,
  errors,
  className,
  rules,
  disabled,
  children,
  ...rest
}) => {
  return (
    <input
      {...register(name, rules)}
      disabled={disabled}
      {...rest}
      className={className}
    />
  );
};

export default CustomInput;
