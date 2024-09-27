import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from 'react-native-paper';
import ExpenseItem from '../components/ExpenseItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../redux/budgetReducer';
import CustomDivider from '../components/UI/CustomDivider';
import BackgroundColorContainer from '../components/UI/BackgroundColorContainer';
import MonthYearPicker from '../components/UI/MonthYearPicker';
import { selectBudgetData, selectExpensesArray } from '../redux/selectors/budget';


export default function Expenses() {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const expensesArray = useSelector(selectExpensesArray);
    const { total,currency } = useSelector(selectBudgetData);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [isPickerVisible, setPickerVisible] = useState(false);

    const firstDayOfMonth = new Date(currentYear, selectedMonth, 1);
    const lastDayOfMonth = new Date(currentYear, selectedMonth + 1, 0);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const handleDeleteExpense = (item) => {
        Alert.alert(
            "Are you sure",
            `Do you want to delete this expense of ${item.amount} ${currency} for ${item.category.description}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => dispatch(deleteExpense(item)),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };
    const filterAndSortExpenses = (expenses) => {
        return expenses
            .filter(expense => {
                const expenseDate = new Date(expense.date); 
                const expenseMonth = expenseDate.getMonth(); 
                const expenseYear = expenseDate.getFullYear(); 
    
                const expenseMonthInt = parseInt(expenseMonth, 10); 
                const selectedMonthInt = parseInt(selectedMonth, 10); 
                return (
                    expenseMonthInt === selectedMonthInt && 
                    expenseYear === currentYear
                );
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date)); 
    };

    const filteredExpenses = filterAndSortExpenses(expensesArray);
    const getTotalForMonth = (filteredExpenses) => {
        return filteredExpenses.reduce((sum, expense) => {
            return sum + parseFloat(expense.amount);
        }, 0);
    };

    const totalForMonth = getTotalForMonth(filteredExpenses);
    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        setPickerVisible(false);
    };

    return (
        <BackgroundColorContainer>
            <SafeAreaView style={styles.container}>
                
                {/* Button to show the picker */}
                <TouchableOpacity onPress={() => setPickerVisible(!isPickerVisible)}>
                    <View style={styles.centerWrapper}>
                        <View style={[styles.icon, { backgroundColor: total > 0 ? colors.success : colors.error }]}>
                            {total > 0 ? (
                                <FontAwesome6 name="arrow-trend-up" size={45} color="#fff" />
                            ) : (
                                <FontAwesome6 name="arrow-trend-down" size={45} color="#fff" />
                            )}
                        </View>
                        <Text style={[styles.date, { color: colors.subtext }]}>
                            {formatDate(firstDayOfMonth)} - {formatDate(lastDayOfMonth)}
                        </Text>
                        <View style={styles.amountContainer}>
                            <Text style={[styles.amount, { letterSpacing: 3, color: colors.text }]}>{currency}</Text>
                            <Text style={[styles.amount, { letterSpacing: 2, color: colors.text }]}>{totalForMonth}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>

                {/* Conditionally render the picker */}
                {isPickerVisible && (
                    <MonthYearPicker
                        selectedMonth={selectedMonth}
                        setSelectedMonth={handleMonthSelect}
                    />
                )}

                <CustomDivider/>

                {filteredExpenses.length > 0 ? (
                    <FlatList
                        data={filteredExpenses}
                        renderItem={({ item }) => (
                            <ExpenseItem
                                date={item.date.replace(/^\d{4}-/, "")}
                                title={item.category}
                                amount={item.amount.toString()}
                                currency={currency || ''}
                                onDelete={() => handleDeleteExpense(item)}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                ) : (
                    <Text style={[styles.noExpensesText, { color: colors.subtext }]}>
                        No expenses recorded
                    </Text>
                )}
            </SafeAreaView>
        </BackgroundColorContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: 70,
        height: 60,
    },
    centerWrapper: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        fontSize: 18,
        marginVertical: 10,
    },
    amountContainer: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    amount: {
        fontSize: 25,
        fontWeight: '600',
    },
    listContainer: {
      
        paddingTop: 10,
    },
    noExpensesText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});
