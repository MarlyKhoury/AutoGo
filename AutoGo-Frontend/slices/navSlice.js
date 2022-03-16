import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    origin: null,
    destination: null,
    travelTimeInformation: null,

}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducder:{
        setOrigin:(state, action)=>{
            state.origin = action.payload;
        },
        setDestination:(state, action)=>{
            state.destination = action.payload;
        },
        setTravelTimeInformation:(state, action)=>{
            state.travelTimeInformation = action.payload;
        },
    }


})

