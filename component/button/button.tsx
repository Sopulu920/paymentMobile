
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';

interface ButtonProps {
    icon?: React.ReactNode
    onPress?: () => void
}

export const Button: React.FC<ButtonProps> = ({
    icon,
    onPress
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.btnContainer}
        >

            {/* <View style={styles.circle}> */}

            {icon}

            {/* </View> */}

        </Pressable>
    );
};

const size = 70

const styles = StyleSheet.create({

    btnContainer: {
        backgroundColor: "whitesmoke",
        width: size,
        height: size,
        borderRadius: size / 2,
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    // circle: {
    //     width: 35,
    //     height: 35,
    //     borderWidth: 5,
    //     borderColor: 'black',
    //     borderRadius: 30,
    //     backgroundColor: "transparent",
    //     padding: 6,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },

});
