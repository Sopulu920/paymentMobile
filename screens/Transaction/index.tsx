import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, RefreshControl, ActivityIndicator, FlatList } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useAppSelector } from '@/redux/hook';
import { useGetTransactionsQuery } from "@/redux/api/bankApi";
import { useState } from "react";

export default function History() {

    const { height: screenHeight } = Dimensions.get("window")

    const { data: authData } = useAppSelector(state => state.auth)
    const { data: transactionHistory, refetch } = useGetTransactionsQuery({
        user: authData?._id,
        // limit: 50
    })
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refetch();
        } catch (e) {
            console.error("Refresh failed", e);
        } finally {
            // setTimeout(() => {
            setRefreshing(false);
            // }, 5000);      
        }
    };


    const transactionData = transactionHistory?.data

    console.log("nejbfefbe", transactionData)

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

    const formatDateString = (
        dateString: string,
        options?: {
            includeTime?: boolean;
            timeFormat?: '12h' | '24h';
        }
    ): string => {
        if (!dateString) return '';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid date';

        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

        if (!options?.includeTime) return formattedDate;

        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        if (options?.timeFormat === '24h') {
            return `${formattedDate}; ${hours}:${minutes}`;
        }

        const ampm = hours >= 12 ? 'pm' : 'am';
        const hour12 = hours % 12 || 12;
        return `${formattedDate}; ${hour12}:${minutes} ${ampm}`;
    };

    const cap = (word: string) => {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1)
    }


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

        <SafeAreaView style={styles.container}>

            <View>

                <Text style={styles.header}>Transaction History</Text>

            </View>

            <FlatList
                data={transactionData}
                keyExtractor={(item) => item._id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                style={styles.flatList}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={[styles.listContainer,
                                // { backgroundColor: `${item.transactionType === "credit" ? "#61E838" : "#F01601"}` }
                            ]}
                        >
                            <FontAwesome5
                                name={item.transactionType === "credit" ? "arrow-up" : "arrow-down"}
                                size={22}
                                style={styles.items}
                                color={`${item.transactionType === "credit" ? "#61E838" : "#F01601"}`}
                                backgroundColor={`${item.transactionType === "credit" ? "#61E8384D" : "#F016014D"}`}
                            />
                            {/* <Text>{item.id}</Text> */}
                            <View
                                style={{
                                    flexDirection: "column",
                                }}
                            >
                                <Text>{cap(item.transactionType)}</Text>
                                <Text style={styles.date}>{formatDateString(item.createdAt)}</Text>
                            </View>
                            <Text
                                style={[styles.items, {
                                    color: "#000",
                                    // color: `${item.transactionType === "credit" ? "#61E838" : "#F01601"}`,
                                    backgroundColor: `${item.transactionType === "credit" ? "#61E8384D" : "#F016014D"}`
                                }]}
                            >
                                {`₦${formatNumber(item.amount)}`}
                            </Text>
                            {/* <Text>{item.type}</Text> */}
                        </View>
                    )
                }}
            />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        margin: 6,
        // marginBottom: 50,
        // flexGrow:1

    },

    header: {
        // textAlign: "center",
        textDecorationLine: "underline",
        fontSize: 20,
        paddingLeft: 12
    },

    listContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginVertical: 5,
        alignItems: "center",

    },

    items: {
        // lineHeight: 50,
        // backgroundColor: "#61E8384D" ,
        // color: "#61E838" ,
        padding: 6,
        borderRadius: 25,
    },

    flatList: {
        marginBottom: 100,        
        paddingHorizontal: 15,
        paddingBottom: 30,
    },

    date: {
        color: "#cbc1c1ff"
    }

})



