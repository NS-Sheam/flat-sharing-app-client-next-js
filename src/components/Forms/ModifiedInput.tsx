import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
};

const ModifiedInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  placeholder,
  required,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ ...sx }}
          label={label}
          {...field}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={placeholder || label}
          required={required || false}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default ModifiedInput;
