import Select, { Data } from "@components/select/Select";
import {
  fireEvent,
  render,
  screen,
} from "../node_modules/@testing-library/react";
import "../node_modules/@testing-library/jest-dom";
import { useState } from "react";

const MockSelect = () => {
  const [selectValue, setSelectValue] = useState<Data[]>([]);

  const handleSelect = (value: Data) => {
    const isSelected = selectValue.find((val) => val.name === value.name);

    if (isSelected) {
      const newTransactions = selectValue.filter(
        (val) => val.name !== value.name
      );
      setSelectValue(newTransactions);
    } else {
      setSelectValue([...selectValue, value]);
    }
  };
  return (
    <Select
      value={selectValue}
      multiSelect
      placeholder="some placeholder"
      onChange={handleSelect}
      list={[{ name: "Sam" }, { name: "Tom" }]}
    />
  );
};

describe("Select Component", () => {
  it("renders placeholder when there is no value", () => {
    render(<MockSelect />);
    const button = screen.getByRole("button");
    const paragraph = button.textContent;
    expect(paragraph).toContain("some placeholder");
  });

  it("options open when button is clicked", () => {
    render(<MockSelect />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const option = screen.getByText("Sam");
    expect(option).toBeInTheDocument();
  });

  it("select and deselect value", () => {
    render(<MockSelect />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const option = screen.getAllByTestId("option");
    fireEvent.click(option[0]);
    expect(button.textContent).toBe("Sam");
    fireEvent.click(option[0]);
    expect(button.textContent).toBe("some placeholder");
  });

  it("select multiple values", () => {
    render(<MockSelect />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const option = screen.getAllByTestId("option");
    fireEvent.click(option[0]);
    expect(button.textContent).toBe("Sam");
    fireEvent.click(option[1]);
    expect(button.textContent).toBe("Sam, Tom");
  });
});
