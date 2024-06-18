import * as React from 'react';
import { StyledBox } from "./styles";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
}
