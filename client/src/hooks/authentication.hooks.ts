import {logout, login} from 'actions/authentication.actions';
import {useDispatch} from 'react-redux';

export const useCheckIfLoggedIn = () => {
    const dispatch = useDispatch()
    if (!localStorage.getItem('accessToken')) {
        logout(dispatch);
    }
}

export const useLogin = () => {
    const dispatch = useDispatch();
    return (data: any) => login(dispatch, data);
}

export const useLogout = () => {
    const dispatch = useDispatch();
    return () => logout(dispatch);
}
