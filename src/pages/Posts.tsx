import { useState } from "react";
import { useNavigate } from "react-router";

import { useGetPostList } from "../hooks";
import SearchBar from "../components/SearchBar";

const Posts = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>("");

  const { data: postList } = useGetPostList();

  const onChange = (str: string) => setKeyword(str);

  const onClear = () => {
    setKeyword("");
  };

  return (
    <div data-testid="posts">
      <SearchBar value={keyword} onChange={onChange} onClear={onClear} />
      {!postList ? (
        <div data-testid="posts__loading">loading posts...</div>
      ) : (
        <div data-testid="posts__list-container">
          {postList
            .filter((post) => {
              if (keyword === "") return true;
              return post.title.includes(keyword);
            })
            .map((post, idx) => (
              <div
                key={post.id}
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginTop: "10px",
                  cursor: "pointer",
                  width: "fit-content",
                }}
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                <div>{idx}</div>
                <div>{post.title}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
