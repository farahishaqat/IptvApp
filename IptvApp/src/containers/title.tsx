import React, { memo } from 'react';

import { View, Text } from 'react-native'

const Title = ({ text, size }: { text: string, size: string }) => {
    console.log('Title component render')
    return (
        <Text style={{
            fontSize: size == 'large' ? 30 : 20
        }}>{text}</Text>
    )
}

export default memo(Title);
