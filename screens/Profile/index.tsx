import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, RefreshControl, ActivityIndicator, FlatList, Alert } from "react-native"
import { ProfileImage } from "@/component"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { Row } from "@/component"
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { useGetUserQuery } from "@/redux/api/bankApi";
import { logout } from '@/redux/slices/authSlice';
import { useState } from "react";

export default function Profile() {

    const { height: screenHeight } = Dimensions.get("window")

    const { data: authData } = useAppSelector(state => state.auth)
    const { data: user, refetch } = useGetUserQuery({
        id: authData?._id
    })
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const dispatch = useAppDispatch();


    const userData = user?.data

    console.log("nejbfefbe", userData)


    const firstName = userData?.firstName
    const lastName = userData?.lastName
    const AccountNumber = userData?.accountNumber
    const AccountBalance = userData?.accountBalance

    function formatNumber(amount: number | string): string {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;

        if (isNaN(num)) {
            throw new Error('Invalid number input');
        }

        return new Intl.NumberFormat(undefined, {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    }

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refetch();
        } catch (e) {
            console.error("Refresh failed", e);
        } finally {
            setRefreshing(false);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => {
                        dispatch(logout());
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }]
                        });
                    },
                    style: "destructive"
                }
            ]
        );
    };

    

    if (refreshing === true) {
        return (
            <SafeAreaView
                style={
                    {
                        height: screenHeight,
                        justifyContent: "center",
                        alignItems: 'center'
                    }
                }
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        )
    }

    return (

        <SafeAreaView>

            <ScrollView
                style={{
                    height: screenHeight,
                    marginTop: 30,
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                <Pressable style={styles.logoutContainer} onPress={handleLogout}>
                    <Text style={styles.logout}>Log Out</Text>
                </Pressable>

                <View style={styles.container}>

                    <ProfileImage
                        firstName={`${firstName}`}
                        lastName={`${lastName}`}
                        size={125}
                        fontSize={80}
                        style={styles.profileImg}
                    />

                    <Row style={styles.profileCard}>

                        <View style={styles.profileContainer}>


                            <View style={styles.textContainer}>

                                <Text style={styles.fontQuestion}>First Name: </Text>
                                <Text style={styles.fontQuestion}>Last Name: </Text>
                                <Text style={styles.fontQuestion}>Account Number: </Text>
                                <Text style={styles.fontQuestion}>Account Balance: </Text>

                            </View>

                            <View style={styles.textContainer}>

                                <Text style={styles.fontAnswer}>{firstName}</Text>
                                <Text style={styles.fontAnswer}>{lastName}</Text>
                                <Text style={styles.fontAnswer}>{AccountNumber}</Text>
                                <Text style={styles.fontAnswer}>₦{formatNumber(AccountBalance ?? 0)}</Text>

                            </View>

                        </View>

                    </Row>

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 16,
        // position: "relative",
        top: 120,
        // maxWidth: 650,
        // width: "100%",
    },

    profileContainer: {
        flexDirection: "row",
        gap: 50,
        marginBottom: 40,
    },

    textContainer: {
        gap: 14,
    },

    fontQuestion: {
        fontSize: 15,
        fontWeight: 600,
        textAlign: "left",
    },

    fontAnswer: {
        fontSize: 15,
        fontWeight: 400,
        textAlign: "right",
    },

    logout: {
        fontSize: 25,
        fontWeight: 600,
        color: "#F50B00",
        margin: 9,
    },

    logoutContainer: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "#F50B004D",
        borderWidth: 1,
        borderColor: "#F50B00",
        borderRadius: 15,
    },

    profileImg: {
        position: "absolute",
        top: -25,
        left: "38%",
        zIndex: 2,
    },

    profileCard: {
        // position: "relative",
        // top: 90,
        // zIndex: 2,

    },

})