import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';




export async function requestNotificationPermission() {
  let granted = false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  
  if (status === 'granted') {
    
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    granted = true;
  } else if (status === 'denied') {
    Alert.alert(
      'Permission Required',
      'Notification permissions are required to receive alerts and updates. Please enable them in settings.',
    );
  } else {
    Alert.alert(
      'Permission Request',
      'Notifications may not work as expected without proper permissions.',
    );
  }

  return granted;
}
