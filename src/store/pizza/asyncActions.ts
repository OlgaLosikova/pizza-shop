import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";

const baseUrl = 'https://6671410ce083e62ee43abe0a.mockapi.io/items';

export const fetchData = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchDataStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `${baseUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  return data;
});