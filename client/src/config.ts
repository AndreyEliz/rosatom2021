const getConfig = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/config.json', false);
    request.send();
    return JSON.parse(request.response)
}

const appConfig = getConfig();

export const BASE_URL: string = appConfig.BASE_URL;
export const API_URL: string = appConfig.API_URL;

