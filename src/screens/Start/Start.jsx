import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import CustomText from "../../components/UI/CustomText";
import CustomDivider from "../../components/UI/CustomDivider";
import SubmitButton from "../../components/UI/SubmitButton";
import MoneyAnimation from "../../components/MoneyAnimation";
import { isTablet } from "../../utils/deviceHelper";

const tablet = isTablet()

export default function Start({ navigation }) {
    const { colors } = useTheme();

    const iconSize = tablet ? 32 : 26

    return (
        <SafeAreaView style={styles.safeArea}>
            <MoneyAnimation />
            <View style={styles.container}>
                <View style={{ marginTop: '20%' }}>
                    <CustomText style={styles.mainText}>Welcome to Wallet Guardian</CustomText>
                    <CustomText style={styles.secondaryText}>Take Control of Your Finances</CustomText>

                    <View style={[styles.infoContainer, { backgroundColor: colors.surface }]}>
                        <View style={styles.row}>
                            <FontAwesome name="check" size={iconSize} color="black" />
                            <CustomText style={styles.infoText}>Track Every Dollar, Every Day</CustomText>
                        </View>
                        <View style={styles.row}>
                            <FontAwesome name="check" size={iconSize} color="black" />
                            <CustomText style={styles.infoText}>Visualize Your Spendings</CustomText>
                        </View>
                        <View style={styles.row}>
                            <FontAwesome name="check" size={iconSize} color="black" />
                            <CustomText style={styles.infoText}>No distracting colors</CustomText>
                        </View>

                        <View style={styles.row}>
                            <FontAwesome name="check" size={iconSize} color="black" />
                            <CustomText style={styles.infoText}>Grow Your Savings with Ease</CustomText>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <CustomDivider />

                    <SubmitButton
                        onPress={() => { navigation.navigate('Login') }}
                        style={styles.submitButton}
                    >
                        Continue
                    </SubmitButton>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: tablet ? 40 : 28,
        fontWeight: "600",
    },
    secondaryText: {
        marginBottom: 55,
        textAlign: "center",
        fontSize: tablet ? 25 : 18,
    },
    infoContainer: {
        marginTop: 10,
        width: '90%',
        maxWidth: 500,
        alignSelf: 'center',
        borderRadius: 15,
        padding: tablet ? 60 : 40,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: tablet ? 25 : 19,
        marginLeft: 10,
        fontWeight: '500',
    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 50,
    },
    submitButton: {

        width: '90%',
        maxWidth: 500,
    },
});
