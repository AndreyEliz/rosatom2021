declare type responseType = 'text' | 'json' | 'blob' | 'formData' | 'arrayBuffer';
declare type fetchOptions = {
    method?: string;
    headers?: any;
    responseType?: responseType;
    body?: string | FormData;
};
declare type configType = {
    getAccessToken?(): Promise<string> | string;
    onError?(error: Error, response: Response): any;
};
interface IApiService {
    get(url: string, data: object, options: fetchOptions): Promise<Response | never | never>;
    remove(url: string, data: object, options: fetchOptions): Promise<Response | never | never>;
    removeJSON(url: string, data: object, options: fetchOptions): Promise<Response | never | never>;
    post(url: string, data: object, options: fetchOptions): Promise<Response | never | never>;
    postJSON(url: string, data: object, options: fetchOptions): Promise<Response | never | never>;
    postFile(url: string, file: any, options: fetchOptions): Promise<Response | never | never>;
    put(url: string, data: object, options: fetchOptions): Promise<Response | never | never>;
    putJSON(url: string, data: object, options: fetchOptions): Promise<Response | never | never>;
    setConfiguration(config: configType): void;
}

declare class ApiService implements IApiService {
    private getAccessToken;
    private onError?;
    private authenticate;
    private fetchData;
    private throwNetworkError;
    private handleErrors;
    setConfiguration: (config: configType) => void;
    get: (url: string, data?: {}, options?: fetchOptions) => Promise<any>;
    remove: (url: string, data?: {}, options?: fetchOptions) => Promise<any>;
    removeJSON: (url: string, data?: {}, options?: fetchOptions) => Promise<any>;
    post: (url: string, data?: {}, options?: fetchOptions) => Promise<any>;
    postJSON: (url: string, data?: {}, options?: fetchOptions) => Promise<any>;
    postFile: (url: string, file?: any, options?: fetchOptions) => Promise<any>;
    put: (url: string, data?: {}, options?: fetchOptions) => Promise<any>;
    putJSON: (url: string, data?: {}, options?: fetchOptions) => Promise<any>;
}

export declare const isAccessTokenExpired: () => boolean;
declare const sfApi: ApiService;
export declare const get: (url: string, data?: {}, options?: fetchOptions) => Promise<any>, remove: (url: string, data?: {}, options?: fetchOptions) => Promise<any>, removeJSON: (url: string, data?: {}, options?: fetchOptions) => Promise<any>, post: (url: string, data?: {}, options?: fetchOptions) => Promise<any>, postJSON: (url: string, data?: {}, options?: fetchOptions) => Promise<any>, postFile: (url: string, file?: any, options?: fetchOptions) => Promise<any>, put: (url: string, data?: {}, options?: fetchOptions) => Promise<any>, putJSON: (url: string, data?: {}, options?: fetchOptions) => Promise<any>, setConfiguration: (config: configType) => void;
export default sfApi;
