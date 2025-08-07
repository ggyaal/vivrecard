import { useQueryClient } from "@tanstack/react-query";
import requestAutoRefresh from "../utils/requestAutoRefresh";

const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    requestAutoRefresh({
      path: "/api/v1/logout",
      method: "DELETE",
    });

    queryClient.removeQueries({ queryKey: ["member"], exact: true });
    localStorage.removeItem("accessToken");
    document.cookie = "refreshToken=; path=/; max-age=0";
    window.location.reload();
  };
};

export default useLogout;
