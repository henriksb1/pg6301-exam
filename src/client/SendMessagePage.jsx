import React, {useState} from "react";
import {InputField} from "./InputField";
import {useLoading} from "./useLoading";
import {fetchJson} from "./http";
import {ErrorView} from "./ErrorView";
import {LoadingView} from "./LoadingView";

export function SendMessagePage({userApi, messageApi}) {
    const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");

    const { data: profileData, profileError, profileLoading } = useLoading(() => fetchJson("/api/profile"));

    const { data: user, error, loading, reload } = useLoading(
        async () => await userApi.listUsers()
    );

    if (error || profileError) {
        return <ErrorView error={(error ? error : profileError)} />;
    }

    if (profileLoading || !user) {
        return <LoadingView />;
    }

    const { username } = profileData;

    async function submit(e) {
        e.preventDefault();
        await messageApi.createMessage({ username, receiver, message });
    }

    return (
        <form onSubmit={submit}>
            <h1>Send new message</h1>
            <InputField
                label={"Message"}
                value={message}
                onValueChange={setMessage}
            />
            <label>
                Receiver: {" "}
                <select onChange={(e) => setReceiver(e.target.value)}>
                <option/>
                {user.map(({ id, email }) => (
                    <option key={id}>{email}</option>
                ))}
            </select></label>
            <br/>
            <button>Submit</button>
        </form>
    );
}