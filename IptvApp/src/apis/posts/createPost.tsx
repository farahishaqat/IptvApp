import useAxios from "axios-hooks";
import { useEffect } from "react";

const useCreatePost = () => {
    const [{ data: createPostData, loading: createPostLoading, error: createPostError }, savePost] = useAxios(
        {
            url: 'posts',
            method: 'POST'
        },
        { manual: true }
    );

    useEffect(() => {
        console.log('ERROR: ', createPostError);
    }, [createPostError])

    useEffect(() => {
        console.log('Data Update: ', createPostData);
    }, [createPostData])

    return {
        createPostData,
        createPostLoading,
        createPostError,
        savePost
    }
}

export default useCreatePost;