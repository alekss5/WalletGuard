global.__DEV__ = true;
// jest.setup.js

jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');
jest.mock('@expo/vector-icons', () => 'Ionicons');
// Mock other icons if necessary


// Mock the ImageSource utility
