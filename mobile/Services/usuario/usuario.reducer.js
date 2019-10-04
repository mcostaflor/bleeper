const initialState = {
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                usuario: action.payload.usuario,
                token: action.payload.token,
            }
        case 'DELETE_USER':
            return {
                ...state,
                usuario: null,
                token: null
            }
        default:
            return state
    }
};