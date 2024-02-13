import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState } from "react";
import { Colors } from '../../constants/styles';
import { Ionicons } from '@expo/vector-icons';

function Input({
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeHolder,
  height,
  onFocus,
  onBlur
}) {

  const [hidePass, setHidePass] = useState(true);

  return (
    <View style={styles.inputContent}>
      <View style={[styles.inputArea, isInvalid && styles.inputInvalid]}>
        <TextInput
          style={styles.input}
          //autoCapitalize={false}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure ? hidePass : !hidePass}
          onChangeText={onUpdateValue}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={isInvalid ? Colors.error500 : '#999'}
          onFocus={onFocus}
          onBlur={onBlur}
        />        
        <Pressable onPress={() => setHidePass(!hidePass)}>
          {/* Icon check */}
          { hidePass ?
            // true
            <Ionicons name="eye" color={isInvalid ? Colors.error500 : Colors.primary800} size={20} height={height}/>
            :
            // false
            <Ionicons name="eye-off" color={isInvalid ? Colors.error500 : Colors.primary800} size={20} height={height}/>
          }
        </Pressable>
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContent: {
  width: '100%',
  height:'18%',
  alignItems: "center",
  justifyContent: "center",
},
  inputArea: {
  flexDirection: 'row',
  borderBottomWidth: 1.5,
  borderColor: Colors.primary800,
  height: '65%',
  width: '85%',
  alignItems: "center",
  },
  input: {
    width: '90%',
    fontFamily: 'open-sans',
    fontSize: 16
  },
  inputInvalid: {
    borderColor: Colors.error500,
  },
  textInvalid: {
    color: Colors.error500,
  }
});
