import { Application } from "../src/client/Application";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

describe("application", () => {
  it("can show home page", async () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Application />
      </MemoryRouter>,
      container
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Welcome 👋🏻");
  });

  it("can navigate to login page", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <MemoryRouter>
          <Application />
        </MemoryRouter>,
        container
      );
    });
    const loginLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Login"
    );
    await act(async () => {
      await loginLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual("Please log in");
  });
});
