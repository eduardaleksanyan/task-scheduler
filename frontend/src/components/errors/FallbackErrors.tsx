import React from "react";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

interface Props {
  error: object | string | Error;
}

export default function FallbackErrors({ error }: Props) {
  return (
    <Alert severity="error">
      <Typography variant="subtitle1">Something went wrong:</Typography>
      <Typography variant="body1">
        {error instanceof Error
          ? error.toString()
          : typeof error === "object"
            ? JSON.stringify(error)
            : error}
      </Typography>
    </Alert>
  );
}
