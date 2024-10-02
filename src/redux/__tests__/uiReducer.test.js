import uiReducer from '../uiReducer';
 import { toggleTheme } from '../uiReducer'; // Assuming you have action creators
jest.mock('../../realm/realmInstance', () => ({
  fetchUIStateFromRealm: jest.fn(() => Promise.resolve(null)),
}));

describe('UI Reducer', () => {
  it('should toggle theme to dark', () => {
    const initialState = { isDarkTheme: false };
    const action = toggleTheme('dark'); // Passing 'dark' as the payload
    const newState = uiReducer(initialState, action);

    expect(newState.isDarkTheme).toBe(true); // Theme should toggle to dark
  });

  it('should toggle theme to light', () => {
    const initialState = { isDarkTheme: true };
    const action = toggleTheme('light'); // Passing 'light' as the payload
    const newState = uiReducer(initialState, action);

    expect(newState.isDarkTheme).toBe(false); // Theme should toggle to light
  });

});
