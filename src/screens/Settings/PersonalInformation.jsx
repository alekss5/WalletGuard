import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import CustomText from '../../components/UI/CustomText';
import CustomInput from '../../components/UI/CustomInput';
import SubmitButton from '../../components/UI/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAge, selectName, setPersonalInfo } from '../../redux/personalInfReducer';

export default function PersonalInformation({ navigation }) {
    const dispatch = useDispatch();
    const savedName = useSelector(selectName);
    const savedAge = useSelector(selectAge);

    const [name, setName] = useState(savedName);
    const [age, setAge] = useState(savedAge);

    const handleContinue = () => {
        const trimmedName = name.trim();
        const trimmedAge = age.trim();
        const parsedAge = parseInt(trimmedAge, 10);

        if (trimmedName.length === 0) {
            alert("Please enter your name.");
            return;
        }

        if (trimmedAge.length === 0) {
            alert("Please enter your age.");
            return;
        }

        if (parsedAge >= 99) {
            alert('Wow is this your real age?');
            return;
        }

        if (isNaN(parsedAge) || parsedAge <= 0) {
            alert("Please enter a valid age.");
            return;
        }

        dispatch(setPersonalInfo({ name: trimmedName, age: parsedAge }));
        navigation.navigate('Settings');
    };

    return (
        <BackgroundColorContainer>
            <View style={styles.container}>
                    <CustomText style={styles.mainText}>Name</CustomText>
                    <CustomInput
                        value={name}
                        onChangeText={text => setName(text)}
                        mode="outlined"
                        style={styles.textInput}
                        placeholder="Enter your name"
                        maxLength={14}
                        autoCorrect={false}
                    />
                    <CustomText style={styles.mainText}>Age</CustomText>
                    <CustomInput
                        value={age}
                        onChangeText={text => setAge(text)}
                        mode="outlined"
                        style={styles.textInput}
                        placeholder="Enter your age"
                        keyboardType="numeric"
                        maxLength={3}
                    />
                    <SubmitButton onPress={handleContinue} style={styles.submitButton}>
                        Save
                    </SubmitButton>
            </View>
        </BackgroundColorContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        marginTop:'7%'
    },
    inputContainer: {
        marginTop: '20%',
    },
    mainText: {
        marginBottom: 18,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "600",
    },
    textInput: {
        marginBottom: 20,    
    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom:100,
    },
    submitButton: {
        width: '100%',
    },
});
