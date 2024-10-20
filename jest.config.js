module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'], // If you have a setup file
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@expo/vector-icons|expo-modules-core|@realm|expo-haptics|react-native-chart-kit)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
