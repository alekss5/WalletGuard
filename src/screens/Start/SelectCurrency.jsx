import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import currencyCodes from 'currency-codes';
import LottieView from "lottie-react-native";

import money from '../../../assets/animations/money.json';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../../redux/budgetReducer';
import CustomText from '../../components/UI/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubmitButton from '../../components/UI/SubmitButton';
import CustomInput from '../../components/UI/CustomInput';
import CustomDivider from '../../components/UI/CustomDivider';

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
        else{
            alert("Please select your currency.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LottieView
                source={money}
                autoPlay
                loop={true}
                style={styles.animation}
                speed={0.5}
            />
            <CustomText style={styles.mainText}>Choose your currency</CustomText>
            <CustomInput
                placeholder='Search'
                value={searchQuery}
                style={styles.searchbar}
                onChangeText={onChangeSearch}
            />
            <FlatList
                style={{ backgroundColor: 'transparent' }}  // FlatList background
                contentContainerStyle={{ backgroundColor: 'transparent' }}  // Content inside 
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
            <CustomDivider/>
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
    animation: {
        position: 'absolute',
        width: "100%",
        height: "80%",
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
    submitButton: {
        alignSelf: 'center',
        width: '90%',
        marginBottom: 50,
    }, mainText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "600",
    },
});

export default SelectCurrency;
