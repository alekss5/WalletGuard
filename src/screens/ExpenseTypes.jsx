import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import BackgroundColorContainer from '../components/UI/BackgroundColorContainer'
import CustomText from '../components/UI/CustomText'
import ImageSource from '../utils/ImageSources'

const expenseTypes = [
  { id: '16', icon: 'Cash', description: 'Income' },
  { id: '1', icon: 'FastFood', description: 'Fast Food' },
  { id: '2', icon: 'Gift', description: 'Gift' },
  { id: '3', icon: 'Cash', description: 'Cash' },
  { id: '25', icon: 'Cigarettes', description: 'Cigarettes' },
  { id: '4', icon: 'Rent', description: 'Rent' },
  { id: '5', icon: 'Taxes', description: 'Taxes' },
  { id: '6', icon: 'Electricity', description: 'Electricity' },
  { id: '7', icon: 'Gas', description: 'Gas' },
  { id: '8', icon: 'Food', description: 'Food' },
  { id: '9', icon: 'Groceries', description: 'Groceries' },
  { id: '10', icon: 'Gym', description: 'Gym' },
  { id: '11', icon: 'Medical', description: 'Medical' },
  { id: '12', icon: 'Parking', description: 'Parking' },
  { id: '13', icon: 'PublicTransport', description: 'Public Transport' },
  { id: '14', icon: 'Shopping', description: 'Shopping' },
  { id: '15', icon: 'Travel', description: 'Travel' },
  { id: '21', icon: 'Entertainment', description: 'Entertainment' },
  { id: '24', icon: 'Investment', description: 'Investment' },

  //Expens categorie start
  { id: '18', icon: 'PhoneBill', description: 'Phone Bill' },
  { id: '19', icon: 'WaterBill', description: 'Water Bill' },
  { id: '20', icon: 'InternetBill', description: 'Internet Bill' },
  { id: '23', icon: 'Subscriptions', description: 'Subscriptions' },
  { id: '17', icon: 'Insurance', description: 'Insurance' },
  { id: '22', icon: 'Education', description: 'Education' },

];

export default function ExpenseTypes() {
  const navigation = useNavigation()

  const route = useRoute()
  const { back } = route.params;

  const handlePress = (item) => {
    if (back === 'addTransaction') {
      navigation.navigate('AddTransaction', { item })
    }
    else {
      navigation.navigate('Subscriptions', { item })
    }
  }

  return (
    <BackgroundColorContainer>
      <FlatList
        style={{ padding: 10 }}
        data={expenseTypes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <>
            {/* Display the "Income" section */}
            {item.description === 'Income' && <CustomText style={styles.sectionHeader}>Income</CustomText>}

            {/* Display the "Expenses" section */}
            {index === 1 && <CustomText style={styles.sectionHeader}>Expenses</CustomText>}

            {/* Display the "Bills" section */}
            {item.description === 'Phone Bill' && <CustomText style={styles.sectionHeader}>Bills</CustomText>}

            <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
              <Image source={ImageSource.getImageSource(item.icon)} style={styles.icon} />
              <CustomText style={styles.description}>{item.description}</CustomText>
            </TouchableOpacity>
          </>
        )}
      />
    </BackgroundColorContainer>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
  },
  sectionHeader:{
    fontSize:18,
    fontWeight:'500',
    padding:10

  }
  
})
