export const initialstate = {
    profile: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile,
            };
        default:
            return state;
    }
};

export default reducer;