import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import { RegisterUserPage } from "../src/client/pages/RegisterUserPage";

function findInputByLabel(form, label) {
  const titleLabel = [...form.querySelectorAll("label")].find((l) =>
    l.textContent.startsWith(label)
  );
  return titleLabel.querySelector("input");
}

function changeValue(input, value) {
  act(() => {
    Simulate.change(input, { target: { value } });
  });
}

function testFindInput(form, label) {
  return form
    .findAllByType("label")
    .find((p) => p.props.children.join("").startsWith(label))
    .findByType("input");
}

function testChangeValue(input, value) {
  TestRenderer.act(() => {
    input.props.onChange({ target: { value } });
  });
}

describe("create users view", () => {
  it("test renders view", async () => {
    const createUsers = jest.fn();
    let view;
    await TestRenderer.act(async () => {
      view = TestRenderer.create(
        <MemoryRouter>
          <RegisterUserPage userApi={{ createUsers }} />
        </MemoryRouter>
      );
    });
    expect(view.toJSON()).toMatchSnapshot();
    const form = view.root.findByType("form");
    testChangeValue(testFindInput(form, "First Name"), "My First Name");
    testChangeValue(testFindInput(form, "Last Name"), "My Last Name");
    testChangeValue(testFindInput(form, "Email Address"), "My Email Address");
    testChangeValue(testFindInput(form, "Password"), "My Password");
    form.props.onSubmit({ preventDefault() {} });
    expect(createUsers).toBeCalledWith({
      firstName: "My First Name",
      lastName: "My Last Name",
      email: "My Email Address",
      password: "My Password",
    });
  });

  it("renders on real DOM", async () => {
    const createUsers = jest.fn();
    const container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <RegisterUserPage userApi={{ createUsers }} />
        </MemoryRouter>,
        container
      );
    });
    expect(container.innerHTML).toMatchSnapshot();

    const form = container.querySelector("form");
    await changeValue(findInputByLabel(form, "First Name"), "My First Name");
    await changeValue(findInputByLabel(form, "Last Name"), "My Last Name");
    await changeValue(
      findInputByLabel(form, "Email Address"),
      "My Email Address"
    );
    await changeValue(findInputByLabel(form, "Password"), "My Password");
    Simulate.submit(form);
    expect(createUsers).toBeCalledWith({
      firstName: "My First Name",
      lastName: "My Last Name",
      email: "My Email Address",
      password: "My Password",
    });
  });
});
