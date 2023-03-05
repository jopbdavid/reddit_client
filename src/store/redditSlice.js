import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getSubredditPosts, getPostComments } from "../api/api";


//definição do state onde podemos a informação relevante do estado reddit
const initialState = {
    posts: [],
    error: false,
    isLoading: false,
    searchTerm: "",
    selectedSubreddit: "/r/pics",
};

// Criação slice para trabalhar com a api do reddit
const redditSlice = createSlice({
    name: "redditPosts",
    initialState: initialState,
    reducers:{
        setPosts(state, action) {
            state.posts = action.payload;
        },
        startGetPosts (state) {
            state.isLoading = true;
            state.error = false;
        },
        getPostsSucess (state, action) {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFailed (state) {
            state.isLoading = false;
            state.error = true;
        },
        setSearchTerm (state, action) {
            state.searchTerm = action.payload;
        },
        setSelectedSubreddit (state, action) {
            state.selectedSubreddit = action.payload;
            state.searchTerm ="";
        },
        toggleShowingComments (state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        },
        startGetComments (state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
            if (!state.posts[action.payload].showingComments){
                return;
            }
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].error = false;
        },
        getCommentsSucess (state, action) {
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        getCommentsFailed (state) {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].error = true;
            
        },

    }
});

export const { 
    setPosts,
    startGetPosts,
    getPostsSucess,
    getPostsFailed,
    setSearchTerm,
    setSelectedSubreddit,
    toggleShowingComments,
    startGetComments,
    getCommentsSucess,
    getCommentsFailed
} = redditSlice.actions;

export default redditSlice.reducer;


//Redux Thunk para ir buscar a data ao subreddit antes de atualizar o store. - as funções async já foram criadas no ficheiro API

export const fetchPosts = (subReddit) => async(dispatch) => {
    try{
        dispatch(startGetPosts());
        const posts = await getSubredditPosts(subReddit);

        const postsWithMetadata = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
        }));
        dispatch(getPostsSucess(postsWithMetadata));

    } catch (error) {
        dispatch(getPostsFailed());
    }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
    try{
        dispatch(startGetComments(index));
        const comments = await getPostComments(permalink);
        dispatch(getCommentsSucess({index, comments}));
    } catch(error) {
        dispatch(getCommentsFailed(index));
    }
};

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;
export const selectFilteredPosts = createSelector([selectPosts, selectSearchTerm
], (posts, searchTerm) => {
    if (searchTerm != "") {
        return posts.filter((post) => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    return posts;
})
