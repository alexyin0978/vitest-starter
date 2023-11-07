import { useParams } from "react-router";
import { useGetPost } from "../hooks";

const PostPage = ({ mockPostId }: { mockPostId?: "1" }) => {
  const { postId } = useParams();

  const { data: post } = useGetPost({ postId: mockPostId || postId });

  return (
    <div data-testid="post-page">
      this is post-page {postId}
      <div>
        {!post ? (
          <div data-testid="post-page__loading">loading...</div>
        ) : (
          <div data-testid="post-page__post">
            <h3>Title: {post.title}</h3>
            <p data-testid="post-page__post__body">Body: {post.body}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
