import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { Colors, SemanticColors } from "../../utils/Theme";
import { Controller } from "react-hook-form";
import RemixIcon from "react-native-remix-icon";

const TextField = ({
   label = "Label",
   placeholder,
   control,
   name,
   leftIcon,
   rightIcon,
   rules = {},
   onChangeText,
   secureTextEntry,
   onFocus,
   ref,
   defaultValue,
   type,
   isError = "",
}) => {
   const [secureText, setSecureText] = useState(secureTextEntry);
   return (
      <View style={styles.container}>
         <Text style={styles.label}>{label}</Text>

         <Controller
            control={control}
            name={name}
            rules={rules}
        
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
               <>
                  <View style={[styles.inputContainer, { borderColor: error || isError  ? Colors.error_500 : Colors.gray_100 }]}>
                     <View style={styles.leftInputContainer}>
                        {leftIcon}
                        <TextInput
                           style={styles.input}
                           type={type}
                           placeholder={placeholder}
                           value={value}
                           onChangeText={onChange}
                           onBlur={onBlur}
                           onFocus={onFocus}
                           secureTextEntry={secureText}
                           ref={ref}
                           keyboardType={ type === 'email'?Platform.OS === 'android' ? 'visible-password' : 'ascii-capable' : 'default'}
                        />
                     </View>
                     {secureTextEntry && <ViewPasswordButton isPasswordHided={secureText} onPress={() => setSecureText(!secureText)} />}
                  </View>
                  {error || isError ? (
   <Text style={{ color: Colors.error_500, alignSelf: "stretch", fontSize: 12, fontFamily: "Sora-Regular" }}>
      {error?.message || isError}
   </Text>
) : null}

               </>
            )}></Controller>
      </View>
   );
};

export default TextField;

const ViewPasswordButton = ({ isPasswordHided, onPress }) => {
   return (
      <Pressable onPress={onPress} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 24, width: 24 }}>
         {isPasswordHided ? (
            <RemixIcon name="eye-close-fill" size="20" color={Colors.gray_300}></RemixIcon>
         ) : (
            <RemixIcon name="eye-fill" size="20" color={Colors.gray_300}></RemixIcon>
         )}
      </Pressable>
   );
};
const styles = StyleSheet.create({
   container: {
      gap: 8,
      marginVertical: 8,
   },
   inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: 56,
      padding: 16,
      alignSelf: "stretch",
      borderWidth: 2,
      borderRadius: 16,
   },
   leftInputContainer: {
      flexDirection: "row",
      alignSelf: "stretch",
      alignItems: "center",
      flex: 1,
   },
   input: {
      height: 56,
      paddingHorizontal: 12,
      fontFamily: "Sora-Regular",
      fontSize: 16,
      color: Colors.gray_500,
      flex: 1,
   },
   label: {
      fontFamily: "Sora-Regular",
      fontSize: 16,
      color: Colors.gray_500,
   },
});
