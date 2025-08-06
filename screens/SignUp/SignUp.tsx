import { View, StyleSheet, Text, Button, Dimensions, Pressable, KeyboardAvoidingView } from "react-native";
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
    const [signUp, { data: signupData }] = useSignupMutation()

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    console.log(email, firstName, lastName, password, confirmPassword)
    console.log("signUP", signupData)

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

    return (

        <SafeAreaView style={styles.Container}>

            <KeyboardAvoidingView
                behavior="padding"
                // keyboardVerticalOffset={50}
                style={{ width: "100%" }}
            >

                <View style={styles.formContainer}>

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

                </View>

            </KeyboardAvoidingView>

            <Text>{error}</Text>

        </SafeAreaView>
    )
}

const { height: screenHeight } = Dimensions.get("window")

const styles = StyleSheet.create({
    Container: {
        height: screenHeight,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    formContainer: {
        borderRadius: 15,
        padding: 6,
        elevation: 15,
        width: "100%",
        backgroundColor: "white",
        gap: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8, // higher = more shadow below
        },
        shadowOpacity: 0.2,
        shadowRadius: 10.32,
        // height: screenHeight * 0.5,
    },

    formField: {
        gap: 10,
    },

    formTitle: {
        fontSize: 30,
        fontWeight: 600,
        color: "green",
        textAlign: "center"
    },

    signUp: {
        flexDirection: "row",
        gap: 20,
        margin: 16,
        justifyContent: "center",
    },

    signUpText: {
        // fontSize: 26,
        color: "green"
    },

})