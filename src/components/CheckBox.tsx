import { ReactNode } from "react";
import styled from "styled-components";

const Label = styled.label<{ $size: number; $fontSize: number }>`
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: ${({ $fontSize }) => `${$fontSize}px`};

  & > input {
    display: none;
  }

  & > span {
    width: ${({ $size }) => `${$size}px`};
    height: ${({ $size }) => `${$size}px`};
    border: 1px solid ${({ theme }) => theme.content.tag.sky.border};
    background-color: ${({ theme }) => theme.content.tag.sky.background};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    margin-left: 8px;
    border-radius: 4px;
  }

  & > span::after {
    content: "";
    display: none;
    width: ${({ $size }) => `${Math.round($size / 4)}px`};
    height: ${({ $size }) => `${Math.round($size / 2)}px`};
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  & > input:checked + span {
    background-color: ${({ theme }) => theme.content.tag.green.background};
    border-color: ${({ theme }) => theme.content.tag.green.border};
  }

  & > input:checked + span::after {
    display: block;
  }
`;

const CheckBox = ({
  size = 20,
  fontSize = 14,
  checked,
  setChecked,
  children,
  className,
}: {
  size?: number;
  fontSize?: number;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Label className={className} $size={size} $fontSize={fontSize}>
      {children}
      <input
        type="checkbox"
        name={`checkbox_${children}`}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span></span>
    </Label>
  );
};

export default CheckBox;
