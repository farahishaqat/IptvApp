import React from 'react';

import { View, Text } from 'react-native'

const Avatar = ({ currentUser }: any) => {
    const getCurrentUserAvatar = () => {
        if (currentUser.profilePicture) {
            return currentUser.profilePicture;
        } else {
            const letter = currentUser.name.substr(0, 2)
            return letter;
        }
    }
    return (
        <View style={{ width: 40 }}>
            <Text style={{
                backgroundColor: '#ccc',
                padding: 10,
                borderRadius: 25
            }}>{getCurrentUserAvatar()}</Text>
        </View>
    )
}

export default Avatar
