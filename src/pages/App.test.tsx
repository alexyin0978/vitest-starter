import { screen } from "@testing-library/react";
import App from "./App";

import { pageRender } from "../test/utils";

describe("App: UI", () => {
  beforeEach(() => {
    pageRender(<App />);
  });

  test("should renders App", () => {
    const app = screen.getByTestId("app");
    expect(app).toBeInTheDocument();
  });
  test("should renders link and being able to be clicked", () => {
    const link = screen.getByTestId("app__link");
    expect(link).toBeInTheDocument();
    expect(link).not.toBeDisabled();
  });
  test("should only have one children node inside app", () => {
    const app = screen.getByTestId("app");
    expect(app.children.length).toBe(1);
  });
});
