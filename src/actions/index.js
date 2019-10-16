export const AuthStatus = {
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
};

export const logIn = user => ({
    type: AuthStatus.LOGGED_IN,
    username: user
});