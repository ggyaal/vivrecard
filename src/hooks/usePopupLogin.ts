const usePopupLogin = (registrationId: string) => {
  const handleLogin = () => {
    const popup = window.open(
      `${process.env.REACT_APP_API_URL}/api/v1/login/${registrationId}`,
      "_blank",
      "width=500,height=600"
    );

    if (popup) {
      popup.focus();
    } else {
      alert("팝업이 차단되어 있습니다. 팝업을 허용해주세요.");
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== process.env.REACT_APP_API_URL) return;

      const { accessToken }: { accessToken: string } = event.data;

      if (typeof accessToken === "string") {
        localStorage.setItem("accessToken", accessToken);
        window.location.reload();
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return { handleLogin };
};

export default usePopupLogin;
