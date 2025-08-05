import { View, StyleSheet, Text, Button, Dimensions, Pressable, KeyboardAvoidingView } from "react-native";
import { Input } from "@/component";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    MainTabs: undefined;
    SignUp: undefined
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs', 'SignUp'>;

export default function Login() {

    const navigation = useNavigation<NavigationProp>()

    return (

        <SafeAreaView style={styles.Container}>

            <KeyboardAvoidingView
                behavior="padding"
                // keyboardVerticalOffset={50}
                style={{ width: "100%" }}
            >

                <View style={styles.formContainer}>

                    <Text style={styles.formTitle}>WELCOME</Text>

                    <View style={styles.formField}>

                        <Input
                            name="Email Address"
                        />

                        <Input
                            name="Password"
                        />

                    </View>

                    <View style={{ marginBottom: 13 }}>

                        <Button
                            title="Login"
                            onPress={() => {
                                console.log("login")
                                navigation.navigate("MainTabs")
                            }}
                            color={"green"}
                        // style={{}}
                        />

                    </View>

                </View>

                <View style={styles.signUp}>

                    <Text>
                        I don't have an Account ?
                    </Text>

                    <Pressable

                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </Pressable>

                </View>

            </KeyboardAvoidingView>

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