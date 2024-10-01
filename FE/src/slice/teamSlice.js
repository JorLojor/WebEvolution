// redux/slice/teamSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teamData: null,
    error: null,
};

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setTeamData: (state, action) => {
            state.teamData = action.payload;
        },
        setTeamError: (state, action) => {
            state.error = action.payload;
        },
        clearTeamData: (state) => {
            state.teamData = null;
            state.error = null;
        },
    },
});

export const { setTeamData, setTeamError, clearTeamData } = teamSlice.actions;
export default teamSlice.reducer;
