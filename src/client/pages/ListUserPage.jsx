import * as React from "react";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";

export function ListUserPage({ userApi }) {
  const { data: user, error, loading, reload } = useLoading(
    async () => await userApi.listUsers()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !user) {
    return <LoadingView />;
  }

  return (
    <div>
      <h1>All users</h1>
      {user.map(({ id, firstName, lastName, email }) => (
        <li key={id}>{firstName + " " + lastName + ` (${email})`}</li>
      ))}
    </div>
  );
}
