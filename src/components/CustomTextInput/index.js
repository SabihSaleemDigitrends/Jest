import React from 'react';
import {Text, TextInput, View} from 'react-native';

const CustomTextInput = ({
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  customStyle,
  editalbe,
  secureEntry,
  maxLength,
  multiline,
  textAlign,
  returnKeyType,
  keyboardType,
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        editable={editalbe}
        value={value}
        onChangeText={onChangeText}
        style={customStyle}
        secureTextEntry={secureEntry}
        maxLength={maxLength}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        textAlign={textAlign}
        multiline={multiline}
      />
    </View>
  );
};

export default CustomTextInput;
