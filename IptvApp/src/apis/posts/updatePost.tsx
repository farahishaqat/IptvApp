import useAxios from "axios-hooks";
import { useEffect } from "react";

const useUpdatePost = (postId: number) => {
    const [{ data: postData, loading: loadingPostData, error: errorPostData }, updatePost] = useAxios(
        {
            url: `posts/${postId}`,
            method: 'PUT'
        },
        { manual: true }
    );

    useEffect(() => {
        console.log('ERROR: ', errorPostData);
    }, [errorPostData])

    useEffect(() => {
        console.log('Data Update: ', postData);
    }, [postData])

    return {
        postData,
        loadingPostData,
        errorPostData,
        updatePost
    }
}

export default useUpdatePost;