import React from 'react';
import { Link } from 'react-router-dom';
import { LOGS_LINK, TASK_LINK } from "../routes/Elements";
import { StyledNav } from "./styles";

export default function SideBar() {
  return (
    <StyledNav>
        <Link to={TASK_LINK}>Tasks</Link>
        <Link to={LOGS_LINK}>Logs</Link>
    </StyledNav>
  );
};