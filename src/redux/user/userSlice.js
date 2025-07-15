import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,

    // Reducers: Noi xu lieu du lieu dong bo
    reducers: {},
});

// Action creators are generated for each case reducer function

export const selectCurrentUser = (state) => {
    return state.user.currentUser;
};

export const userReducer = userSlice.reducer;
