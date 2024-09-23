class ImageSource {
  static sources = {
    Cash: () => require('../../assets/icons/cash.png'),
    FastFood: () => require('../../assets/icons/fast-food.png'),
    Gas: () => require('../../assets/icons/gas.png'),
    Gift: () => require('../../assets/icons/gift.png'),
    Rent: () => require('../../assets/icons/mortage.png'),
    Shopping: () => require('../../assets/icons/shopping.png'),
    Taxes: () => require('../../assets/icons/taxes.png'),
    Electricity: () => require('../../assets/icons/electricity.png'),

    Food: () => require('../../assets/icons/food.png'),
    Gym: () => require('../../assets/icons/gym.png'),
    Medical: () => require('../../assets/icons/medical.png'),
    Parking: () => require('../../assets/icons/parking.png'),
    PublicTransport: () => require('../../assets/icons/public-transport.png'),
    Groceries: () => require('../../assets/icons/groceries.png'),
    Travel: () => require('../../assets/icons/travel.png'),
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
