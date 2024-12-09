import { useState, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import currencyCodes from 'currency-codes';

import getSymbolFromCurrency from 'currency-symbol-map';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../../redux/budgetReducer';
import CustomText from '../../components/UI/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubmitButton from '../../components/UI/SubmitButton';
import CustomInput from '../../components/UI/CustomInput';
import CustomDivider from '../../components/UI/CustomDivider';
import MoneyAnimation from '../../components/MoneyAnimation';
import { isTablet } from '../../utils/deviceHelper';

const tablet = isTablet()
const SelectCurrency = ({ navigation }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [localSelectedCurrency, setLocalSelectedCurrency] = useState('');

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
        setLocalSelectedCurrency(item.code);
    }, []);

    const handleContinue = () => {

        if (localSelectedCurrency) {
            const currencySymbol = getSymbolFromCurrency(localSelectedCurrency);
            if (currencySymbol) {
                dispatch(setCurrency(currencySymbol));
                navigation.navigate('Salary');
            }
        }
        else {
            Alert.alert("Please select your currency.");

        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MoneyAnimation />
            <CustomText style={styles.mainText}>Choose your currency</CustomText>
            <CustomInput
                placeholder='Search'
                value={searchQuery}
                style={styles.searchbar}
                onChangeText={onChangeSearch}
            />
            <FlatList
                style={{ backgroundColor: 'transparent',marginLeft:'2%'}}  
                contentContainerStyle={{ backgroundColor: 'transparent' }}
                data={filteredCurrencies}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => {
                    const itemBackgroundColor = item.code === localSelectedCurrency ? colors.accent : colors.background;
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
            <CustomDivider />
            <SubmitButton
                onPress={handleContinue}
                style={styles.submitButton}
            >
                Continue
            </SubmitButton>

        </SafeAreaView>
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
        fontSize: tablet ? 25 : 16,
    },
    submitButton: {
        alignSelf: 'center',
        width: '90%',
        maxWidth:500,
        marginBottom: 50,
    }, mainText: {
        marginTop: tablet?50:0,
        marginBottom: tablet ? 30 : 20,
        textAlign: "center",
        fontSize: tablet ? 40 : 30,
        fontWeight: "600",
    },
});

export default SelectCurrency;
