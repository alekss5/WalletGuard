// __mocks__/@react-native-async-storage/async-storage.js
const mockAsyncStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    // Add other methods as needed
  };
  
  export default mockAsyncStorage;
  