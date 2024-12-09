import { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";

import CustomText from "../../components/UI/CustomText";
import CustomDivider from "../../components/UI/CustomDivider";
import SubmitButton from "../../components/UI/SubmitButton";
import JobSectorPicker from "../../components/JobSelectorPicker";
import { setJobInformation } from "../../redux/personalInfReducer";
import CustomInput from "../../components/UI/CustomInput";
import { setTotal } from "../../redux/budgetReducer";
import MoneyAnimation from "../../components/MoneyAnimation";
import { isTablet } from "../../utils/deviceHelper";

const tablet = isTablet()
export default function Salary({ navigation }) {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const [salary, setSalary] = useState("");
    const [jobSector, setJobSector] = useState("");

    const handleContinue = () => {
        const trimmedSalary = salary.trim();
        const selectedSalary = parseFloat(trimmedSalary);

        if (trimmedSalary.length === 0) {
            Alert.alert("Please enter your monthly income.");
            return;
        }

        if (isNaN(selectedSalary) || selectedSalary === 0) {
            Alert.alert("Please enter your real salary.");
            return;
        }
        if (!jobSector || jobSector === "empty") {
            Alert.alert("Please select your job sector.");
            return;
        }

        dispatch(setTotal({ salary: trimmedSalary }))

        dispatch(setJobInformation({ salary: selectedSalary, jobSector: jobSector }));
        navigation.navigate('BottomTabs');
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safeArea}>
                <MoneyAnimation />
                <View style={styles.container}>
                    <View style={{ marginTop: '20%' }}>
                        <CustomText style={styles.mainText}>Enter your monthly income</CustomText>
                        <CustomInput
                            label="Income"
                            value={salary}
                            onChangeText={text => setSalary(text)}
                            mode="outlined"
                            style={styles.textInput}
                            placeholder="Enter your salary"
                            keyboardType="numeric"
                            maxLength={10}
                            theme={{ colors: { background: colors.surface } }}
                        />
                        <CustomText style={[styles.mainText, { marginBottom: 0 }]}>What is your job sector</CustomText>
                        <JobSectorPicker
                            selectedValue={jobSector}
                            onValueChange={setJobSector}
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                        <CustomDivider />
                        <SubmitButton
                            onPress={handleContinue}
                            style={styles.submitButton}
                        >
                            Continue
                        </SubmitButton>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
        fontSize: tablet ? 40 : 30,
        fontWeight: "600",
    },
    textInput: {
        borderColor: 'black',
        width: '90%',
        marginHorizontal: '5%',
        marginBottom: 40,
        backgroundColor: 'transparent',
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