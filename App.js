import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { View } from 'react-native';

import { store, persistor } from "./src/redux/store";
import Head from "./src/Head";

export default function App() {

  // Text.defaultProps.style = { fontFamily: 'roboto' };

  return (
    <View style={{flex:1,backgroundColor:'#666666'}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head />
      </PersistGate>
    </Provider>
    </View>
   
  );
}

