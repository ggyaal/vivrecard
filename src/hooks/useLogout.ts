import { useQueryClient } from "@tanstack/react-query";
import requestAutoRefresh from "../utils/requestAutoRefresh";

const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    requestAutoRefresh({
      path: "/api/v1/logout",
      method: "DELETE",
    });

    queryClient.removeQueries({ queryKey: ["me"], exact: true });
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
};

export default useLogout;
