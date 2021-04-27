import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { FrontPage } from "./pages/FrontPage";
import React from "react";
import { fetchJson, postJson } from "./lib/http";
import { Navbar } from "./components/Navbar";
import { SendMessagePage } from "./pages/SendMessagePage";
import { MessageLogPage } from "./pages/MessageLogPage";

export function Application() {
  const userApi = {
    listUsers: async () => await fetchJson("/api/user"),
    createUsers: async ({ firstName, lastName, email, password }) => {
      return postJson("/api/user", {
        firstName,
        lastName,
        email,
        password,
      });
    },
  };
  const messageApi = {
    listMessages: async () => await fetchJson("/api/message"),
    createMessage: async ({ username, receiver, message }) => {
      return postJson("/api/message", {
        username,
        receiver,
        message,
      });
    },
  };

  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route path="/profile">
            <ProfilePage userApi={userApi} />
          </Route>
          <Route path="/message">
            <SendMessagePage userApi={userApi} messageApi={messageApi} />
          </Route>
          <Route path="/log">
            <MessageLogPage messageApi={messageApi} />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <Route>
            <h1>Not found</h1>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
