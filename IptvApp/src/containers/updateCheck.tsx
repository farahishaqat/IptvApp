import React, { useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native'
import Avatar from './avatar';

const styles = StyleSheet.create({
    card: {
        padding: 10,
        backgroundColor: '#101010'
    }
})

const WhoAmI = (props: any) => {

    useEffect(() => {
        // hit api
        // check if the user updated the application
    }, []);

    return (
        <View style={styles.card}>
            <Avatar currentUser={props.currentUser} />
            <Text style={{ color: '#fff' }}>Name: {props.currentUser.name}</Text>
            <Text style={{ color: '#fff' }}>Email: {props.currentUser.email}</Text>
            {/* <NumberOfPostsAndLike currentUser={currentUser}/> */}
            {props.children}
        </View>
    )
}

export default WhoAmI
