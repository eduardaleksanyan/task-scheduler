import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrors from "./components/errors/FallbackErrors";
import BrowserRouters from "./components/routes/BrowserRouters";
import Theme from "./components/theme/Theme";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={FallbackErrors}>
      <Provider store={store}>
        <Theme />
        <SnackbarProvider autoHideDuration={1500}>
          <BrowserRouters />
        </SnackbarProvider>
      </Provider>
    </ErrorBoundary>
  );
}
