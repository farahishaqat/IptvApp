import useAxios from "axios-hooks";
import { useEffect } from "react";

const useGetPosts = () => {
    const [{ data, loading, error }, refetch]
        = useAxios('posts');

    useEffect(() => {
        console.log('ERROR: ', error);
    }, [error])

    useEffect(() => {
        // console.log('Data Update: ', data);
    }, [data])

    return {
        data,
        loading,
        error,
        refetch
    }
}

export default useGetPosts;