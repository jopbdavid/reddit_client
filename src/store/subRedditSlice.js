import { createSelector, createSlice } from "@reduxjs/toolkit";
import {getSubReddits} from "../api/api";


const initialState = {
    subreddits: [],
    isLoading: false,
    error: false,
}

const subRedditSlice = createSlice({
    name: "subreddits",
    state: initialState,
    reducers: {
        startGetSubreddits (state) {
            state.isLoading = true;
            state.error = false;
        },
        getSubredditsSucess (state, action) {
            state.isLoading = false;
            state.error = false;
            state.subreddits = action.payload
        },
        getSubredditsFailed (state) {
            state.isLoading = false;
            state.error = true;    
        },
    },
});

export const {startGetSubreddits, getSubredditsSucess, getSubredditsFailed } = subRedditSlice.actions;
export default subRedditSlice.reducer;


export const fetchSubreddits = () => async (dispatch) => {
    try{
        dispatch(startGetSubreddits());
        const subreddits = await getSubReddits()

        dispatch(getSubredditsSucess(subreddits));
    } catch (error) {
        dispatch(getSubredditsFailed());
    }
};

export const selectSubreddits = (state) => state.subreddits.subreddits;

