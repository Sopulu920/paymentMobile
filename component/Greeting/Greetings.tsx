import { View, Text, StyleSheet } from "react-native";

interface GreetProp {
    name?: string
}

export const Greetings: React.FC<GreetProp> = ({
    name = "Jane Doe"
}) => {

    const timeOfDay = () => {
        const time = new Date().getHours()
        if (time < 12) {
            return "Good Morning"
        } else if (time >= 12 && time <= 16) {
            return "Good Afternoon"
        } else {
            return "Good Evening"
        }
    }

    const greetingOnTime = `${timeOfDay()},`

    return (
        <View style={styles.container}>

            <Text style={styles.greet}>{greetingOnTime}</Text>

            <Text style={styles.person}>{name}</Text>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        // alignItems: "center"
    },

    greet: {
        fontSize: 24,
        fontWeight: 400,
        // color: "darkgreen",
    },

    person: {
        fontSize: 28,
        fontWeight: 600,
        // color: "white",
    },
})