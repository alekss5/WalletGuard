import * as Notifications from 'expo-notifications';
import { requestNotificationPermission } from '../Service';
import {
    scheduleDailyNotification, scheduleDailyBudgetNotification,
    scheduleMultipleWeeklyNotifications,
    scheduleMonthlyRefreshNotification,
    clearNotifications,
} from '../Scheduler';
jest.mock('expo-notifications');
import { Alert } from 'react-native';
describe('Notification Functions', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
      });

    it('schedules a daily notification', async () => {
        await scheduleDailyNotification();

        expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
            content: {
                title: "Daily Reminder",
                body: "Did you entered your expenses for the day?",
            },
            trigger: {
                hour: 19,
                minute: 0,
                repeats: true,
            },
        });
    });

    it('schedules a daily budget notification', async () => {
        await scheduleDailyBudgetNotification();

        expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
            content: {
                title: "You are Over Budget",
                body: "You've exceeded your daily budget. Review your spending to get back on track.",
            },
            trigger: {
                hour: 13,
                minute: 0,
                repeats: true,
            },
        });
    });

    it('schedules multiple weekly notifications', async () => {
        await scheduleMultipleWeeklyNotifications();

        const days = [
            { name: 'Sunday', weekday: 1 },
            { name: 'Monday', weekday: 2 },
            { name: 'Wednesday', weekday: 4 },
            { name: 'Friday', weekday: 6 },
        ];

        for (const day of days) {
            expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
                content: {
                    title: "Are you ready for the day?",
                    body: `Check out how much you have left to spend.`,
                },
                trigger: {
                    hour: 10,
                    minute: 0,
                    weekday: day.weekday,
                    repeats: true,
                },
            });
        }
    });

    it('schedules a monthly refresh notification', async () => {
        const dayOfMonth = 1; // Example day
        await scheduleMonthlyRefreshNotification(dayOfMonth);

        expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
            content: {
                title: "Monthly Budget",
                body: "Your budget has been refreshed! Check how much you have to spend.",
            },
            trigger: {
                day: dayOfMonth,
                hour: 8,
                minute: 0,
                repeats: true,
            },
        });
    });

    it('clears all scheduled notifications', async () => {
        await clearNotifications();

        expect(Notifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
    });

    it('requests notification permissions', async () => {
        Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });

        const result = await requestNotificationPermission();

        expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
        expect(result).toBe(true);
        expect(Notifications.setNotificationHandler).toHaveBeenCalled();
    });

    it('handles denied permission when requesting notification permissions', async () => {
        Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const result = await requestNotificationPermission();
        
        expect(alertSpy).toHaveBeenCalledWith(
          'Permission Required',
          'Notification permissions are required to receive alerts and updates. Please enable them in settings.'
        );
        expect(result).toBe(false);
      });
    
      it('handles undetermined permission when requesting notification permissions', async () => {
        Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'undetermined' });
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const result = await requestNotificationPermission();
        
        expect(alertSpy).toHaveBeenCalledWith(
          'Permission Request',
          'Notifications may not work as expected without proper permissions.'
        );
        expect(result).toBe(false);
      });
});
