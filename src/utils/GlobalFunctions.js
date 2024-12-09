
import { Audio } from 'expo-av';

const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/sounds/pop.mp3')
  );
  await sound.playAsync();
  sound.unloadAsync(); 
};

export const categoryColors = {
    "Cash": "#4CAF50",
    "Fast Food": "#FF0000",
    "Gas": "#FF5722",
    "Gift": "#FFA500",
    "Rent": "#3F51B5",
    "Shopping": "#9C27B0",
    "Taxes": "#0000FF",
    "Electricity": "#FFC107",
    "Food": "#8BC34A",
    "Gym": "#E91E63",
    "Medical": "#00BCD4",
    "Parking": "#ADD8E6",
    "Public Transport": "#607D8B",
    "Groceries": "#CDDC39",
    "Travel": "#FF9800"
  };
  
  export const isCurrentMonth = (dateString) => {
    const date = new Date(dateString)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  }
  
  export const getWeekNumber = (dateString) => {
    const date = new Date(dateString)
    const startOfYear = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000))
    return Math.ceil((days + startOfYear.getDay() + 1) / 7)
  }

  export const isSubscriptionDue = (subscription, lastLogin) => {
    const now = new Date();
    const currentDay = now.getDate();
    const subscriptionDay = subscription.day;
    const lastLoginDate = new Date(lastLogin);
    const lastLoginDay = lastLoginDate.getDate();
  
    const lastProcessedDate = new Date(subscription.lastProcessedDate || 0);
    const lastProcessedMonth = lastProcessedDate.getMonth();
    const lastProcessedYear = lastProcessedDate.getFullYear();
  
    if (lastProcessedMonth === now.getMonth() && lastProcessedYear === now.getFullYear()) {
      return false; 
    }
  
    if (subscriptionDay >= lastLoginDay && subscriptionDay <= currentDay) {
      return true;
    }
  }
  
  export function isOneMonthPassed(date, startDate) {
    const now = new Date();
    const currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    const lastLogin = new Date(date);

    const currentMonthStart = new Date(currentYear, currentMonth, startDate);

    if (lastLogin <= currentMonthStart) {
      return true;
    }
    return false;
  }
