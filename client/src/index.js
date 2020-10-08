import "intersection-observer";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import App from "./components/App";
import store from "./store";
import { client } from "./graphql";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);
