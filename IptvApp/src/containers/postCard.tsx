import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CustomTextInput from './customTextInput';

const styles = StyleSheet.create({
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

const PostCard = ({ item, showPostDetails, updateItem, currentUser }: {
    item: any,
    showPostDetails: (item: any) => void,
    updateItem: (item: any) => void,
    currentUser: any
}) => {
    console.log('Post card component ', item.id);
    const { t } = useTranslation();
    return (
        <View style={styles.card}>
            {/* <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.body}</Text> */}
            <CustomTextInput placeholder={item.title} onchange={() => { }} />
            <CustomTextInput placeholder={item.body} onchange={() => { }} />
            <TouchableOpacity onPress={() => showPostDetails(item)}>
                <Text>{t('home.showMore')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateItem(item)}>
                <Text>{t('home.update')}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{currentUser && item.userId == currentUser.id ? 'Updated by you.' : 'updated...'}</Text>
        </View>
    )
}

const postCardPropsAreEqual = (prevPost: any, nextPost: any) => {
    return prevPost.title === nextPost.title
}

export default memo(PostCard, postCardPropsAreEqual);
