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

    return (
        <View style={styles.container}>

            <Text style={styles.greet}>{timeOfDay()}</Text>

            <Text style={styles.person}>{name}</Text>

        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        justifyContent: "center",
        // alignItems: "center"
    },

    greet: {
        fontSize: 14,
        color: "#F5F5F5",
    },

    person: {
        fontSize: 38,
        color: "white",
    },
})