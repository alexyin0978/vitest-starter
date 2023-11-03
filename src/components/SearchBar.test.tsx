import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("globalComponent: SearchBar", () => {
  const mockValue = {
    initValue: "initValue",
    newValue: "newValue",
  };
  const mockProps = {
    onChange: vi.fn(),
    onClear: vi.fn(),
    value: mockValue.initValue,
  };

  beforeEach(() => {
    render(<SearchBar {...mockProps} />);
  });

  // write tests down here...
  test("should render SearchBar", () => {
    const container = screen.getByTestId("search-bar");
    expect(container).toBeInTheDocument();
  });
  test("should render input", () => {
    const input = screen.getByTestId("search-bar__input");
    expect(input).toBeInTheDocument();
    expect(input.getAttribute("placeholder")).toBe(null);
    expect(input).toHaveValue(mockProps.value);
  });
  test("should render clear button", () => {
    const clearBtn = screen.getByTestId("search-bar__clear-btn");
    expect(clearBtn).toBeInTheDocument();
    expect(clearBtn.innerHTML).toBe("clear");
  });

  test("should handle input change correctly", async () => {
    const input = screen.getByTestId("search-bar__input");

    fireEvent.change(input, { target: { value: mockValue.newValue } });
    expect(mockProps.onChange).toBeCalledWith(mockValue.newValue);
  });
  test("should handle input clear correctly", () => {
    const clearBtn = screen.getByTestId("search-bar__clear-btn");
    fireEvent.click(clearBtn);
    expect(mockProps.onClear).toHaveBeenCalledOnce();
  });
});
