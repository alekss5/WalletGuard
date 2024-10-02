import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import background from '../../assets/m.jpg';
import CustomText from './UI/CustomText';

export default function BalanceCard({ onPress, visibleIncome, total, expense, income, currency, colors }) {
    const totalColor = total < 0 ? colors.error : colors.success;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.3 : 1 }]}
        >
            <View style={[styles.card, { backgroundColor: colors.elevation.level1 }]}>
                <ImageBackground source={background} style={styles.background} imageStyle={styles.imageStyle}>
                    <View style={styles.content}>
                        <View style={styles.inline}>
                            <Text style={[styles.cardTitle, { color: colors.text }]}>Total Balance</Text>
                            <View style={{ backgroundColor: colors.accent, borderRadius: 10 }}>
                                <Entypo name="chevron-right" size={30} color="black" />
                            </View>
                        </View>

                        <View style={styles.totalBalanceContainer}>
                            {!visibleIncome ? (
                                <>
                                    <Text style={[styles.totalBalanceText, { color: totalColor }]}>{total}</Text>
                                    <Text style={[styles.currency, { color: totalColor }]}>{currency}</Text>
                                </>
                            ) : (
                                <CustomText style={styles.totalBalanceText}>Hidden</CustomText>
                            )}
                        </View>

                        <View style={styles.transactionsContainer}>
                            <View style={styles.transaction}>
                                <FontAwesome6 name="arrow-trend-down" size={30} color={colors.error} style={styles.icon} />
                                <View>
                                    <Text style={{ color: colors.subtext }}>EXPENSE</Text>
                                    <Text style={[styles.amount, { color: colors.error }]}>{currency} {expense}</Text>
                                </View>
                            </View>

                            <View style={styles.transaction}>
                                <FontAwesome6 name="arrow-trend-up" size={30} color={colors.success} style={styles.icon} />
                                <View>
                                    <Text style={{ color: colors.subtext }}>INCOME</Text>
                                    {!visibleIncome ? (
                                        <Text style={[styles.amount, { color: colors.success }]}>{currency} {income}</Text>
                                    ) : (
                                        <CustomText style={styles.amount}>Hidden</CustomText>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    background: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageStyle: {
        opacity: 0.3,
        borderRadius: 10,
    },
    card: {
        width: '90%',
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    content: {
        padding: 15,
    },
    inline: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    cardTitle: {
        fontSize: 25,
        fontWeight: '500',
    },
    totalBalanceContainer: {
        flexDirection: 'row',
        paddingVertical: 25,
    },
    totalBalanceText: {
        fontSize: 40,
        marginLeft: 20,
        fontWeight: '600',
    },
    currency: {
        fontSize: 20,
        fontWeight: '600',
    },
    transactionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    transaction: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 15,
    },
    amount: {
        fontSize: 18,
    },
});
