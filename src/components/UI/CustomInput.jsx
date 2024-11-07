import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function CustomInput({ 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType = 'default', 
  secureTextEntry = false, 
  style,
  autoCorrect = false,
  maxLength

}) {
    const {colors} = useTheme()
  return (
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        
        spellCheck={false}
        blurOnSubmit={true}
        placeholderTextColor={colors.subtext}
        maxLength={maxLength}
        style={[styles.input,{color:colors.text,backgroundColor:colors.surface,borderColor:colors.background,placeholderTextColor:colors.text}, style]} 
      />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    marginVertical: 5,
  },
  input: {
    width: '100%',
    fontSize:17,
    fontWeight:'500',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
