import React from "react";
import {
    StyleSheet,
    ScrollView,
    ViewStyle,
    StyleProp,
    View,
    Text,
} from "react-native";

interface RowProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>; // ✅ Optional & correct type
    // spaces?: number
    title?: string
}

export const Row: React.FC<RowProps> = ({
    children,
    style,
    title
}) => {
    return (
        <View
            // horizontal
            style={[styles.container, style]} // ✅ Apply runtime style here
        >
            <View>

                <Text style={styles.text}>
                    {title}
                </Text>

            </View>

            <ScrollView
                horizontal
                contentContainerStyle={styles.innerRow}
            >

                {children}

            </ScrollView>

        </View>
    );
};

// const space:React.FC<RowProps> = spaces??""

const styles = StyleSheet.create({
    container: {
        // position: "absolute",
        // zIndex: 2,
        elevation: 15,
        backgroundColor: "#fff",
        borderRadius: 15,
        // padding: 6,
        flexDirection: 'column',
        gap: 16,
        marginVertical: 30,
    },

    innerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        height: "100%",
        width: "100%",
        margin: 5,
    },

    text: {
        fontSize: 16,
        fontWeight: 600,
        margin: 10,
    },
});
