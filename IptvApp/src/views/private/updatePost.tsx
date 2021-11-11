import useAxios from 'axios-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import useUpdatePost from '../../apis/posts/updatePost';
import CustomTextInput from '../../containers/customTextInput';

// POST : https://jsonplaceholder.typicode.com/posts

// PUT  : https://jsonplaceholder.typicode.com/posts/:id

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginTop: 20
    }
})

const UpdatePost = ({ route }: any) => {
    const { postData, loadingPostData, errorPostData, updatePost } = useUpdatePost(route.params.id);

    useEffect(() => {
        console.log('data : ', postData);
        console.log('error : ', errorPostData);
    }, [postData, errorPostData])

    const [form, setForm] = useState<any>({
        ...route.params
    });

    const handleInputChange = (text: string, key: string) => {
        setForm((previousValue: any) => {
            return {
                ...previousValue,
                [key]: text
            }
        })
    }

    const submitPost = () => {
        console.log(form);
        updatePost({
            data: form
        })
    }

    return (
        <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
            <Text>Update post</Text>

            <TextInput
                style={styles.input}
                placeholder={'Title'}
                onChangeText={(text: string) => handleInputChange(text, 'title')}
                value={form.title}
            />

            <TextInput
                multiline
                style={styles.input}
                placeholder={'Body'}
                onChangeText={(text: string) => handleInputChange(text, 'body')}
                value={form.body}
            />

            <TouchableOpacity style={{
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 10,
                padding: 15
            }} onPress={submitPost}>
                <Text style={{
                    textAlign: 'center',
                    alignItems: 'center'
                }}>{!loadingPostData ? 'Update' : <ActivityIndicator />}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdatePost;
