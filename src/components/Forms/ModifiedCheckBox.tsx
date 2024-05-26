import { Checkbox, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  required?: boolean;
  sx?: SxProps;
  [key: string]: any;
};

const ModifiedCheckBox = ({ name, required, sx, ...props }: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
      }}
      render={({ field }) => (
        <Checkbox
          {...props}
          sx={{ ...sx }}
          {...field}
          required={required || false}
        />
      )}
    />
  );
};

export default ModifiedCheckBox;
