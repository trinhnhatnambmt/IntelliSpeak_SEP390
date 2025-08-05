import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { interviewSessionReducer } from "./interview/interviewSessionSlice";

const rootPersistConfig = {
    key: "root", // key của cái persist do chúng ta chỉ định, cứ để mặc định là root
    storage: storage, // Biến storage ở trên - lưu vào localStorage
    whitelist: ["user"], // Định nghĩa các slice dữ liệu ĐƯỢC PHÉP duy trì qua mỗi lần F5 trình duyệt
    // blacklist: ['user] : thì ngược lại với whitelist
};

// Combine các reducers trong dự án chúng ta ở đây
const reducers = combineReducers({
    user: userReducer,
    interviewSession: interviewSessionReducer,
});

// Thực hiện persist Reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    // Fix warning error when implement redux-persist
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
