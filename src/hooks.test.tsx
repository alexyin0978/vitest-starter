import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";

import { useGetPost, useGetPostList } from "./hooks";
import { createQueryTestWrapper } from "./test/utils";
import { mockEndpoints, mockPostList } from "./test/handlers";
import { server } from "./test/setup";

describe("query hook: useGetPostList", () => {
  test("successful query hook", async () => {
    const { result } = renderHook(() => useGetPostList(), {
      wrapper: createQueryTestWrapper(),
    });

    // !!NOTE: need to waitFor the query to resolve
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // then we test the result
    expect(result.current.data?.length).toBe(mockPostList.length);
    if (result.current.data) {
      expect(result.current.data[0].title).toBe(mockPostList[0].title);
      expect(result.current.data[1].title).toBe(mockPostList[1].title);
    }
  });

  test("failure query hook", async () => {
    server.use(
      http.get(mockEndpoints.getPostList, () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useGetPostList(), {
      wrapper: createQueryTestWrapper(),
    });

    // !!NOTE: need to waitFor the query to resolve
    await waitFor(() => expect(result.current.isError).toBe(true));
    // then we test the result
    expect(result.current.error).toBeDefined();
  });
});

describe("query hook: useGetPost", () => {
  const POST_ID = 1;
  const mockPost = mockPostList.find((post) => post.id === POST_ID);

  test("successful query hook", async () => {
    const { result } = renderHook(
      () => useGetPost({ postId: String(POST_ID) }),
      {
        wrapper: createQueryTestWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe(mockPost?.title);
    expect(result.current.data?.body).toBe(mockPost?.body);
  });

  test("failure query hook", async () => {
    server.use(
      http.get(mockEndpoints.getPost, () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(
      () => useGetPost({ postId: String(POST_ID) }),
      {
        wrapper: createQueryTestWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
