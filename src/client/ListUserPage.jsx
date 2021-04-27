import * as React from "react";
import { ErrorView } from "./ErrorView";
import { LoadingView } from "./LoadingView";
import { useLoading } from "./useLoading";
import { Link } from "react-router-dom";

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
      <h1>Edit users</h1>
      {user.map(({ id, firstName, lastName, email }) => (
        <li key={id}>
          <Link to={`/user/${id}/edit`}>
            {firstName + " " + lastName + ` (${email})`}
          </Link>
        </li>
      ))}
    </div>
  );
}
