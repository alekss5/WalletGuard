import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LottieView from "lottie-react-native";

import money from '../../../assets/animations/money.json'
import CustomText from "../../components/UI/CustomText";
import CustomDivider from "../../components/UI/CustomDivider";
import SubmitButton from "../../components/UI/SubmitButton";


export default function Start({ navigation }) {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={styles.safeArea}>
             <LottieView
            source={money}
            autoPlay
            loop={true}
            style={styles.animation}
            speed={0.5}
          />
            <View style={styles.container}>
                <View style={{marginTop:'20%'}}>
                    <CustomText style={styles.mainText}>Welcome to WalletGuard</CustomText>
                    <CustomText style={styles.secondaryText}>Take Control of Your Finances</CustomText>

                    <View style={[styles.infoContainer, { backgroundColor: colors.surface }]}>
                        <View style={styles.row}>
                            <FontAwesome name="check" size={26} color="black" />
                            <CustomText style={styles.infoText}>Track Every Dollar, Every Day</CustomText>
                        </View>
                        <View style={styles.row}>
                            <FontAwesome name="check" size={26} color="black" />
                            <CustomText style={styles.infoText}>Grow Your Savings with Ease</CustomText>
                        </View>
                        <View style={styles.row}>
                            <FontAwesome name="check" size={26} color="black" />
                            <CustomText style={styles.infoText}>Secure Your Financial Future</CustomText>
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
    animation: {
       position:'absolute',
        width: "100%",
        height: "80%",
      },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "600",
    },
    secondaryText: {
        marginBottom: 55,
        textAlign: "center",
        fontSize: 18,
    },
    infoContainer: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        padding: 40,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 19,
        marginLeft: 10,
        fontWeight: '500',
    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 50,  // Optional: Adds some space at the bottom
    },
    submitButton: {
        width: '90%',
    },
});
