import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from 'react-native-paper';
import AddTransaction from '../screens/AddTransaction';
import Analytics from '../screens/Analytics';
import { TouchableOpacity } from 'react-native';
import SettingsStackNavigation from './SettingsNavigation';
import { lightVibration } from '../utils/vibrationPaterns';
import DoneAnimation from '../components/UI/DoneAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { selectDoneAnimation } from '../redux/selectors/ui';
import { toggleDoneAnumation } from '../redux/uiNoRealmReducer';
import { isTablet } from '../utils/deviceHelper';

const tablet = isTablet()
const BottomTabs = createBottomTabNavigator();

const AddTransactionButton = ({ focused, ...props }) => {
    const { colors } = useTheme();

    const backgroundColor = focused ? colors.elevation.level5 : colors.accent;
    const iconColor = focused ? colors.accent : colors.text

    return (
        <TouchableOpacity
            {...props}
            style={{
                position: 'absolute',
                bottom: tablet ? 100 : 70,
                left: '90%',
                transform: [{ translateX: -25 }],
                width: tablet ? 70 : 50,
                height: tablet ? 70 : 50,
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
            <AntDesign name="plus" size={tablet ? 50 : 40} color={iconColor} />
        </TouchableOpacity>
    );
};

const BottomTabsNavigation = () => {
    const { colors } = useTheme();
    const showAnimation = useSelector(selectDoneAnimation)
    const dispatch = useDispatch()

    const handleAnimation = () => {
        dispatch(toggleDoneAnumation())
    }

    const tabBarActiveBackgroundColor = colors.text === '#000000' ? colors.subtext : undefined;

    const renderTabBarIcon = (route, color, size) => {
        const iconSize = tablet ? 35 : size;
        const customWidth = tablet ? 40 : size;
        const customHeight = tablet ? 40 : size;

        switch (route.name) {
            case 'HomeScreen':
                return <AntDesign name="home" size={iconSize} color={color} style={{ width: customWidth, height: customHeight }} />;
            case 'Analytics':
                return <MaterialCommunityIcons name="google-analytics" size={iconSize} color={color} style={{ width: customWidth, height: customHeight }} />;
            case 'SettingsStack':
                return <AntDesign name="setting" size={iconSize} color={color} style={{ width: customWidth, height: customHeight }} />;
            default:
                return null;
        }
    };


    return (
        <>
            <BottomTabs.Navigator
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        backgroundColor: colors.background,
                        height: tablet ? 95 : 80,
                    },
                    headerShown: false,
                    tabBarActiveTintColor: colors.accent,
                    tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
                    tabBarItemStyle: { borderRadius: 200 },
                    tabBarLabelStyle: {
                        marginLeft: tablet ? 30 : 0,
                        fontSize: tablet ? 18 : 12,
                    },
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={(e) => {
                                lightVibration();
                                props.onPress(e);
                            }}
                        />
                    ),
                    tabBarIcon: ({ color, size }) => {
                        const iconSize = tablet ? 35 : size;
                        return renderTabBarIcon(route, color, iconSize);
                    },
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
            <DoneAnimation visible={showAnimation} onFinish={handleAnimation} />
        </>
    );
};

export default BottomTabsNavigation;
