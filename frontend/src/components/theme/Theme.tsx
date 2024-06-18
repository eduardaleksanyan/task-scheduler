import React from "react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { globalStyles } from "./globalStyles";

export default function Theme() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
    </>
  );
}
