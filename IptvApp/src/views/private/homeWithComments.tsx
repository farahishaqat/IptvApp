import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
// import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useAxios from 'axios-hooks';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    card: {
        padding: 2,
        borderWidth: 1,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 4,
    },
    text: {
        fontWeight: 'bold',
        marginVertical: 3
    }
})

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<any[]>([]);
    const navigator = useNavigation<any>();
    const [{ data, loading: axiosLoading, error }, refetch] 
    = useAxios('https://jsonplaceholder.typicode.com/posts');

    console.log('ReRender')

    useEffect(() => {
        // (async () => {
        //     const restults = await getPosts();
        // })()
        console.log('use Effect for data');
        if (data) {
            console.log('Data updated ', data.length);
            setPosts(data);
        }
    }, [data]);

    useEffect(() => {
        console.log('use effect for Error')
        if (error) {
            console.log(error);
        }
    }, [error])

    const getPosts = async () => {
        // call api
        // setLoading(true);
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        //     .then(result => {
        //         setPosts(result.data);
        //         setLoading(false);
        //     }).catch(err => {
        //         console.log(err);
        //         setLoading(false);
        //     })
    }

    const showPostDetails = (post: any) => {
        // navigate to post details
        // show the post info in the details page.
        navigator.navigate('PostDetails', {
            ...post
        })
    }

    const getNextPage = () => {
        // get next page
        // add 10 items.
        // let newItems = posts.slice(0, 10);
        // newItems = newItems.map(item => {
        //     return {
        //         ...item,
        //         id: item.id + new Date().getTime(),
        //         title: `NEW TITLE: ${item.title}`
        //     }
        // });

        // console.log(newItems)
        // setPosts([...posts, ...newItems]);

        // .push()
        // Add item 
        // setPosts(oldValue => [...oldValue, {
        //     title: 'New Value ',
        //     body: 'test',
        //     id: '11111'
        // }])

        // unshift
        // Add item at the top of the list
        // setPosts(oldValue => [{
        //     title: 'New Value ',
        //     body: 'test',
        //     id: new Date().getTime()
        // }, ...oldValue])

        // Update on item on the state array
        let id = 2;
        setPosts(oldValues => oldValues.map(value => {
            if (value.id == id) {
                return {
                    ...value,
                    title: `Updated: ${value.title}`
                }
            }
            return value;
        }))

    }

    const refresh = () => {
        refetch();
    }

    return (
        <View style={{
            flex: 1
        }}>
            {/* {
                posts.map((post, index) => (
                    <View key={post.id} style={styles.card}>
                        <Text style={styles.text}>{post.title}</Text>
                        <Text style={styles.text}>{post.body}</Text>
                        <TouchableOpacity onPress={() => showPostDetails(post)}>
                            <Text>Show more</Text>
                        </TouchableOpacity>
                    </View>
                ))
            } */}
            {axiosLoading && <Text style={{ backgroundColor: 'red' }}>Loading data from api !!</Text>}
            <FlatList
                data={posts}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.card}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.body}</Text>
                            <TouchableOpacity onPress={() => showPostDetails(item)}>
                                <Text>Show more</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}

                ListEmptyComponent={() => <Text>Could not find data.</Text>}
                onEndReached={getNextPage}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                    return (
                        <>
                            {
                                loading ? <ActivityIndicator size={'large'} /> : <Text>This is it!</Text>
                            }
                        </>
                    )
                }}

                refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
            />
        </View>
    );
}

export default Home;