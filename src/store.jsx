import {configureStore, createSlice} from '@reduxjs/toolkit';

const typeApi = createSlice({
    name: "type",
    initialState: {
        value: {type: ""}
    },
    reducers: {
        nameInput: (state, action) => {
            state.value = action.payload;
        },

    }
})

const saerchName = createSlice({
    name: "search",
    initialState: {value: {type: ""}},
    reducers: {
        searchType: (state, action) => {
            state.value = action.payload
        }
    }
})




const postObj = createSlice({
    name: "post",
    initialState: {
        user: {}
    },
    reducers: {
        setUserPost: (state, action) => {
            state.user = action.payload
        }
    }
})


export const {nameInput} = typeApi.actions;
export const {searchType} = saerchName.actions;
export const {setUserPost} = postObj.actions;

export const Store = configureStore({
    reducer: {
        type: typeApi.reducer,
        search: saerchName.reducer,
        userObj: postObj.reducer
    }
})