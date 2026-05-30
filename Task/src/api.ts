import axios from "axios";
import { ApiResponse } from "./types";

const api = axios.create({
  baseURL: "http://localhost:3020",
});

export const fetchItems = async (
  skip: number,
  take: number,
  signal?: AbortSignal
): Promise<ApiResponse> => {
  const response =
    await api.get<ApiResponse>("/items",
      {
        params: {
          skip,
          take,
        },
        signal,
      }
    );


  return response.data;
};