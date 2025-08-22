import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constant";

const initialState = {
    currentCompany: null,
};

export const getCompanyDetailAPI = createAsyncThunk(
    "company/getCompanyDetailAPI",
    async (id) => {
        const response = await authorizedAxiosInstance.get(
            `${API_ROOT}/company/${id}`
        );
        return response.data.data;
    }
);

export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getCompanyDetailAPI.fulfilled, (state, action) => {
            //action.payload chính là cái response.data trả về ở phía trên
            state.currentCompany = action.payload;
        });
    },
});

export const selectCurrentCompany = (state) => {
    return state.company.currentCompany;
};

export const companyReducer = companySlice.reducer;
