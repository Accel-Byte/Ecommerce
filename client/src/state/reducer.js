export const initialstate = {
    profile: null,
    carts: null,
    reloadpage: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile,
            };
        case "ADD_CART":
            return {
                ...state,
                carts: action.carts,
            }
        default:
            return state;
    }
};

export default reducer;