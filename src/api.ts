import { PostType } from "./type";

export const fetchPostList = async () => {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    const rst = await resp.json();
    return rst as PostType[];
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchPost = async ({ postId }: { postId: string }) => {
  try {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const rst = await resp.json();

    return rst as PostType;
  } catch (err) {
    return Promise.reject(err);
  }
};
