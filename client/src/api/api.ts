import {toast} from 'react-toastify';

/**
 * check if token expires
 */
export const isAccessTokenExpired = () => {
    const accessTokenExpDate = parseInt(localStorage.getItem('expiresIn') || '', 10);
    const nowTime = Math.floor(Date.now());
    return accessTokenExpDate <= nowTime;
};


/**
 *  set tokens to storage
 */
export const setAuthData = (data:any) => {
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('expiresIn', (Date.now() + data.expires_in*1000).toString());

    // Extract data from JWT
    const base64Url = data.access_token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let userInfo = null;
    try {
        userInfo = JSON.parse(window.atob(base64));
        console.log(userInfo)
        localStorage.setItem('username', userInfo.username);
        localStorage.setItem('role', userInfo.role);
    } catch (e) {
        console.log(e);
    }
};


/**
 * @param error 
 * @param customErrorHandlers 
 */
export const handleError = (error: Error, customErrorHandlers: any ={}) => {
    const toastId = 'connectionError';

    const errorHandlers: any = {
        'AuthError': (data: any) => {
            toast('Ошибка авторизации', {type: 'error', toastId: data.toastId});
        },
        'BadRequestError': (data: any) => toast(data.error.message, {type: 'error', toastId: data.toastId}),
        'NotFoundError': (data: any) => toast('Запрашиваемый ресурс не найден', {type: 'error', toastId: data.toastId}),
        'unknownError': (data: any) => toast('Ошибка соединения', {type: 'error', toastId: data.toastId}),
        ...customErrorHandlers
    };
    
    const errorHandler = errorHandlers[error.name] || errorHandlers.unknownError;
    errorHandler({toastId, error});
};
