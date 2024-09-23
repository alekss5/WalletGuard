import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from 'react-native-paper';
import Theme from "../screens/Settings/Theme";
import Privacy from "../screens/Settings/Privacy";
import StartDate from "../screens/Settings/StartDate";
import Subscriptions from "../screens/Settings/Subscriptions";
import MonthlyBudget from "../screens/Settings/MonthlyBudget";
import CreateAcount from "../screens/Settings/CreateAcount";
import Settings from "../screens/Settings";
import CurrencyList from "../screens/Settings/CurrencyList";
import Notifications from "../screens/Settings/Notifications";
import PersonalInformation from "../screens/Settings/PersonalInformation";

const SettingsStack = createStackNavigator();

export default function SettingsStackNavigation() {
    const { colors } = useTheme();

    return (
        <SettingsStack.Navigator
            screenOptions={{
                headerTintColor: colors.text,
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerBackTitle: 'Settings',

            }}
        >
            <SettingsStack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: 'Settings',
                    headerBackTitleVisible: false,
                    headerShown: false,
                }}
            />
              <SettingsStack.Screen
                name="PersonalInformation"
                component={PersonalInformation}
                options={{
                    headerTitle: 'Personal Information',
                }}
            />
            <SettingsStack.Screen
                name="Theme"
                component={Theme}
                title="Theme"
            />
              <SettingsStack.Screen
                name="Notifications"
                component={Notifications}
                title="Notifications"
            />
            <SettingsStack.Screen
                name="Privacy"
                component={Privacy}
            />
            <SettingsStack.Screen
                name="StartDate"
                component={StartDate}
                options={{
                    headerTitle:'Choose a Start Date',
                }}
            />
            <SettingsStack.Screen
                name="CurrencyList"
                component={CurrencyList}
                options={{
                    headerTitle:'Set your Currency',
                }}
            />
            <SettingsStack.Screen
                name="Subscriptions"
                component={Subscriptions}
            />
            <SettingsStack.Screen
                name="Budget"
                component={MonthlyBudget}
            />
            <SettingsStack.Screen
                name="CreateAccount"
                component={CreateAcount}
            />
        </SettingsStack.Navigator>
    );
}
