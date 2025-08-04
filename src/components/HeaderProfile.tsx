import { HiOutlineUser, HiUser } from "react-icons/hi";
import IconButton from "./IconButton";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";

const WrappingButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    onClick={onClick}
    icon={HiOutlineUser}
    hoverIcon={HiUser}
    size={32}
    ariaLabel="User Profile"
  />
);

const HeaderProfile = () => {
  return (
    <HamburgerMenu
      ButtonNode={WrappingButton}
      Items={[
        <Link key="login" to={"/login"}>
          로그인
        </Link>,
        <Link key="logout" to={"/logout"}>
          로그아웃
        </Link>,
      ]}
    />
  );
};

export default HeaderProfile;
