import { useQuery } from "@tanstack/react-query";

const getHistoryList = async () => {
  const response = await fetch("http://localhost:3030/data");
  return response.json();
};

const useHistoryListData = () => {
  return useQuery(["historyList"], getHistoryList);
};

export default useHistoryListData;
