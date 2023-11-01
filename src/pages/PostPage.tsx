import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchPost } from "../api";

const PostPage = () => {
  const { postId } = useParams();

  const { data: post } = useQuery({
    queryKey: ["fetchPost", postId],
    queryFn: () => fetchPost({ postId: postId as string }),

    enabled: postId !== undefined,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      this is post-page {postId}
      <div>
        {!post ? (
          "loading..."
        ) : (
          <>
            <h3>Title: {post.title}</h3>
            <p>Body: {post.body}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
