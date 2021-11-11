import React from 'react';
import { Text, View } from 'react-native';
const PostDetails = ({ route }: any) => {
    console.log(route.params)
    return (
        <View>
            <Text>Title: {route.params.title}</Text>
            <Text>Body: {route.params.body}</Text>
        </View>
    )
}

export default PostDetails
