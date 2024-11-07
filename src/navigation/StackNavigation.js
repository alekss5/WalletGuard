import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigation from "./BottomTabsNavigation";
import Expenses from "../screens/Expenses";
import { useTheme } from 'react-native-paper';
import Upgrade from "../screens/Upgrade";
import ExpenseTypes from "../screens/ExpenseTypes";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { lightVibration } from "../utils/vibrationPaterns";
import StartStack from "./StartStack";
import CommingSoon from "../screens/CommingSoon";

const Stack = createStackNavigator();

export default function StackNavigation({ isUser }) {
    const { colors } = useTheme();
    const headerTintColor = colors.text === '#000000' ? colors.text : colors.accent;

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ navigation }) => ({
                    headerTintColor: headerTintColor,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                lightVibration()
                                navigation.goBack();
                            }}
                            style={{ marginLeft: 15 }}
                        >
                            <AntDesign name="arrowleft" size={24} color={colors.text} />
                        </TouchableOpacity>
                    ),
                })}
            >
                {!isUser && (
                    <Stack.Screen
                        name="StartStack"
                        component={StartStack}
                        options={{
                            headerShown: false,
                            gestureEnabled: false,
                        }}
                    />
                )}
                <Stack.Screen
                    name="BottomTabs"
                    component={BottomTabsNavigation}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />

                <Stack.Screen
                    name="Expenses"
                    component={Expenses}
                    options={{
                        headerTitle: 'All expenses',
                        headerBackTitle: 'Expenses',
                    }}
                />

                <Stack.Screen
                    name="ExpenseTypes"
                    component={ExpenseTypes}
                    options={{
                        title: 'Select expense type',
                        headerBackTitle: 'Back',
                    }}
                />
                <Stack.Screen
                    name="CommingSoon"
                    component={CommingSoon}
                    options={{
                        headerShown: false,
                        headerBackTitle: 'Back',
                    }}
                />
                <Stack.Screen
                    name="Upgrade"
                    component={Upgrade}
                    options={{
                        headerShown: false,
                        headerBackTitle: 'Home',
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
}
