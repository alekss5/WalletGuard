import { Pressable, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {  toggleTheme } from '../../redux/uiReducer'
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer'
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Divider } from 'react-native-paper'
import CustomText from '../../components/UI/CustomText'
import { lightVibration } from '../../utils/vibrationPaterns'
import { selectTheme } from '../../redux/selectors/ui';

export default function Theme() {
  const dispatch = useDispatch()
  const { colors } = useTheme();
  const theme = useSelector(selectTheme)

  const setLightTheme = () => {
    lightVibration()
    dispatch(toggleTheme('light'));
  }

  const setDarkTheme = () => {
    lightVibration()
    dispatch(toggleTheme('dark'))
  }

  return (
    <BackgroundColorContainer>

      <Pressable onPress={setLightTheme} style={styles.pressable}>
        <CustomText style={[styles.text, { color: colors.text }]}>LIGHT</CustomText>
        {theme === false && (
          <Ionicons name="checkmark-sharp" size={30} color={colors.text} />
        )}
      </Pressable>
      <Divider style={[styles.divider, { backgroundColor: colors.subtext }]} />

      <Pressable onPress={setDarkTheme} style={styles.pressable}>
        <CustomText style={[styles.text, { color: colors.text }]}>DARK</CustomText>
        {theme === true && (
          <Ionicons name="checkmark-sharp" size={30} color={colors.text} />
        )}
      </Pressable>
      <Divider style={[styles.divider, { backgroundColor: colors.subtext }]} />
    </BackgroundColorContainer>
  )
}

const styles = StyleSheet.create({
  pressable: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    fontSize: 20,
  },
  divider: {
    height: 1,
  
  },

})