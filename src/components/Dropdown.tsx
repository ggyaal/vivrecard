import { useState } from "react";
import styled from "styled-components";

export interface DropdownOptionProps {
  name: string;
  value: string;
  isSelect?: boolean;
}

export interface DropdownProps {
  options: DropdownOptionProps[];
  shiftTo: (sort: string) => void;
  noSelect?: boolean;
}

const Container = styled.select`
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  color: #333;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const Option = styled.option`
  font-size: 16px;
`;

const Dropdown = ({ options, shiftTo, noSelect = true }: DropdownProps) => {
  const [value, setValue] = useState(
    options.find((o) => o.isSelect)?.value ?? "NO_SELECTION"
  );
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    shiftTo(e.target.value);
  };

  return (
    <Container onChange={handleChange} value={value}>
      {noSelect && (
        <Option key="no_option" value="NO_SELECTION">
          선택 없음
        </Option>
      )}
      {options.map((option, i) => (
        <Option key={`option_${i}`} value={option.value}>
          {option.name}
        </Option>
      ))}
    </Container>
  );
};

export default Dropdown;
