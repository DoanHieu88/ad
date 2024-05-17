import { useMemo } from "react";

const useGetAppId = () => {
  const appId = useMemo(() => {
    return localStorage.getItem("app_id") || "";
  }, []);

  return appId;
};

export default useGetAppId;
