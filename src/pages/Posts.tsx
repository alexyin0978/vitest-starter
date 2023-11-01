import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { fetchPostList } from "../api";

const Posts = () => {
  const navigate = useNavigate();

  const { data: postList } = useQuery({
    queryKey: ["fetchPostList"],
    queryFn: () => fetchPostList(),
    refetchOnWindowFocus: false,
    select: (resp) => {
      return resp.slice(0, 10);
    },
  });

  return (
    <div>
      {!postList ? (
        "loading posts..."
      ) : (
        <>
          {postList.map((post, idx) => (
            <div
              key={post.id}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <div>{idx}</div>
              <div>{post.title}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;
