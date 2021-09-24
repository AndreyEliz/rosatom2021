/**
 * React-router will implement hooks api in latest minor update.
 * Until that time we can use this short wortkaround
 */

import {useContext} from 'react';
import {__RouterContext as RouterContext} from 'react-router';

export function useRouter() {
    return useContext(RouterContext);
}

export function useParams(): any {
    const { match } = useRouter();
    return match.params;
}

export function useLocation() {
    const {location, history} = useRouter();

    function navigate(to: string, {replace = false} = {}) {
        if (replace) {
            history.replace(to);
        } else {
            history.push(to);
        }
    }

    return {
        location,
        navigate
    };
}
