import { View, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from "react-native"

interface InputProps {
    name?: string
}

export const Input: React.FC<InputProps> = ({
    name = "title"
}) => {
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={100}
            style={styles.container}
        >
            <Text style={styles.label}>{name}</Text>
            <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
            // keybo
            />
        </KeyboardAvoidingView>
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