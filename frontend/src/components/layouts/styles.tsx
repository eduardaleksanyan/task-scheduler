import { Box, styled } from "@mui/material";

export const StyledLayout = styled(Box)`
  display: flex;
  min-height: 100vh;
`;

export const StyledSideBar = styled(Box)`
    flex-basis: 200px;
    background: #dbd9d9;
    padding: 20px;
`;

export const StyledContent = styled(Box)`
    flex-grow: 10;
    padding: 20px;
`;
