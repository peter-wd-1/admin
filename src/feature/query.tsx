import React from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Data } from "../type";
import axios, { AxiosError } from "axios";

async function fetchSearch(query: string) {
  const { data } = await axios.get<Data>(
    `https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/classtable?mode=search&search=${query}`
  );
  return data;
}

async function fetchSearchName(query: string) {
  const { data } = await axios.get<Data>(
    `https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/classtable?mode=searchName&search=${query}`
  );
  return data;
}
export const useSearchUser = (searchQuery: string) => {
  const { isLoading, isError, data } = useQuery(
    ["searchquery", searchQuery],
    async () => await fetchSearch(searchQuery)
  );
  return { isLoading, isError, data };
};

export const useSearchUserName = (searchQuery: string) => {
  const { isLoading, isError, data } = useQuery(
    ["searchqueryname", searchQuery],
    async () => await fetchSearchName(searchQuery)
  );
  return { isLoading, isError, data };
};

export const useAdjustCount = () => {
  const { isLoading, isSuccess, isError, mutate, data } = useMutation<
    any,
    AxiosError<any>,
    any
  >(async (count) => {
    await fetch(
      "https://trvwdb8xrh.execute-api.us-east-1.amazonaws.com/beta/classtable",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(count), // body data type must match "Content-Type" header
      }
    );
  });
  return { isLoading, isSuccess, isError, mutate, data };
};
