import React, { useState } from "react";
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import money from '../../../assets/animations/money.json';
import CustomText from "../../components/UI/CustomText";
import CustomDivider from "../../components/UI/CustomDivider";
import SubmitButton from "../../components/UI/SubmitButton";
import { useDispatch } from "react-redux";
import { setPersonalInfo } from "../../redux/personalInfReducer";
import CustomInput from "../../components/UI/CustomInput";

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(""); 
    const [age, setAge] = useState(""); 

    const handleContinue = () => {
        const trimmedName = name.trim();
        const trimmedAge = age.trim();
        const parsedAge = parseInt(trimmedAge, 10);
    
        if (trimmedName.length === 0) {
            Alert.alert("Please enter your name.");
            return;
        }
    
        if (trimmedAge.length === 0) {
            Alert.alert("Please enter your age.");
            return;
        }
        
        if (parsedAge >= 99) {
            Alert.alert('Wow is this your real age?');
            return;
        }
    
        if (isNaN(parsedAge) || parsedAge <= 0) {
            Alert.alert("Please enter a valid age.");
            return;
        }
    
        dispatch(setPersonalInfo({ name: trimmedName, age: parsedAge }));
        navigation.navigate('StartCurrency');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.safeArea}>
                <LottieView
                    source={money}
                    autoPlay
                    loop={true}
                    style={styles.animation}
                    speed={0.5}
                />
                <View style={styles.container}>
                    <View style={{ marginTop: '20%' }}>
                        <CustomText style={styles.mainText}>What is your name?</CustomText>
                        <CustomInput
                            value={name}
                            onChangeText={text => setName(text)}
                            mode="outlined"
                            style={styles.textInput}
                            placeholder="Enter your name"
                            maxLength={14}
                            autoCorrect={false}
                        />
                        <CustomText style={styles.mainText}>Enter your age</CustomText> 
                        <CustomInput
                            value={age}
                            onChangeText={text => setAge(text)}
                            mode="outlined"
                            style={styles.textInput}
                            placeholder="Enter your age"
                            keyboardType="numeric" 
                            maxLength={3} 
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
    animation: {
        position: 'absolute',
        width: "100%",
        height: "80%",
    },
    container: {
        flex: 1,
        width:'90%',
        marginLeft:'5%',
        
        justifyContent: 'space-between',
    },
    mainText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "600",
    },
    textInput: {
      
        marginBottom: 20,
        backgroundColor: 'transparent',
        borderColor:'black',

    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 50,
    },
    submitButton: {
        width: '100%',
    },
});
