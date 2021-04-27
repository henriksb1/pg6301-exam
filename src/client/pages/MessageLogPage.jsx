import React from "react";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { fetchJson } from "../lib/http";

export function MessageLogPage({ messageApi }) {
  const { data: user, error, loading, reload } = useLoading(
    async () => await messageApi.listMessages()
  );

  const {
    data: userData,
    error: errorData,
    loading: loadingData,
  } = useLoading(() => fetchJson("/api/profile"));

  if (error || errorData) {
    return <ErrorView error={error ? error : errorData} reload={reload} />;
  }

  if (loading || !user || loadingData) {
    return <LoadingView />;
  }

  const { username } = userData;
  const findSentMessages = user.filter((e) => e.username === username);
  console.log(findSentMessages);
  const findReceivedMessages = user.filter((e) => e.receiver === username);

  return (
    <div>
      <h1>Message log</h1>
      <h2>Sent messages</h2>
      {findSentMessages.map(({ id, username, message }) => (
        <div className={"chat"} key={id}>
          <div className={"chat-content"}>
            <p>{"Sender: " + username}</p>
            <p>{"Message: " + message}</p>
          </div>
        </div>
      ))}
      <h2>Received Messages </h2>
      {findReceivedMessages.map(({ id, username, message }) => (
        <div className={"chat"} key={id}>
          <p>{"Sender: " + username}</p>
          <p>{"Message: " + message}</p>
        </div>
      ))}
    </div>
  );
}
