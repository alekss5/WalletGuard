class ImageSource {
  static sources = {
    Cash: () => require('../../assets/icons/cash.png'),
    FastFood: () => require('../../assets/icons/fast-food.png'),
    Gas: () => require('../../assets/icons/gas.png'),
    Gift: () => require('../../assets/icons/gift.png'),
    Shopping: () => require('../../assets/icons/shopping.png'),
    Cigarettes: () => require('../../assets/icons/cigarettes.png'),

    Taxes: () => require('../../assets/icons/taxes.png'),
    Rent: () => require('../../assets/icons/mortage.png'),
    Electricity: () => require('../../assets/icons/electricity.png'),
    Insurance: () => require('../../assets/icons/insurance.png'),
    PhoneBill: () => require('../../assets/icons/phoneBill.png'),
    WaterBill: () => require('../../assets/icons/waterBill.png'),
    InternetBill: () => require('../../assets/icons/internetBill.png'),

    Food: () => require('../../assets/icons/food.png'),
    Gym: () => require('../../assets/icons/gym.png'),
    Medical: () => require('../../assets/icons/medical.png'),
    Parking: () => require('../../assets/icons/parking.png'),
    PublicTransport: () => require('../../assets/icons/public-transport.png'),
    Groceries: () => require('../../assets/icons/groceries.png'),
    Travel: () => require('../../assets/icons/travel.png'),
    Cigarettes: () => require('../../assets/icons/cigarettes.png'),
    Entertainment: () => require('../../assets/icons/entertainment.png'),
    Education: () => require('../../assets/icons/education.png'),
    Subscriptions: () => require('../../assets/icons/subscriptions.png'),
    Investment: () => require('../../assets/icons/investment.png'),

    
  };

  static getImageSource(text) {
    if (!ImageSource.sources[text]) {
      // console.error(`No image source found for: ${text}`);
      return null;
    }
    return ImageSource.sources[text]();
  }
  
}

export default ImageSource;
