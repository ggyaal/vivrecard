import { HiOutlineUser, HiUser } from "react-icons/hi";
import IconButton from "../buttons/IconButton";
import { Link } from "react-router-dom";
import useMember from "../../hooks/useMember";
import Avatar from "./Avatar";
import styled from "styled-components";

const Container = styled(Link)`
  cursor: pointer;
`;

const HeaderProfile = () => {
  const { data: member, isLoading } = useMember();

  return (
    <Container to={"/login"}>
      {!isLoading && member?.avatarUrl ? (
        <Avatar url={member.avatarUrl} size={55} />
      ) : (
        <IconButton
          icon={HiOutlineUser}
          hoverIcon={HiUser}
          size={32}
          ariaLabel="User Profile"
        />
      )}
    </Container>
  );
};

export default HeaderProfile;
