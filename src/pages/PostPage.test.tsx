import { screen, waitFor } from "@testing-library/dom";

import { pageRender } from "../test/utils";
import PostPage from "./PostPage";
import { mockEndpoints, mockPostList } from "../test/handlers";
import { server } from "../test/setup";
import { HttpResponse, http } from "msw";

describe("PostPage: UI", () => {
  test("render loading string initially", () => {
    pageRender(<PostPage />);

    const container = screen.getByTestId("post-page");
    expect(container).toBeInTheDocument();

    const loadingString = screen.getByTestId("post-page__loading");
    expect(loadingString).toBeInTheDocument();
  });

  test("render post after query success", async () => {
    const MOCK_POST_ID = "1";
    const mockPost = mockPostList.find(
      (post) => post.id === Number(MOCK_POST_ID)
    );
    const result = pageRender(<PostPage mockPostId={MOCK_POST_ID} />);

    const post = await result.findByTestId("post-page__post");
    expect(post).toBeInTheDocument();

    await waitFor(() => {
      if (mockPost) {
        const postBody = result.getByTestId("post-page__post__body");
        expect(postBody).toBeInTheDocument();
        expect(postBody.innerHTML).toBe(`Body: ${mockPost.body}`);
      }
    });
  });

  test("should still render loading string when query failure", async () => {
    server.use(
      http.get(mockEndpoints.getPost, () => {
        return HttpResponse.error();
      })
    );

    const result = pageRender(<PostPage />);

    await waitFor(() => {
      const loadingString = result.getByTestId("post-page__loading");
      expect(loadingString).toBeInTheDocument();
    });
  });
});
