import { Pressable, StyleSheet, View } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import { Divider, Switch, useTheme } from 'react-native-paper';
import CustomText from './UI/CustomText';

export default function SettingsItem({ onPress, icon, text, isSwitchOn, onToggleSwitch,accessibilityLabel }) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.pressable} accessibilityLabel={accessibilityLabel}>
      <View style={styles.content}>
        <View style={styles.pressableContent}>
          <Ionicons name={icon} size={30} color={colors.text} style={styles.icon} testID="settings-icon"/>
          <CustomText style={styles.pressableText}>{text}</CustomText>
        </View>
        {onToggleSwitch && (
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={colors.success} />
        )}
      </View>
      <Divider style={[styles.divider, { backgroundColor: colors.subtext }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressableContent: {
    flexDirection: 'row',
  },
  icon: {
    padding: 5,
  },
  pressableText: {
    fontSize: 20,
    padding: 5,
  },
  divider: {
    marginTop: 10,
  },
});
