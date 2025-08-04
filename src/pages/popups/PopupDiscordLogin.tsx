import { useEffect } from "react";

const PopupDiscordLogin = () => {
  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/login/discord`,
          {
            credentials: "include",
          }
        );
        const json = await response.json();

        console.log("Login response:", json);

        window.opener.postMessage(
          { type: "login-success", token: json.token },
          window.origin
        );
      } catch (e: any) {
        window.opener.postMessage(
          { type: "login-failure", error: e.message },
          window.origin
        );
      } finally {
        // window.close();
      }
    };

    fetchLogin();
  }, []);

  return <p>로그인 처리 중...</p>;
};

export default PopupDiscordLogin;
