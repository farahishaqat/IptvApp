import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = ({ placeholder, onchange, secureTextEntry = false }
    : { placeholder: string, onchange: (text: string) => void, secureTextEntry?: boolean }) => {
    return (
        <TextInput
            style={{
                backgroundColor: '#ccc',
                padding: 10,
                borderRadius: 10,
                marginTop: 20
            }}
            placeholder={placeholder}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={onchange}
            secureTextEntry={secureTextEntry}
        />
    )
}

export default CustomTextInput;

