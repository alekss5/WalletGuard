import uiReducer from '../uiReducer';
 import { toggleTheme } from '../uiReducer'; 
jest.mock('../../realm/realmInstance', () => ({
  fetchUIStateFromRealm: jest.fn(() => Promise.resolve(null)),
}));

describe('UI Reducer', () => {
  it('should toggle theme to dark', () => {
    const initialState = { isDarkTheme: false };
    const action = toggleTheme('dark'); 
    const newState = uiReducer(initialState, action);

    expect(newState.isDarkTheme).toBe(true); 
  });

  it('should toggle theme to light', () => {
    const initialState = { isDarkTheme: true };
    const action = toggleTheme('light'); 
    const newState = uiReducer(initialState, action);

    expect(newState.isDarkTheme).toBe(false); 
  });

});
