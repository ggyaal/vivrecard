import { useState } from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface IconButtonProps {
  icon: IconType;
  hoverIcon?: IconType;
  size?: number;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const IconButton = ({
  icon: Icon,
  hoverIcon: HoverIcon,
  size = 24,
  onClick,
  ariaLabel,
  disabled = false,
}: IconButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const DisplayIcon = HoverIcon && (isHovered || disabled) ? HoverIcon : Icon;

  return (
    <Button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={{ width: size, height: size }}
    >
      <DisplayIcon size={size} />
    </Button>
  );
};

export default IconButton;
