import {New} from "../Types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchDeleteNew, fetchGetNews, fetchPostNew} from "../Components/News/NewsThunk.ts";
import {RootState} from "./store.ts";

interface NewsState {
    error:boolean
    loading: boolean;
    news:New[]
}
const initialState: NewsState = {
    loading: false,
    news:[],
    error:false,
};

export const NewsSlice = createSlice<NewsState>({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers:(builder) =>  {
        builder.addCase(fetchGetNews.pending,(state ) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchGetNews.fulfilled,(state,action:PayloadAction<New[]> ) => {
            state.loading = false;
            state.news = action.payload
        });
        builder.addCase(fetchGetNews.rejected,(state ) => {
            state.loading = false;
            state.error = true;
        });



        builder.addCase(fetchPostNew.pending,(state ) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchPostNew.fulfilled,(state,) => {
            state.loading = false;
        });
        builder.addCase(fetchPostNew.rejected,(state ) => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(fetchDeleteNew.pending,(state ) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchDeleteNew.fulfilled,(state,) => {
            state.loading = false;
        });
        builder.addCase(fetchDeleteNew.rejected,(state ) => {
            state.loading = false;
            state.error = true;
        });
    },
})

export const selectMews = (state: RootState) => state.news.news;
export const selectLoading = (state: RootState) => state.news.loading;

export const NewsReducer = NewsSlice.reducer;