import * as Haptics from "expo-haptics";

export const hardVibration = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

export const lightVibration = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};
export const mediumVibration = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const successVibration = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};
export const warningVibration = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};
export const errorVibration = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};
