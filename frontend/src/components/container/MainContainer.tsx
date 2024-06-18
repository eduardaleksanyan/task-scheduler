import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}
export default function MainContainer({ title = "Title", children }: Props) {
  return (
    <Box>
      <Typography sx={{ mb: 2 }} variant={'h5'}>{title}</Typography>
      {children}
    </Box>
  );
}
