import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { ProfilePage } from "./ProfilePage";
import { LoginPage } from "./LoginPage";
import { FrontPage } from "./FrontPage";
import React from "react";
import {fetchJson, postJson} from "./http";

export function Application() {
    const userApi = {
        listUsers: async () => await fetchJson("/api/user"),
        createUsers: async ({ firstName, lastName, email, password }) => {
            return postJson("/api/user", {
                 firstName, lastName, email, password
            });
        },
    };

  return (
    <BrowserRouter>
      <header>
        <Link to="/">Front page</Link>
      </header>
      <Switch>
        <Route path="/profile">
          <ProfilePage userApi={userApi}/>
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
    </BrowserRouter>
  );
}