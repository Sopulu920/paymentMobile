import { View, StyleSheet, Text, Dimensions, Pressable, KeyboardAvoidingView, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Input } from "@/component";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from "react";
import { useLoginMutation } from "@/redux/api/bankApi";
import { useAppDispatch } from "@/redux/hook";
import { setCredentials } from "@/redux/slices/authSlice";


type RootStackParamList = {
    MainTabs: undefined;
    SignUp: undefined
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs', 'SignUp'>;


export default function Login() {
    const navigation = useNavigation<NavigationProp>()
    const [login, { data: loginData, isLoading }] = useLoginMutation()
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [refreshing, setRefreshing] = useState(false);

    console.log(email, password)
    console.log("login", loginData)

    const clearField = () => {
        setEmail("")
        setPassword("")
    }
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await clearField()
        } catch (e) {
            console.error("Refresh failed", e);
        } finally {
            setRefreshing(false);
        }
    };


    const handleLogin = async () => {
        try {
            const response = await login({
                email: email,
                password: password,
            }).unwrap()

            // Store login data in Redux
            dispatch(setCredentials({
                data: response.data
            }))
            console.log("respose", response)
            navigation.navigate("MainTabs")

        } catch (err) {
            console.log(err)
        }
    }

    if (refreshing || isLoading === true) {
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

        <SafeAreaView style={styles.Container}>

            <KeyboardAvoidingView
                behavior="padding"
                // keyboardVerticalOffset={50}
                style={{ width: "100%" }}
            >

                <ScrollView
                    // contentContainerStyle={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.logoContainer}>

                        <FontAwesome5
                            name="university"
                            size={35}
                            color="#67BE4D"
                        />

                        <Text style={styles.logoText}>
                            PAY MOBILE
                        </Text>

                    </View>

                    <View style={styles.welcomeContainer}>

                        <Text style={styles.welcomeText}>
                            Welcome !
                        </Text>
                        <Text>
                            Enter Your Account
                        </Text>

                    </View>

                    <View style={styles.formContainer}>

                        <Input
                            name="Email Address"
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            name="Password"
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secure={true}
                        />

                        <Pressable
                            style={styles.loginBtn}
                            onPress={handleLogin}
                        >

                            <Text style={styles.loginText}>
                                LOGIN
                            </Text>

                        </Pressable>

                    </View>

                    <View style={styles.signUp}>

                        <View style={styles.line} />

                        <View style={{ flexDirection: "row", gap: 5 }}>

                            <Text>
                                I don't have an Account ?
                            </Text>

                            <Pressable

                                onPress={() => navigation.navigate("SignUp")}
                            >
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </Pressable>

                        </View>

                        <View style={styles.line} />

                    </View>
                    
                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const { height: screenHeight } = Dimensions.get("window")

const styles = StyleSheet.create({
    Container: {
        height: screenHeight,
        padding: 26,
        // borderColor: "red",
        // borderWidth: 2,        
        // justifyContent: "center",
        // alignItems: "center",
    },

    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 14,
    },

    logoText: {
        fontSize: 25,
        fontWeight: 600,
    },

    welcomeContainer: {
        marginVertical: 26,
    },

    welcomeText: {
        fontSize: 25,
        fontWeight: 600,
    },

    formContainer: {
        gap: 30,
    },

    loginBtn: {
        height: 58,
        backgroundColor: "#61E838",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    loginText: {
        fontSize: 20,
        fontWeight: 600,
    },

    signUp: {
        flexDirection: "row",
        gap: 12,
        marginTop: 56,
        justifyContent: "center",
        alignItems: "center",
    },

    signUpText: {
        // fontSize: 26,
        color: "green",
        textDecorationLine: "underline",
        fontWeight: 600,
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#000000ff"
    },

})

