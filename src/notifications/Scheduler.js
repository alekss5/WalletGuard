import * as Notifications from 'expo-notifications';

export const scheduleDailyNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "Did you entered your expenses for the day?",
      sound:'notification_sound.mp3',
    },
    trigger: {
      hour: 19,
      minute: 0,
      repeats: true,
    },
  });
};

export const scheduleDailyBudgetNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You are Over Budget",
      body: "You've exceeded your daily budget. Review your spending to get back on track.",
      sound:'notification_sound.mp3',
    },
    trigger: {
      hour: 13,
      minute: 0,
      repeats: true,
    },
  });
};

export const scheduleMultipleWeeklyNotifications = async () => {
  const days = [
    { name: 'Sunday', weekday: 1 },
    { name: 'Monday', weekday: 2 },
    { name: 'Wednesday', weekday: 4 },
    { name: 'Friday', weekday: 6 },
  ];

  for (const day of days) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Are you ready for the day?",
        body: `Check out how much you have left to spend.`,
        sound:'notification_sound.mp3',
      },
      trigger: {
        hour: 10,     
        minute: 0,   
        weekday: day.weekday,
        repeats: true,
      },
    });
  }

  // const notifications = await Notifications.getAllScheduledNotificationsAsync();
  // console.log('Scheduled notifications:', notifications);
};



export const clearNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
