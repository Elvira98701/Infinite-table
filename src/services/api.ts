import type { ApiTableResponse, TableHeaders } from "@/@types/api";
import type { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchTableData = async ({
  pageParam,
}: QueryFunctionContext): Promise<ApiTableResponse> => {
  const { data } = await api.get<ApiTableResponse>(
    `/table?_page=${pageParam}&_per_page=10`
  );

  return data;
};

export const fetchHeaders = async (): Promise<TableHeaders> => {
  const { data } = await api.get<TableHeaders>("/headers");

  return data;
};

export const sendFormData = async (tableData: Record<string, string>) => {
  const { data } = await api.post("/table", tableData);

  return data;
};
