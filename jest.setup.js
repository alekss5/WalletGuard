global.__DEV__ = true;
// jest.setup.js

jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');
jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('@expo/vector-icons/FontAwesome6', () => 'FontAwesome6');
jest.mock('@expo/vector-icons', () => 'Ionicons');
// Mock other icons if necessary
// jest.setup.js

jest.mock('expo-haptics', () => ({
    impactAsync: jest.fn(),
    ImpactFeedbackStyle: {
      Heavy: 'Heavy',
    },
  }));
  jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

afterEach(() => {
    jest.clearAllTimers(); // Clear pending timers
    jest.clearAllMocks();  // Clear mocks after each test
    jest.useRealTimers();  // Ensure real timers are used
  });
  
// Mock the ImageSource utility
