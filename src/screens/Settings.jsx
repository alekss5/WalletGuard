import { useCallback } from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';

import SettingsItem from '../components/SettingsItem';
import BackgroundColorContainer from '../components/UI/BackgroundColorContainer';
import BackgroundImageContainer from '../components/UI/BackgroundImageContainer';
import CustomText from '../components/UI/CustomText';
import CustomButton from '../components/UI/CustomButton';
import { lightVibration } from '../utils/vibrationPaterns';
import { useSelector } from 'react-redux';
import { selectEmail } from '../redux/selectors/personalInf';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 370;
export default function Settings({ navigation }) {
    const email = useSelector(selectEmail)
    const isLoggedIn = email && email.trim() !== ""

    const handleNavigation = useCallback((route) => {
        lightVibration();
        navigation.navigate(route);
    }, [navigation]);

    const navigateToHelp = () => {
        lightVibration();
        navigation.navigate('CommingSoon');

    }
    const navigateToInstagram = () => {
        lightVibration();
        navigation.navigate('CommingSoon');

    }
    const logOut = () => {

    }

    return (
        <BackgroundColorContainer>
            <BackgroundImageContainer>
                <View style={styles.container}>
                    {/* <CustomButton
                        onPress={() => handleNavigation('Upgrade')}
                        style={styles.upgradeButton}
                        textStyle={styles.upgradeButtonText}
                    >
                        Upgrade to premium
                    </CustomButton> */}
                    <SafeAreaView>

                    <ScrollView>
                        <Section title="System">
                            <SettingsItem onPress={() => handleNavigation('PersonalInformation')} icon="person" text="Personal Information" />
                            <SettingsItem onPress={() => handleNavigation('StartDate')} icon="calendar" text="Start Date" />
                            <SettingsItem onPress={() => handleNavigation('CurrencyList')} icon="logo-euro" text="Currency" />
                            <SettingsItem onPress={() => handleNavigation('Subscriptions')} icon="calendar-number-outline" text="Subscriptions" />
                            <SettingsItem onPress={() => handleNavigation('Budget')} icon="wallet-outline" text="Budget" />
                        </Section>
                        <Section title="Preferences">
                            <SettingsItem onPress={() => handleNavigation('Theme')} icon="phone-portrait" text="Theme" />
                            <SettingsItem onPress={() => handleNavigation('Notifications')} icon="notifications" text="Notifications" />
                            <SettingsItem onPress={() => handleNavigation('Privacy')} icon="lock-open-outline" text="Privacy" />
                        </Section>
                        <Section title="Support & Feedback">
                            <SettingsItem onPress={navigateToHelp} icon="help-circle-outline" text="Help" />
                            <SettingsItem onPress={navigateToInstagram} icon="logo-instagram" text="Instagram" />
                        </Section>
                        {/* <Section title="Account">
                            {isLoggedIn ? <SettingsItem onPress={logOut} icon="log-out-outline" text="Log out" /> : <>
                                <SettingsItem onPress={() => handleNavigation('Register')} icon="create-outline" text="Create account" />
                                <SettingsItem onPress={() => handleNavigation('Login')} icon="log-in-outline" text="Log in" />
                            </>}
                        </Section> */}
                    </ScrollView>
                    </SafeAreaView>

                </View>
            </BackgroundImageContainer>
        </BackgroundColorContainer>
    );
}

const Section = ({ title, children }) => (
    <>
        <CustomText style={styles.headerText}>{title}</CustomText>
        {children}
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
    },
    upgradeButton: {
        width: '60%',
        height: 50,
        alignSelf: 'center',
        marginVertical: 40,
        marginTop: 80,
        ...(isSmallDevice && { marginTop: 50, }),
    },
    upgradeButtonText: {
        fontWeight: '700',
    },
    headerText: {
        marginTop: 20,
        fontSize: 16,
    },
    divider: {
        height: 1,
        width: '100%',
        alignSelf: 'center',
        marginVertical: 5,
    },
});
