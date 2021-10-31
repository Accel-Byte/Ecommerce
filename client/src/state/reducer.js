export const initialState = {
    profile: null,
    carts: null,
    cart_product_complete: null,
    cart_product_incomplete: null,
    reloadPage: null,
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
        case "ADD_CART_PRODUCT_COMPLETE":
            return {
                ...state,
                cart_product_complete: action.cart_product_complete
            }
        case "ADD_CART_PRODUCT_INCOMPLETE":
            return {
                ...state,
                cart_product_incomplete: action.cart_product_incomplete
            }
        case "ADD_RELOAD_PAGE_DATA":
            return {
                ...state,
                reloadPage: action.reloadPage
            }
        default:
            return state;
    }
};

export default reducer;