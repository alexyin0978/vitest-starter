import { HttpResponse, http } from "msw";
import { PostType } from "../type";

export const mockPostList: PostType[] = [
  {
    userId: 1,
    id: 1,
    title: "mock title",
    body: "mock body",
  },
  {
    userId: 2,
    id: 2,
    title: "mock title_2",
    body: "mock body_2",
  },
  {
    userId: 3,
    id: 3,
    title: "mock title_3",
    body: "mock body_3",
  },
  {
    userId: 4,
    id: 4,
    title: "mock title_4",
    body: "mock body_4",
  },
  {
    userId: 5,
    id: 5,
    title: "mock title_5",
    body: "mock body_5",
  },
];

export const mockEndpoints = {
  getPostList: "*/posts",
  getPost: "*/posts/:postId",
};

export const handlers = [
  // postList
  http.get(mockEndpoints.getPostList, () => {
    return HttpResponse.json(mockPostList);
  }),
  // post
  http.get(mockEndpoints.getPost, ({ params }) => {
    const { postId } = params;
    return HttpResponse.json(
      mockPostList.find((post) => post.id === Number(postId))
    );
  }),
];
