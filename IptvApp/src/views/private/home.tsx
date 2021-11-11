import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useGetPosts from '../../apis/posts/getPosts';
import PostCard from '../../containers/postCard';
import Title from '../../containers/title';
import UpdateCheck from '../../containers/updateCheck';
import WhoAmI from '../../containers/updateCheck';
import ThemeContext from '../../context/themeContext';
import AuthContext from '../../context/authContext/authContext';
import { useTranslation } from 'react-i18next';
import requestPermission from '../../permissions/permissions';
import permissionsTypes from '../../permissions/permissions-types';

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
    const [showWhoAmI, setShowWhoAmI] = useState<boolean>(false);
    const [posts, setPosts] = useState<any[]>([]);
    const navigator = useNavigation<any>();
    const [user, setUser] = useState<{ name: string, email: string, id: number }>();
    const { data, loading: getPostsLoading, error, refetch } = useGetPosts();
    const { t } = useTranslation();
    const themeValue = useContext(ThemeContext);
    const authContext = useContext(AuthContext);

    console.log('Theme context ', themeValue)
    console.log('Auth context ', authContext)
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

    const handleShowWhoAmI = async () => {
        setShowWhoAmI(!showWhoAmI);
        await requestPermission(permissionsTypes.CAMERA);
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: themeValue.backgroundColor
        }}>
            {/* <UpdateCheck /> */}
            {/* <Title text={'Posts'} size={'large'} /> */}
            <TouchableOpacity onPress={handleShowWhoAmI}>
                <Text>who am i?</Text>
            </TouchableOpacity>

            {/* switch case */}
            {
                showWhoAmI && user && <WhoAmI
                    currentUser={user}
                >
                    {/* props.Children */}
                    <Text style={{ color: '#fff' }}>I am one of the props</Text>
                    <ActivityIndicator />
                </WhoAmI>
            }

            <Title text={`${t('home.greet')} ${user?.name}`} size={'large'} />
            <TouchableOpacity style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 5
            }} onPress={handleAddNewItem}>
                <Text>+ {t('home.addPost')}</Text>
            </TouchableOpacity>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={renderItem}
                ListEmptyComponent={() => <Text>Could not find data.</Text>}
                ListFooterComponent={() => {
                    return (
                        <>
                            {
                                getPostsLoading ? <ActivityIndicator size={'large'} /> : <Text>This is it!</Text>
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