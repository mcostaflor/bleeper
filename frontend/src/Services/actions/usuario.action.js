const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

const login = (usuario, token) => ({
    type: types.LOGIN,
    payload: { usuario, token }
});

const logout = () => ({
    type: types.LOGOUT
})

export {
    login, logout, types
}