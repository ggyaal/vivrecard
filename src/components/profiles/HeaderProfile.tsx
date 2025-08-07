import { HiOutlineUser, HiUser } from "react-icons/hi";
import IconButton from "../buttons/IconButton";
import { Link, useNavigate } from "react-router-dom";
import useMember from "../../hooks/useMember";
import Avatar from "./Avatar";
import HamburgerMenu from "../HamburgerMenu";
import useLogout from "../../hooks/useLogout";

const HeaderProfile = () => {
  const { data: member, isLoading } = useMember();
  const logout = useLogout();
  const navigate = useNavigate();

  if ((!isLoading && !member?.avatarUrl) || !member) {
    return (
      <Link to={"/login"}>
        <IconButton
          icon={HiOutlineUser}
          hoverIcon={HiUser}
          size={32}
          ariaLabel="User Profile"
        />
      </Link>
    );
  }

  const WrappingAvatar = ({ onClick }: { onClick: () => void }) => {
    return (
      <button onClick={onClick}>
        <Avatar url={member.avatarUrl} size={55} />
      </button>
    );
  };

  return (
    <HamburgerMenu
      ButtonNode={WrappingAvatar}
      Items={[
        <button onClick={() => navigate("/members/me")}>마이페이지</button>,
        <button onClick={logout}>로그아웃</button>,
      ]}
    />
  );
};

export default HeaderProfile;
