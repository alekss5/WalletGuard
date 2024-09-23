import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from 'react-native-paper';
import AddTransaction from '../screens/AddTransaction';
import Analytics from '../screens/Analytics';
import { TouchableOpacity } from 'react-native';
import SettingsStackNavigation from './SettingsNavigation';
import { lightVibration } from '../utils/vibrationPaterns';

const BottomTabs = createBottomTabNavigator();


const AddTransactionButton = ({ focused, ...props }) => {
    const { colors } = useTheme();

    const backgroundColor = focused ? colors.elevation.level5 : colors.accent; 
    const iconColor = focused ?  colors.accent :colors.text 

    return (
        <TouchableOpacity
            {...props}
            style={{
                position: 'absolute',
                bottom: 70,
                left: '90%',
                transform: [{ translateX: -25 }],
                width: 50,
                height: 50,
                backgroundColor,  
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
            }}
            onPress={(e) => {
                lightVibration();
                props.onPress(e);
            }}
        >
            <AntDesign name="plus" size={40} color={iconColor} />
        </TouchableOpacity>
    );
};


const BottomTabsNavigation = () => {
    const { colors } = useTheme();

    const tabBarActiveBackgroundColor = colors.text === '#000000' ? colors.subtext : undefined;

    const renderTabBarIcon = (route, color, size) => {
        switch (route.name) {
            case 'HomeScreen':
                return <AntDesign name="home" size={30} color={color} />;
            case 'Analytics':
                return <MaterialCommunityIcons name="google-analytics" size={size} color={color} />;
            case 'SettingsStack':
                return <AntDesign name="setting" size={size} color={color} />;
            default:
                return null;
        }
    };

    return (
        <BottomTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: colors.background },
                headerShown: false,
                tabBarActiveTintColor: colors.accent,
                tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
                tabBarItemStyle: { borderRadius: 200 },
                tabBarButton: (props) => (
                    <TouchableOpacity
                        {...props}
                        onPress={(e) => {
                            lightVibration();
                            props.onPress(e);
                        }}
                    />
                ),
                tabBarIcon: ({ color, size }) => renderTabBarIcon(route, color, size),
            })}
        >
            <BottomTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <BottomTabs.Screen
                name="Analytics"
                component={Analytics}
                options={{ tabBarLabel: 'Analytics' }}
            />
            <BottomTabs.Screen
                name="SettingsStack"
                component={SettingsStackNavigation}
                options={{ tabBarLabel: 'Settings' }}
            />
            <BottomTabs.Screen
                name="AddTransaction"
                component={AddTransaction}
                options={{
                    tabBarLabel: '',
                    tabBarActiveTintColor: colors.text,
                    tabBarButton: (props) => <AddTransactionButton {...props} focused={props.accessibilityState.selected} />,
                }}
            />
        </BottomTabs.Navigator>
    );
};

export default BottomTabsNavigation;
