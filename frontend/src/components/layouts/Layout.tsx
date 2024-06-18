import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from "../menus/SideBar";
import { StyledContent, StyledLayout, StyledSideBar } from "./styles";

export default function Layout() {
    return (
        <StyledLayout>
            <StyledSideBar>
                <SideBar />
            </StyledSideBar>
            <StyledContent>
                <main>
                    <Outlet/>
                </main>
            </StyledContent>
        </StyledLayout>
    );
};