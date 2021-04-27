import React from "react";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { fetchJson } from "../lib/http";
import { RegisterUserPage } from "./RegisterUserPage";
import { ListUserPage } from "./ListUserPage";

export function ProfilePage({ userApi }) {
  const { loading, error, data } = useLoading(() => fetchJson("/api/profile"));

  if (error) {
    return <ErrorView error={error} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  const { username } = data;

  return (
    <div>
      <h1>Your profile:</h1>
      <div>Email: {username}</div>
      <RegisterUserPage userApi={userApi} />
      <ListUserPage userApi={userApi} />
    </div>
  );
}
