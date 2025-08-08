import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constant";

const initialState = {
    feedback: null,
};

export const interviewFeedbackAPI = createAsyncThunk(
    "interviewFeedback/interviewFeedbackAPI",
    async (data) => {
        const response = await authorizedAxiosInstance.post(
            `${API_ROOT}/answer_compare/evaluate-batch`,
            data
        );
        return response.data;
    }
);

export const interviewFeedbackSlice = createSlice({
    name: "interviewFeedback",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(interviewFeedbackAPI.fulfilled, (state, action) => {
            //action.payload chính là cái response.data trả về ở phía trên
            state.feedback = action.payload;
        });
    },
});

export const selectInterviewFeedback = (state) => {
    return state.interviewFeedback.feedback;
};

export const interviewFeedbackReducer = interviewFeedbackSlice.reducer;
