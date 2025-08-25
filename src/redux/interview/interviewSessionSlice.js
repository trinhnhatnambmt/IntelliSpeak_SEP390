import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constant";

const initialState = {
    interViewSessionQuestions: null,
};

export const interViewSessionQuestionForAiAPI = createAsyncThunk(
    "interviewSession/interViewSessionQuestionForAiAPI",
    async (id) => {
        const response = await authorizedAxiosInstance.post(
            `${API_ROOT}/interview-sessions/${id}/random-questions-by-session`
        );
        return response.data.data;
    }
);

export const interViewSessionVietnameseQuestionForAiAPI = createAsyncThunk(
    "interviewSession/interViewSessionVietnameseQuestionForAiAPI",
    async (id) => {
        const response = await authorizedAxiosInstance.post(
            `${API_ROOT}/interview-sessions/${id}/random-questions-by-session/vietnamese`
        );
        return response.data.data;
    }
);

export const interviewSessionSlice = createSlice({
    name: "interviewSession",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(
            interViewSessionQuestionForAiAPI.fulfilled,
            (state, action) => {
                //action.payload chính là cái response.data trả về ở phía trên
                state.interViewSessionQuestions = action.payload;
            }
        );
        builder.addCase(
            interViewSessionVietnameseQuestionForAiAPI.fulfilled,
            (state, action) => {
                //action.payload chính là cái response.data trả về ở phía trên
                state.interViewSessionQuestions = action.payload;
            }
        );
    },
});

export const selectCurrentInterviewSession = (state) => {
    return state.interviewSession.interViewSessionQuestions;
};

export const interviewSessionReducer = interviewSessionSlice.reducer;
