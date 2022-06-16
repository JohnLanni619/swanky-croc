import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./pages/App";
import Games from "./pages/Games";
import SingleGame from "./pages/SingleGame";
import "./styles/styles.css";

const client = new ApolloClient({
  uri: "http://localhost:3500/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<SingleGame />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
