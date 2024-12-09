import { Dimensions } from 'react-native';

export const isTablet = () => {
    const { width } = Dimensions.get('window');
    return width > 768;
};
