import { View, StyleSheet, Text, Button, Dimensions, Pressable } from "react-native";
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
                            
                onPress={()=>navigation.navigate("SignUp")}
                >
                    <Text style={styles.signUpText}>Sign Up</Text>
                </Pressable>

            </View>

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
    },

    signUpText: {
        // fontSize: 26,
        color: "green"
    },

})