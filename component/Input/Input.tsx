import { View, Text, TextInput, StyleSheet, Platform } from "react-native"

interface InputProps {
    name?: string;
    secure?: boolean;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    capitalizeFirstLetter?: boolean;
}

export const Input: React.FC<InputProps> = ({
    name = "Title",
    secure = false,
    placeholder,
    value,
    onChangeText,
    capitalizeFirstLetter = false,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{name}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder ?? `Enter ${name}`}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                autoCorrect={false}
                autoCapitalize={capitalizeFirstLetter ? "words" : "none"}
            // keybo
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        position: "relative",
        margin: 10,
    },

    label: {
        color: "gray",
        position: "absolute",
        top: -8,
        left: 20,
        backgroundColor: "white",
        zIndex: 2,
    },

    input: {
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 5,
        height: Platform.OS === "ios" ? 38 : "auto",
        padding: 6,
    },

})