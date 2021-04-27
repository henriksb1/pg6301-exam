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
});
