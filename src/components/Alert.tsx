import { useState } from "react";
import {
  HiBell,
  HiOutlineBell,
  HiBellAlert,
  HiOutlineBellAlert,
} from "react-icons/hi2";
import styled from "styled-components";
import IconButton from "./IconButton";

const Container = styled.div``;

const Alert = () => {
  const [isNew, setIsNew] = useState(false);

  const icon = isNew ? HiOutlineBellAlert : HiOutlineBell;
  const hoverIcon = isNew ? HiBellAlert : HiBell;

  return (
    <Container>
      <IconButton
        icon={icon}
        hoverIcon={hoverIcon}
        size={32}
        onClick={() => setIsNew(!isNew)}
      />
    </Container>
  );
};

export default Alert;
