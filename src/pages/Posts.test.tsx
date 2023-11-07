import { screen, waitFor } from "@testing-library/dom";

import { pageRender } from "../test/utils";
import Posts from "./Posts";
import { mockEndpoints, mockPostList } from "../test/handlers";
import { server } from "../test/setup";
import { HttpResponse, http } from "msw";

describe("Posts: UI", () => {
  test("render loading string initially", () => {
    pageRender(<Posts />);

    const pageContainer = screen.getByTestId("posts");
    expect(pageContainer).toBeInTheDocument();

    const loading = screen.getByTestId("posts__loading");
    expect(loading).toBeInTheDocument();
  });

  test("render post list after query success", async () => {
    const result = pageRender(<Posts />);

    // await the container first by using findByTestId
    const listContainer = await result.findByTestId("posts__list-container");

    // then check the response content
    expect(listContainer).toBeInTheDocument();
    expect(listContainer.children.length).toBe(mockPostList.length);

    // or you can change the code to this:
    // await waitFor(() => {
    //   const listContainer = result.getByTestId("posts__list-container");

    //   expect(listContainer).toBeInTheDocument();
    //   expect(listContainer.children.length).toBe(mockPostList.length);
    // });
  });

  test("should still render loading string after query failure", async () => {
    server.use(
      http.get(mockEndpoints.getPostList, () => {
        return HttpResponse.error();
      })
    );

    const result = pageRender(<Posts />);

    await waitFor(() => {
      const loadingString = result.getByTestId("posts__loading");
      expect(loadingString).toBeInTheDocument();
    });
  });
});
