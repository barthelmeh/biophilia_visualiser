import axios from 'axios';

interface HeaderType {
    header: string,
    value: any
}

const getInstance = (authToken: string | null | undefined, headers?: HeaderType[]) => {
    const instance = axios.create();
    instance.interceptors.request.use((request) => {
        request.headers.set('X-Authorisation', authToken);
        return request;
    });

    if(typeof headers !== 'undefined') {
        for(const header of headers) {
            instance.interceptors.request.use((request) => {
                request.headers.set(header.header, header.value);
                return request;
            });
        }
    }
    return instance;
}

export default getInstance;