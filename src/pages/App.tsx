import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <div data-testid="app">
      this is Home page
      <div>
        click here to go to Posts page:
        <button data-testid="app__link" onClick={() => navigate("/posts")}>
          Go to Posts page
        </button>
      </div>
    </div>
  );
}

export default App;
