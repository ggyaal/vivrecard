import { useCallback } from "react";

type PopupLoginOptions = {
  popupUrl: string;
  width?: number;
  height?: number;
  onSuccess: (token: string) => void;
  onError?: (error: string) => void;
};

export const usePopupLogin = ({
  popupUrl,
  width = 600,
  height = 500,
  onSuccess,
  onError,
}: PopupLoginOptions) => {
  const openPopupLogin = useCallback(() => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      popupUrl,
      "SocialLoginPopup",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      onError?.("팝업을 열 수 없습니다. 브라우저 팝업 차단을 확인하세요.");
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from popup:", event.data);
      console.log("Event origin:", event.origin);
      if (event.origin !== window.location.origin) return;

      const { isSuccess, data } = event.data;

      if (isSuccess === "login-success" && data) {
        onSuccess(data);
      } else if (isSuccess === "login-failure" && data) {
        onError?.(data);
      }

      // popup.close();
      window.removeEventListener("message", handleMessage);
    };

    window.addEventListener("message", handleMessage);
  }, [popupUrl, width, height, onSuccess, onError]);

  return { openPopupLogin };
};
