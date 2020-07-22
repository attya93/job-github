import { useReducer, useEffect } from 'react'

import axios from 'axios';


// paramas : description , lication,lat ,long ,full_time
//page : used from pagenation

const initalState = {
    jobs: [],
    loading: true,
    error: false,
    hasNextPage: true
}

export const ACTION = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: "get-data",
    ERROR: "error",
    UPDATE_HAS_NEXT_PAGE: "has-next-page"
}

const CORS = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = CORS + "https://jobs.github.com/positions.json";
const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.MAKE_REQUEST:
            return { loading: true, jobs: [] }
        case ACTION.GET_DATA:
            return {
                ...state,
                loading: false,
                jobs: action.jobsList
            }
        case ACTION.ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                jobs: []
            }
        case ACTION.UPDATE_HAS_NEXT_PAGE:
            return {
                ...state,
                hasNextPage: action.hasNextPage
            }

        default:
            return state;
    }
}

const useFetchJops = (option, page) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    useEffect(() => {
        // disable multi request when user enter to input field
        const cancelToken = axios.CancelToken.source();
        dispatch({ type: ACTION.MAKE_REQUEST })
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token, // add cancel token to request
            params: { markdown: true, page: page, ...option }
        }).then(res => {
            dispatch({ type: ACTION.GET_DATA, jobsList: res.data });
        }).catch(err => {
            if (axios.isCancel(err)) return; //error accord when we cancel request , and we ignore it
            dispatch({ type: ACTION.ERROR, error: err });
        })

        const cancelToken1 = axios.CancelToken.source();
        dispatch({ type: ACTION.MAKE_REQUEST })
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token, // add cancel token to request
            params: { markdown: true, page: page + 1, ...option }
        }).then(res => {
            dispatch({ type: ACTION.UPDATE_HAS_NEXT_PAGE, hasNextPage: res.data.length !== 0 });
        }).catch(err => {
            if (axios.isCancel(err)) return; //error accord when we cancel request , and we ignore it
            dispatch({ type: ACTION.ERROR, error: err });
        })

        return () => {
            cancelToken.cancel(); // clearn old code cancel
            cancelToken1.cancel();
        }
    }, [option, page])
    return state
}

export default useFetchJops