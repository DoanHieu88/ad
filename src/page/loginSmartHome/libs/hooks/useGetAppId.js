import { useMemo } from "react";
import { useAuthContext } from "../provider/AuthProvider";

const useGetAppId = () => {
  const { appId } = useAuthContext();

  const appIdValue = useMemo(() => {
    return localStorage.getItem("app_id") || appId || "";
  }, [appId]);

  return appIdValue;
};

export default useGetAppId;
