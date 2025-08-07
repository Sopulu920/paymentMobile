import { View, Text, StyleSheet, ViewStyle, StyleProp, } from "react-native"

interface statProp {
    icon?: React.ReactNode
    title?: string
    value?: string | number
    style?: StyleProp<ViewStyle>
    cardColour?: string
    iconColour?: string
}

export const StatCard: React.FC<statProp> = ({
    icon,
    title,
    value,
    style,
    cardColour,
    iconColour,
}) => {
    return (
        <View style={[styles.container, style, { backgroundColor: cardColour }]}>

            <View style={[styles.iconContent, { backgroundColor: iconColour }]}>
                {icon}
            </View>

            <View style={styles.content}>

                <Text style={styles.titleContent}>
                    {title}
                </Text>

                <Text style={styles.valueContent}>
                    ₦{value}
                </Text>

            </View>

        </View >
    )
}

const size = 50

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 5,
        padding: 6,
        borderWidth: 2,
        borderColor: "whitesmoke",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8, // higher = more shadow below
        },
        shadowOpacity: 0.2,
        shadowRadius: 10.32,
        marginBottom: 10,
    },

    content: {
        flexDirection: "column"
    },

    titleContent: {
        fontSize: 12,
    },

    valueContent: {
        fontSize: 20,
    },

    iconContent: {
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
        borderWidth: 2,
        borderColor: "whitesmoke",
        borderRadius: size / 3,
    },
})