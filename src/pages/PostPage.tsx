import { useParams } from "react-router";
import { useGetPost } from "../hooks";

const PostPage = () => {
  const { postId } = useParams();

  const { data: post } = useGetPost({ postId });

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
