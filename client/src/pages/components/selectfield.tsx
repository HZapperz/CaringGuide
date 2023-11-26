import React from 'react';
import { useForm } from 'react-hook-form';

interface SelectFieldProps {
  name: string;
  register: ReturnType<typeof useForm>["register"];
  label: string;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ name, register, label, options }) => {
  return (
    <select {...register(name, { required: true })} aria-label={label}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default SelectField;
