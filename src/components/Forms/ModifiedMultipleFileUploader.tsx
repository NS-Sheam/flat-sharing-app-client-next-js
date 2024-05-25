import React from "react";
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface ModifiedMultipleFileUploaderProps {
  name: string;
  label: string;
}

const ModifiedMultipleFileUploader: React.FC<ModifiedMultipleFileUploaderProps> = ({ name, label }) => {
  const { control, setValue } = useFormContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const files = Array.from((event.target as HTMLInputElement).files as any);
    setValue(name, files, { shouldValidate: true });
    field.onChange(files);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box>
          <TextField
            type="file"
            inputProps={{ multiple: true }}
            onChange={(event) => handleFileChange(event as any, field)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      )}
    />
  );
};

export default ModifiedMultipleFileUploader;
