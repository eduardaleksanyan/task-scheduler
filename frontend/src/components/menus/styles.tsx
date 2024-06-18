import { styled } from "@mui/material";
export const StyledNav = styled('nav')`
    a {
        display: block;
        margin-bottom: 1rem;
        background-color: #1976d2;
        border-radius: 5px;
        color: white;
        text-align: center;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;