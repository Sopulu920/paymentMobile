import { View, Text, StyleSheet, Pressable } from "react-native"
import { ProfileImage } from "@/component"
import { Row } from "@/component"

export default function Profile() {

    const firstName = "John"
    const lastName = "Doe"
    const AccountNumber = "938457693902082747"

    return (
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

                    </View>

                    <View style={styles.textContainer}>

                        <Text style={styles.fontAnswer}>{firstName}</Text>
                        <Text style={styles.fontAnswer}>{lastName}</Text>
                        <Text style={styles.fontAnswer}>{AccountNumber}</Text>

                    </View>

                </View>

            </Row>

            <Pressable>
                <Text style={styles.logout}>Log Out</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        padding: 16,
        position: "relative",
        top: 90,
        // maxWidth: 650,
        // width: "100%",
    },

    profileContainer: {
        flexDirection: "row",
        gap: 50,
    },

    textContainer: {
        gap: 14,
    },

    fontQuestion: {
        fontSize: 15,
        fontWeight: 600,
        textAlign:"left",
    },

    fontAnswer: {
        fontSize: 15,
        fontWeight: 400,
        textAlign:"right",
    },

    logout: {
        fontSize: 15,
        fontWeight: 600,
        color: "red",
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