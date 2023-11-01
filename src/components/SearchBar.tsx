type SearchBarProps = {
  onChange: (str: string) => void;
  onClear: () => void;
  value: string;
};

const SearchBar = (props: SearchBarProps) => {
  const { onChange, onClear, value } = props;

  return (
    <div>
      Search: <input value={value} onChange={(e) => onChange(e.target.value)} />
      <button style={{ marginLeft: "8px" }} onClick={onClear}>
        clear
      </button>
    </div>
  );
};

export default SearchBar;
