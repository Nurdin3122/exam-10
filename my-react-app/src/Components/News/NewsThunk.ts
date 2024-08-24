import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {New, NewMutation} from "../../Types.ts";

export const fetchGetNews = createAsyncThunk<New[]>(
    "news/fetchGetNews",
    async () => {
        const response = await axiosApi.get<New[] | null>('/news');
        return response.data ?? [];
    }
);

export const fetchPostNew = createAsyncThunk(
    'news/fetchPostNew',
    async (NewPost) => {
        const response = await axiosApi.post<NewMutation | null>('/news', NewPost, {
        });
        return response.data;
    }
);

export const fetchDeleteNew = createAsyncThunk<string,string>(
    "news/fetchDelete",
    async (id:string) => {
        await axiosApi.delete(`/news/${id}`);
        return id;
    }
);
