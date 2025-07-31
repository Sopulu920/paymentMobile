import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface CardProps {
    amount?: string | number;
    cardNumber?: string | number;
    date?: string;
}

export const Card: React.FC<CardProps> = ({
    amount,
    cardNumber,
    date
}) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.totalContainer}>
                <View>
                    <Text style={styles.total}>Total Balance</Text>
                    <Text style={styles.money}>{amount}</Text>
                </View>

                <View style={styles.masterCardContainer}>
                    <View style={styles.red}></View>
                    <View style={styles.green}></View>
                </View>

            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.number}>{cardNumber}</Text>
                <Text style={styles.number}>{date}</Text>
            </View>
        </View>
    );
};

const size = 50

const styles = StyleSheet.create({

    cardContainer: {
        padding: 16,
        margin: 16,
        backgroundColor: '#004225',
        borderRadius: 20,
        gap: 100,
        elevation: 15,
    },

    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    total: {
        color: 'gray',
    },

    money: {
        fontSize: 20,
    },

    number: {
        fontSize: 17,
    },

    img: {
        width: 50,
        height: 50,
    },

    masterCardContainer: {
        width: size + 30,
        height: size,
        position: "relative",
        justifyContent: "center",
    },

    red: {
        width: size,
        height: size,
        backgroundColor: "red",
        borderRadius: 50,
        position: "absolute",
        opacity: 0.9,
    },

    green: {
        width: size,
        height: size,
        backgroundColor: "orange",
        borderRadius: 50,
        position: "absolute",
        left: 35,
        opacity: 0.9,
    },

});
