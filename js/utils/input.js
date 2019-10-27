import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Item, Label, Input } from 'native-base';
import colors from './color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions';
export const InputWithShadowRadius = props => {
  return (
    <Item fixedLabel last>
      <Input
        placeholder={props.name}
        autoCapitalize="none"
        onChangeText={props.onChange}
        value={props.value}
        secureTextEntry={props.type == 'password' ? true : false}
      />
    </Item>
    // <View
    //   style={{
    //     width: '100%',
    //     borderRadius: 8,
    //     backgroundColor: 'white',
    //     paddingVertical: 5,
    //     shadowOffset: { width: 0, height: 0 },
    //     shadowRadius: 5,
    //     shadowOpacity: 0.2,
    //     shadowColor: '#000000'
    //   }}
    // >
    //   <TextInput
    //     style={{
    //       height: 35,
    //       paddingHorizontal: 8,
    //       width: '100%'
    //     }}
    //     placeholder={props.name}
    //   />
    // </View>
  );
};

export const TextAreaWithShadowRadius = props => {
  return (
    <View
      style={{
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'white',
        paddingVertical: 5,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        shadowColor: '#000000'
      }}
    >
      <TextInput
        style={{
          height: 120,
          paddingHorizontal: 8,
          justifyContent: 'flex-start'
        }}
        underlineColorAndroid="transparent"
        placeholder={props.name}
        numberOfLines={10}
        multiline={true}
      />
    </View>
  );
};

export const PrimaryButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingVertical: 10,
        backgroundColor: colors.tabBlue,
        width: '100%',
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        fontSize: 12
      }}
    >
      <Text
        style={{
          color: colors.tabWhite2,
          fontWeight: '400',
          fontSize: sizes.big1,
          textAlign: 'center'
        }}
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};
