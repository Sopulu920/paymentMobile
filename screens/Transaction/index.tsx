import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Dimensions, RefreshControl, ActivityIndicator, FlatList } from "react-native"
import { ProfileImage } from "@/component"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { Row } from "@/component"
import { useAppSelector } from '@/redux/hook';
import { useGetUserQuery } from "@/redux/api/bankApi";
import { useState } from "react";

interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: 'credit' | 'debit';
};

export default function History() {

    const { height: screenHeight } = Dimensions.get("window")

    const { data: authData } = useAppSelector(state => state.auth)
    const { data: user, refetch } = useGetUserQuery({
        id: authData?._id
    })
    const [refreshing, setRefreshing] = useState(false);

     const onRefresh = async () => {
        setRefreshing(true);
        try {
            // await refetch();
        } catch (e) {
            console.error("Refresh failed", e);
        } finally {
            // setTimeout(() => {
            setRefreshing(false);
            // }, 5000);      
        }
    };


    const userData = user?.data

    console.log("nejbfefbe", userData)


    const firstName = userData?.firstName
    const lastName = userData?.lastName
    const AccountNumber = userData?.accountNumber
    const AccountBalance = userData?.accountBalance


    const transactions: Transaction[] = [
        { id: '1', title: 'Salary', amount: 2000, date: '2025-08-01', type: 'credit' },
        { id: '2', title: 'Groceries', amount: -150, date: '2025-08-03', type: 'debit' },
        { id: '3', title: 'Electricity Bill', amount: -75, date: '2025-08-04', type: 'debit' },
        { id: '4', title: 'Transfer from John', amount: 500, date: '2025-08-05', type: 'credit' },
    ];

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

        <SafeAreaView style={{width:"100%"}}>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                width:1000
                                // position: "absolute",
                                // top: 90,
                            }}
                        >
                            <Text>{item.id}</Text>
                            <Text>{item.amount}</Text>
                            <Text>{item.date}</Text>
                            <Text>{item.title}</Text>
                            <Text>{item.type}</Text>
                        </View>
                    )
                }}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({



})



