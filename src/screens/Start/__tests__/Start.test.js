import Start from "../Start";
import { Provider as PaperProvider } from 'react-native-paper';
import { lightTheme } from '../../../themes/lightTheme';
import { render,fireEvent } from "@testing-library/react-native";

describe('Start component', () => { 
    const mockNavigate  = jest.fn();

    beforeEach(() => {
        mockNavigate.mockClear();
    });

    const setup = () => 
        render(
            <PaperProvider theme={lightTheme}>
                <Start navigation={{ navigate: mockNavigate }} />
            </PaperProvider>
        );

    it('renders header correctly', () => {
        const {getByText} = setup()
        expect(getByText('Welcome to WalletGuard')).toBeTruthy();
        
    });
    it('renders text correctly', () => {
        const {getByText} = setup()
        expect(getByText('Track Every Dollar, Every Day')).toBeTruthy();
        
    });
    it('navigates correctly', () => {
        const {getByText} = setup()
        fireEvent.press(getByText('Continue'));     
        expect(mockNavigate).toHaveBeenCalledWith('Login');
    });
 })