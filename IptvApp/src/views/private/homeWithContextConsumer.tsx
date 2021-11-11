import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useGetPosts from '../../apis/posts/getPosts';
import PostCard from '../../containers/postCard';
import Title from '../../containers/title';
import UpdateCheck from '../../containers/updateCheck';
import WhoAmI from '../../containers/updateCheck';
import ThemeContext from '../../context/themeContext';

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

const HomeWithContextConsumer = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [showWhoAmI, setShowWhoAmI] = useState<boolean>(false);
    const [posts, setPosts] = useState<any[]>([]);
    const navigator = useNavigation<any>();
    const [user, setUser] = useState<{ name: string, email: string, id: number }>();
    const { data, loading: getPostsLoading, error, refetch } = useGetPosts();

    console.log('ReRender')
    useEffect(() => {
        // get token / user data (get user data)
        setUser({
            name: 'demo',
            email: 'demo123@xyz.com',
            id: 1
        })
    }, []);
    useEffect(() => {
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

    const showPostDetails = (post: any) => {
        navigator.navigate('PostDetails', {
            ...post
        })
    }

    const refresh = () => {
        refetch();
    }

    const handleAddNewItem = () => {
        navigator.navigate('AddPost');
    }

    const updateItem = (item: any) => {
        navigator.navigate('UpdatePost', {
            ...item
        })
    }

    const renderItem = ({ item, index }: any) => (
        <PostCard
            item={item}
            showPostDetails={showPostDetails}
            updateItem={updateItem}
            currentUser={user}
        />
    );

    const handleShowWhoAmI = () => {
        setShowWhoAmI(!showWhoAmI)
    }

    return (
        <ThemeContext.Consumer>
            {
                value => (
                    <View style={{ backgroundColor: value.backgroundColor, padding: 20 }}>
                        <Text>Consumed theme</Text>
                    </View>
                )
            }
        </ThemeContext.Consumer>
    );
}

export default HomeWithContextConsumer;