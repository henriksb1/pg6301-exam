import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { ListUserPage } from "../src/client/pages/ListUserPage";

const userApi = {
  listUsers: async () => [
    {
      id: 1,
      firstName: "Per",
      lastName: "Borgli",
      email: "per@borgli",
      password: "123",
    },
  ],
};

async function renderForTest(child) {
  const container = document.createElement("div");
  await act(async () => {
    await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
  });
  return container;
}

describe("list users component", () => {
  it("should show users on dom", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <ListUserPage userApi={userApi} />
        </MemoryRouter>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("li").textContent).toEqual(
      "Per Borgli (per@borgli)"
    );
  });

  it("should show loading screen", async () => {
    const listUsers = () => new Promise((resolve) => {});
    const container = await renderForTest(
      <ListUserPage userApi={{ listUsers }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual("Loading...");
  });

  it("should show error message", async () => {
    const listUsers = () => {
      throw new Error("Failed to load");
    };
    const container = await renderForTest(
      <ListUserPage userApi={{ listUsers }} />
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("div").textContent).toEqual(
      "An error occurred: Error: Failed to load"
    );
  });
});
