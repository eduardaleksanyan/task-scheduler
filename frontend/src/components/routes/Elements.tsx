import React, { Suspense, lazy, ElementType } from 'react';
import Loading from "../loading/Loading";

export const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

export const TasksView = Loadable(lazy(() => import('../../views/tasks/Tasks')));
export const LogsView = Loadable(lazy(() => import('../../views/logs/Logs')));
export const Page404 = Loadable(lazy(() => import('../../views/errors/Page404')));

export const TASK_LINK = '/';
export const LOGS_LINK = '/logs';