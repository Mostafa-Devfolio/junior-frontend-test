import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/header/Header.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />

    { /* Wrapping the whole app with the provider so that the app can access the redux storage */ }
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
