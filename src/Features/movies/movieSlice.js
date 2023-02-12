import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKey } from "../../common/apis/movieApiKey.js";
import movieApi from "../../common/apis/movieApi";


const initialState = {
    movies: {},
    shows: {},
    SelectedMovieOrShow: {},
}

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies", async (term) => {
    const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=movie`);
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk("movies/fetchAsyncShows", async (term) => {
    const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=Series`);
    return response.data;
});
export const fetchAsyncMovieOrShowDetails = createAsyncThunk("movies/fetchAsyncMovieOrShowDetails", async (id) => {
    const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
});

const movieSlice = createSlice({
    // A name, used in action types
    name: "movies",
    // The initial state for the reducer
    initialState,
    // A reducer is a function that takes an action and return new state to the store
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.SelectedMovieOrShow = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncMovies.pending, (state) => {
            console.log("pending");
        });
        builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
            console.log("successfully fetched movies");
            return { ...state, movies: payload }
        });
        builder.addCase(fetchAsyncMovies.rejected, (state) => {
            console.log("rejected");
        });
        builder.addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
            console.log("successfully fetched shows");
            return { ...state, shows: payload }
        });
        builder.addCase(fetchAsyncMovieOrShowDetails.fulfilled, (state, { payload }) => {
            console.log("successfully fetched shows");
            return { ...state, SelectedMovieOrShow: payload }
        });
    }
    // A "builder callback" function used to add more reducers, or
    // an additional object of "case reducers", where the keys should be other
    // action types and the values should be reducer functions
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => { return state.movies.movies };
export const getAllShows = (state) => { return state.movies.shows };
export const getSelectedMovieOrShow = (state) => { return state.movies.SelectedMovieOrShow };
export default movieSlice.reducer;




