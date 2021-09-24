import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCEED,
    LOGOUT
} from 'actions/action-types';

const initialState = {
    authorized: true,
    userName: ''
};


const authentication = (state=initialState, action: any) => {
    const reducers:any = {
        [AUTHENTICATION_FAILED]: () => ({...state, authorized: false}),
        [AUTHENTICATION_SUCCEED]: () => ({...state, authorized: true, userName: action.data.name}),
        [LOGOUT]: () => ({...state, authorized: false})
    }

    return (reducers[action.type]  && reducers[action.type]()) || state
};

export default authentication;
