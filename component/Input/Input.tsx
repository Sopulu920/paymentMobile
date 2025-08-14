import { View, Text, TextInput, StyleSheet, Pressable } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
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

    const [show, setShow] = useState(true)

    return (
        <View style={styles.container}>
            {name ? (<Text style={styles.label}>{name}</Text>) : (<></>)}
            <TextInput
                style={styles.input}
                placeholder={placeholder ?? `Enter ${name}`}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secure && show}
                autoCorrect={false}
                autoCapitalize={capitalizeFirstLetter ? "words" : "none"}
                keyboardType={keyboardType ? keyboardType : "default"}
            />
            <View>
                {secure &&
                    (<
                        Pressable
                        style={styles.eye}
                        onPress={() => setShow(!show)}
                    >
                        {!show ? (<FontAwesome5
                            name="eye-slash"
                            size={18}
                            color="grey"
                        />)
                            :
                            (<FontAwesome5
                                name="eye"
                                size={18}
                                color="grey"
                            />)}
                    </Pressable>)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        gap: 10,
    },

    label: {
        fontWeight: 600,
    },

    input: {
        borderWidth: 2,
        borderColor: "#6393544D",

        borderRadius: 50,
        lineHeight: 18,
        padding: 20,
    },

    eye: {
        position: "absolute",
        right: 20,
        bottom: 20,
        padding: 10,
    },

})