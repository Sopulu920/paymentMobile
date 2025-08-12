import { View, Text, TextInput, StyleSheet, Platform, Pressable } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import type { KeyboardTypeOptions } from "react-native";
import { useState } from "react";

interface InputProps {
    name?: string;
    secure?: boolean;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    capitalizeFirstLetter?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
}

export const Input: React.FC<InputProps> = ({
    name,
    secure = false,
    placeholder,
    value,
    onChangeText,
    capitalizeFirstLetter = false,
    keyboardType,
}) => {

    // const [secure, setSecure] = useState(false)

    return (
        <View style={styles.container}>
            {name ? (<Text style={styles.label}>{name}</Text>) : (<></>)}
            <TextInput
                style={styles.input}
                placeholder={placeholder ?? `Enter ${name}`}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                autoCorrect={false}
                autoCapitalize={capitalizeFirstLetter ? "words" : "none"}
                keyboardType={keyboardType ? keyboardType : "default"}
            />
            <Pressable
                // onPress={ }
            >
                {secure &&
                    (<View style={styles.eye}>
                        {!secure ? (<FontAwesome5
                            name="eye"
                            size={18}
                        />)
                            :
                            (<FontAwesome5
                                name="eye-slash"
                                size={18}
                            />)}
                    </View>)
                }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        // position: "relative",
        // margin: 10,
        gap: 10,
    },

    label: {
        // color: "gray",
        // position: "absolute",
        // top: -8,
        // left: 20,
        // backgroundColor: "white",
        // zIndex: 2,
        fontWeight: 600,
    },

    input: {
        borderWidth: 2,
        borderColor: "#639354",
        borderRadius: 50,
        height: 58,
        padding: 20,
    },

    eye: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },

})