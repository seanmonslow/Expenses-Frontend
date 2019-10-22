import { AuthStatus } from '../actions';

const auth = (state = {auth_status: AuthStatus.LOGGED_OUT, username: null}, action) => {
    switch(action.type){
        case 'LOGGED_IN':
            return {auth_status: AuthStatus.LOGGED_IN, username: action.username};
        case 'LOGGED_OUT':
            return {auth_status: AuthStatus.LOGGED_OUT, username: null};
        default:
            return state;
    }
}

export default auth;