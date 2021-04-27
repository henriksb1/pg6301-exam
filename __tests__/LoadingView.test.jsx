import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { LoadingView } from "../src/client/components/LoadingView";

describe("loading view", () => {
  it("should show loading view on dom", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<LoadingView />, container);
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
