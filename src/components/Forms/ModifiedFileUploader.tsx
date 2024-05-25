import * as React from "react";
import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";

type TModifiedFileUploaderProps = {
  name: string;
  type?: string;
  label?: string;
  sx?: SxProps;
};

export default function ModifiedFileUploader({ name, type, label, sx }: TModifiedFileUploaderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ ...sx }}
        >
          {label || "Upload file"}
          <Input
            {...field}
            type={type || "file"}
            value=""
            onChange={(e) => {
              onChange((e.target as HTMLInputElement).files?.[0]);
            }}
            style={{ display: "none" }}
          />
        </Button>
      )}
    />
  );
}
