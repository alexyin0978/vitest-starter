import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// run the cleanup to clearing jsdom after every test
afterEach(() => {
  cleanup();
});
