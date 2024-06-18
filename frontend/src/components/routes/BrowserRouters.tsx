import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import { LOGS_LINK, LogsView, Page404, TasksView } from "./Elements";

export default function BrowserRouters() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TasksView />} />
          <Route path={LOGS_LINK} element={<LogsView />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  );
}