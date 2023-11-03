type SearchBarProps = {
  onChange: (str: string) => void;
  onClear: () => void;
  value: string;
};

const SearchBar = (props: SearchBarProps) => {
  const { onChange, onClear, value } = props;

  return (
    <div data-testid="search-bar">
      Search:{" "}
      <input
        data-testid="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        data-testid="search-bar__clear-btn"
        style={{ marginLeft: "8px" }}
        onClick={onClear}
      >
        clear
      </button>
    </div>
  );
};

export default SearchBar;
