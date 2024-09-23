import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import currencyCodes from 'currency-codes';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency, setCurrency } from '../../redux/budgetReducer';
import BackgroundColorContainer from '../../components/UI/BackgroundColorContainer';
import CustomText from '../../components/UI/CustomText';
import CustomInput from '../../components/UI/CustomInput';

const CurrencyList = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const selectedCurrency = useSelector(selectCurrency);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return currencyCodes.data;
    return currencyCodes.data.filter(currency =>
      currency.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.countries.some(country => country.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const onChangeSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handlePress = useCallback((item) => {
    const symbol = getSymbolFromCurrency(item.code);
 
    dispatch(setCurrency(symbol));
    navigation.goBack();
  }, [dispatch, navigation]);

  return (
    <BackgroundColorContainer>
      <CustomInput
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          const itemBackgroundColor = getSymbolFromCurrency(item.code) === selectedCurrency ? colors.accent : colors.background;
          return (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={[styles.item, { backgroundColor: itemBackgroundColor }]}>
                <CustomText style={styles.text}>
                  {item.code} - {item.currency} ({getSymbolFromCurrency(item.code)}) - {item.countries.join(', ')}
                </CustomText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </BackgroundColorContainer>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    marginBottom: 10,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
  },
  item: {
    width: '98%',
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default CurrencyList;
