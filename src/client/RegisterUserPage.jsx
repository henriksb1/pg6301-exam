import * as React from "react";
import { useState } from "react";
import { InputField } from "./InputField";

export function RegisterUserPage({ userApi }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    await userApi.createUsers({ firstName, lastName, email, password });
  }

  return (
    <form onSubmit={submit}>
      <h1>Create new user</h1>
      <InputField
        label={"First Name"}
        value={firstName}
        onValueChange={setFirstName}
      />
      <InputField
        label={"Last Name"}
        value={lastName}
        onValueChange={setLastName}
      />
      <InputField
        label={"Email Address"}
        value={email}
        onValueChange={setEmail}
      />
      <InputField
        label={"Password"}
        value={password}
        onValueChange={setPassword}
      />
      <button>Submit</button>
    </form>
  );
}
