import React from "react";
import Dialog from "@mui/material/Dialog";

interface Props {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}
export default function DialogCustom({ open, handleClose, children }: Props) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        {children}
      </Dialog>
    </>
  );
}
