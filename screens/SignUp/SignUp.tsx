import { View, StyleSheet, Text, Dimensions, Pressable, KeyboardAvoidingView, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Input } from "@/component";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSignupMutation } from "@/redux/api/bankApi";

type RootStackParamList = {
    Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function SignUp() {

    const navigation = useNavigation<NavigationProp>()
    const [signUp, { data: signupData, isLoading }] = useSignupMutation()

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [refreshing, setRefreshing] = useState(false);


    console.log(email, firstName, lastName, password, confirmPassword)
    console.log("signUP", signupData)

    const clearField = () => {
        setEmail("")
        setFirstName("")
        setLastName("")
        setPassword("")
        setPhone("")
        setConfirmPassword("")
    }
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await clearField()
            //   await refetch(); // 👈 This is from useGetTransactionsQuery
        } catch (e) {
            console.error("Refresh failed", e);
        } finally {
            // setTimeout(() => {
            setRefreshing(false);
            // }, 5000);      
        }
    };


    const handleSign = async () => {
        try {
            await signUp({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
            }).unwrap()

            // await console.log("fuck-off")

            navigation.navigate("Login")
        } catch (err) {
            console.log(err)
            setError(`${err}`)
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
                            name="First Name"
                            capitalizeFirstLetter={true}
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <Input
                            name="Last Name"
                            capitalizeFirstLetter={true}
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <Input
                            name="Phone"
                            // capitalizeFirstLetter={true}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="numeric"
                        />

                        <Input
                            name="Password"
                            secure={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Input
                            name="Confirm Password"
                            secure={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        {/* <LinearGradient
                                        
                                    /> */}
                        {/* <LinearGradient
                                        colors={['#ff7e5f', '#feb47b']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ height: 100, width: '100%' }}
                                    >
                
                                    </LinearGradient> */}


                        <Pressable
                            style={styles.signUpBtn}
                            onPress={handleSign}
                        >

                            <Text style={styles.signUpText}>
                                Sign Up
                            </Text>

                        </Pressable>

                    </View>

                    <View style={styles.login}>

                        <View style={styles.line} />

                        <View style={{ flexDirection: "row", gap: 5 }}>

                            <Text>
                                I Already have an Account ?
                            </Text>

                            <Pressable

                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={styles.loginText}>Log in</Text>
                            </Pressable>

                        </View>

                        <View style={styles.line} />

                    </View>

                    {/* <View style={styles.formContainer}>

                    <Text style={styles.formTitle}>SIGN UP</Text>

                    <View style={styles.formField}>

                        <Input
                            name="Email Address"
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Input
                            name="First Name"
                            capitalizeFirstLetter={true}
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <Input
                            name="Last Name"
                            capitalizeFirstLetter={true}
                            value={lastName}
                            onChangeText={setLastName}
                        />

                        <Input
                            name="Phone"
                            // capitalizeFirstLetter={true}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="numeric"
                        />

                        <Input
                            name="Password"
                            secure={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <Input
                            name="Confirm Password"
                            secure={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                    </View>

                    <View style={{ marginBottom: 13 }}>

                        <Button
                            title="Sign Up"
                            onPress={() => handleSign()}
                            color={"green"}
                        // style={{}}
                        />

                    </View>

                </View>

                <View style={styles.signUp}>

                    <Text>
                        I Already have an Account ?
                    </Text>

                    <Pressable
                        onPress={() => {
                            console.log("login")
                            navigation.navigate("Login")
                        }}
                    >
                        <Text style={styles.signUpText}>Log in</Text>
                    </Pressable> 

                </View>*/}
                </ScrollView>

            </KeyboardAvoidingView>

            {/* <Text>{error}</Text> */}

        </SafeAreaView >
    )
}

const { height: screenHeight, width: screenWidth } = Dimensions.get("window")

const styles = StyleSheet.create({

    Container: {
        // flex: 1,
        // width: screenWidth,
        // height: screenHeight,
        padding: 26,
        // borderColor: "red",
        // borderWidth: 2,
        // justifyContent: "center",
        // alignItems: "center",
    },

    scrollContainer: {
        // flexGrow: 1
        // width: screenWidth,
        // height: "100%"
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
        gap: 10,
        // borderRadius: 15,
        // padding: 6,
        // elevation: 15,
        // width: "100%",
        // backgroundColor: "white",
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 8, // higher = more shadow below
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 10.32,
        // height: screenHeight * 0.5,
    },

    signUpBtn: {
        height: 58,
        backgroundColor: "#61E838",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    signUpText: {
        fontSize: 20,
        fontWeight: 600,
    },

    login: {
        flexDirection: "row",
        gap: 12,
        marginVertical: 56,
        justifyContent: "center",
        alignItems: "center",
    },

    loginText: {
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
    // Container: {
    //     height: screenHeight,
    //     padding: 16,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },

    // formContainer: {
    //     borderRadius: 15,
    //     padding: 6,
    //     elevation: 15,
    //     width: "100%",
    //     backgroundColor: "white",
    //     gap: 40,
    //     shadowColor: '#000',
    //     shadowOffset: {
    //         width: 0,
    //         height: 8, // higher = more shadow below
    //     },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 10.32,
    //     // height: screenHeight * 0.5,
    // },

    // formField: {
    //     gap: 10,
    // },

    // formTitle: {
    //     fontSize: 30,
    //     fontWeight: 600,
    //     color: "green",
    //     textAlign: "center"
    // },

    // signUp: {
    //     flexDirection: "row",
    //     gap: 20,
    //     margin: 16,
    //     justifyContent: "center",
    // },

    // signUpText: {
    //     // fontSize: 26,
    //     color: "green"
    // },

})