import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      this is Home page
      <div>
        click here to go to Posts page:
        <button onClick={() => navigate("/posts")}>Go to Posts page</button>
      </div>
    </div>
  );
}

export default App;
