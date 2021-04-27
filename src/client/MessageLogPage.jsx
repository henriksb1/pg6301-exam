import React from "react";
import {useLoading} from "./useLoading";
import {ErrorView} from "./ErrorView";
import {LoadingView} from "./LoadingView";
import {fetchJson} from "./http";

export function MessageLogPage({messageApi}) {
    const { data: user, error, loading, reload } = useLoading(
        async () => await messageApi.listMessages()
    );

    const { data: userData, error: errorData, loading: loadingData } = useLoading(() => fetchJson("/api/profile"));


    if (error || errorData) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !user || loadingData) {
        return <LoadingView />;
    }

    const { username } = userData;
    const findSentMessages = user.filter(e => e.username === username)
    console.log(findSentMessages)

    return (
        <div>
            <h1>Message log</h1>
            <h2>Sent messages</h2>
            {findSentMessages.map(({ username, message }) => (
                <div>
                    <p>{"Sender: " + username}</p>
                    <p>{"Message: " + message}</p>
                    <br/>
                </div>
            ))}
            <h2>Received Messages </h2>
        </div>
    )
}