import ReactDOM from "react-dom/client";
import config from "./config/router";
import App from "./App";
import {
  UIRouter,
  pushStateLocationPlugin,
} from "@uirouter/react";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";


const client = new ApolloClient({
  uri: "http://127.0.0.1:5000/graphql",
  cache: new InMemoryCache(),
});




const loginState = { name: "login", url: "/login", component: LoginPage };

const homeState = { name: "home", url: "/home", component: HomePage };

await client.refetchQueries({
  include: "active",
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <UIRouter plugins={[pushStateLocationPlugin]}
    states={[loginState, homeState]}
    config={config}>
      <App />
    </UIRouter>
    ,
  </ApolloProvider>
);
