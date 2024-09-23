import { createStackNavigator } from "@react-navigation/stack";

import Start from "../screens/Start/Start";
import Login from "../screens/Start/Login";
import Salary from "../screens/Start/Salary";
import SelectCurrency from "../screens/Start/SelectCurrency";

const Stack = createStackNavigator();

export default function StartStack() {

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Start"
                component={Start}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="StartCurrency"
                component={SelectCurrency}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="Salary"
                component={Salary}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
}
