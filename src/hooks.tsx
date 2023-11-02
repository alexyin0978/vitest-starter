import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchPostList } from "./api";

export const useGetPostList = () =>
  useQuery({
    queryKey: ["fetchPostList"],
    queryFn: () => fetchPostList(),
    refetchOnWindowFocus: false,
    select: (resp) => {
      return resp.slice(0, 15);
    },
  });

export const useGetPost = ({ postId }: { postId: string | undefined }) =>
  useQuery({
    queryKey: ["fetchPost", postId],
    queryFn: () => fetchPost({ postId: postId as string }),

    enabled: postId !== undefined,
    refetchOnWindowFocus: false,
  });
