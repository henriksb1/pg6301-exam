import React, {useState} from "react";
import {InputField} from "./InputField";
import {useLoading} from "./useLoading";
import {fetchJson} from "./http";
import {ErrorView} from "./ErrorView";
import {LoadingView} from "./LoadingView";

export function SendMessagePage({userApi, messageApi}) {
    //const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");

    const { loading, error, data } = useLoading(() => fetchJson("/api/profile"));

    if (error) {
        return <ErrorView error={error} />;
    }
    if (loading || !data) {
        return <LoadingView />;
    }

    const { username } = data;

    async function submit(e) {
        e.preventDefault();
        await messageApi.createMessage({ username, message });
    }

    return (
        <form onSubmit={submit}>
            <h1>Send new message</h1>
            <InputField
                label={"Message"}
                value={message}
                onValueChange={setMessage}
            />
            <button>Submit</button>
        </form>
    );
}