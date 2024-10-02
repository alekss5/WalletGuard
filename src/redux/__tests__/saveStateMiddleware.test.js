import { store } from "../store";
import { saveUIStateToRealm, saveBudgetDataToRealm, savePersonalInfoToRealm } from '../../realm/realmInstance';

jest.mock('redux-persist', () => ({
  ...jest.requireActual('redux-persist'),
  persistStore: jest.fn(() => ({
    purge: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  })),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve(null)), 
    setItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve(null)),
  }));


jest.mock('../../realm/realmInstance', () => ({
  saveUIStateToRealm: jest.fn(),
  saveBudgetDataToRealm: jest.fn(),
  savePersonalInfoToRealm: jest.fn(),
}));

describe('Redux Store', () => {

  it('should initialize the store with the correct reducers', () => {
    const state = store.getState();
    expect(state).toHaveProperty('ui');
    expect(state).toHaveProperty('budget');
    expect(state).toHaveProperty('personalInfo');
  });

  it('should persist state on UI-related actions', () => {
    store.dispatch({ type: 'ui/someAction', payload: {} });

    const state = store.getState();
    expect(saveUIStateToRealm).toHaveBeenCalledWith(state.ui);
  });

  it('should persist state on budget-related actions', () => {
    store.dispatch({ type: 'budget/someAction', payload: {} });

    const state = store.getState();
    expect(saveBudgetDataToRealm).toHaveBeenCalledWith(state.budget);
  });

  it('should persist state on personalInfo-related actions', () => {
    store.dispatch({ type: 'personalInfo/someAction', payload: {} });

    const state = store.getState();
    expect(savePersonalInfoToRealm).toHaveBeenCalledWith(state.personalInfo);
  });

});
