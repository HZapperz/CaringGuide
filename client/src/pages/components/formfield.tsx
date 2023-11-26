import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Input } from '@nextui-org/react';

interface FormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, control, label, type = "text" }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input {...field} bordered size="sm" placeholder={label} color="secondary" type={type} />
      )}
    />
  );
};

export default FormField;
