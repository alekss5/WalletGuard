import { StyleSheet, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import CustomText from '../../components/UI/CustomText';
import CustomInput from '../../components/UI/CustomInput';
import SubmitButton from '../../components/UI/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/personalInfReducer';
import { selectAge, selectJobSector, selectName, selectSalary } from '../../redux/selectors/personalInf';
import { useTheme } from 'react-native-paper';
import { putRegisterUser } from '../../utils/https';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toggleDoneAnumation } from '../../redux/uiNoRealmReducer';

export default function Register({ navigation }) {
    const dispatch = useDispatch();
    const { colors } = useTheme()
    const savedName = useSelector(selectName);
    const savedAge = useSelector(selectAge);
    const salary = useSelector(selectSalary)
    const jobSector = useSelector(selectJobSector)
    const [loading, setIsloading] = useState(false)

    const [name, setName] = useState(savedName);
    const [age, setAge] = useState(savedAge);
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()

    const handleContinue = async () => {
        setIsloading(true)
        const trimmedName = name.trim();
        const trimmedSurname = lastName?.trim();
        const trimmedAge = age.trim();
        const trimmedEmail = email?.trim();
        const parsedAge = parseInt(trimmedAge, 10);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(trimmedEmail);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        const isValidPassword = passwordRegex.test(password);

        if (trimmedName.length === 0) {
            setIsloading(false)
            alert("Please enter your name.");
            return;
        }

        if (!trimmedSurname || trimmedSurname.length === 0) {
            setIsloading(false)
            alert("Please enter your surname.");
            return;
        }

        if (trimmedAge.length === 0) {
            setIsloading(false)
            alert("Please enter your age.");
            return;
        }

        if (parsedAge >= 99) {
            setIsloading(false)
            alert('Wow is this your real age?');
            return;
        }

        if (isNaN(parsedAge) || parsedAge <= 0) {
            setIsloading(false)
            alert("Please enter a valid age.");
            return;
        }

        if (!trimmedEmail || !isValidEmail) {
            setIsloading(false)
            alert("Please enter a valid email address.");
            return;
        }

        if (!password || !isValidPassword) {
            setIsloading(false)
            alert("Password must be at least 6 characters long, and with at least one capital letter.");
            return;
        }
        try {
            const response = await putRegisterUser({ name, lastName, age, salary, jobSector, email, password });
            
            console.log(response);
          
            // Check if the status code is 201 (Created)
            if (response.status === 201) {
              setIsloading(false);
              navigation.navigate('Settings');
              dispatch(toggleDoneAnumation())
              dispatch(setEmail(email));
              dispatch(setToken(response.token));
            } else {
              // Handle other success status codes (e.g., 200 OK)
              setIsloading(false);
              console.log(`Success with status ${response.status}`);
              // You can decide what to do here based on the status code.
            }
          
          } catch (error) {
            console.log(error);
            setIsloading(false);
          
            // Handle different error cases
            if (error.response) {
              const status = error.response.status;
              const message = error.response.data.message || 'An error occurred';
              Alert.alert(`Error ${status}`, `${message}`);
            } else if (error.request) {
              // Request was made but no response received
              alert('No response received from the server');
            } else {
              // Some other error (network issue, etc.)
              alert('An unexpected error occurred');
            }
          }
          
    };

    return (
        <BackgroundColorContainer>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.container}>
                        <CustomText style={styles.mainText}>Create Acount</CustomText>

                        <CustomText style={[styles.subText, { color: colors.subtext }]}>Name</CustomText>
                        <CustomInput
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.textInput}
                            placeholder="Enter your name"
                            maxLength={14}
                            autoCorrect={false}
                        />

                        <CustomText style={[styles.subText, { color: colors.subtext }]}>Surname</CustomText>
                        <CustomInput
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            style={styles.textInput}
                            placeholder="Enter your last name"
                            maxLength={40}
                            autoCorrect={false}
                        />

                        <CustomText style={[styles.subText, { color: colors.subtext }]}>Age</CustomText>
                        <CustomInput
                            value={age}
                            onChangeText={text => setAge(text)}
                            style={styles.textInput}
                            placeholder="Enter your age"
                            keyboardType="numeric"
                            maxLength={3}
                        />
                        <CustomText style={[styles.subText, { color: colors.subtext }]}>Email</CustomText>
                        <CustomInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.textInput}
                            placeholder="Enter yout e-mail"

                        />

                        <CustomText style={[styles.subText, { color: colors.subtext }]}>Password</CustomText>
                        <CustomInput
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.textInput}
                            placeholder="Enter password"
                            secureTextEntry={true}
                        />
                        <SubmitButton onPress={handleContinue} style={styles.submitButton}>
                            {loading ? <ActivityIndicator size='small' /> : 'Create Acount'}
                        </SubmitButton>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </BackgroundColorContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        marginLeft: '5%',
        marginTop: '5%'
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
    subText: {

        marginLeft: 10,
        fontSize: 16,
        fontWeight: "500",

    },
    textInput: {
        marginBottom: 20,
    },
    bottomContainer: {
        alignItems: 'center',
        paddingBottom: 100,
    },
    submitButton: {
        width: '100%',
    },
});
