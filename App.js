/*!

 =========================================================
 * Material Kit React Native - v1.4.0
 =========================================================
 * Product Page: https://demos.creative-tim.com/material-kit-react-native/
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import { Images, products, materialTheme } from './src/constants';

import { NavigationContainer } from '@react-navigation/native';
import Screens from './src/navigation/Screens';

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

// cache product images
products.map(product => assetImages.push(product.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: true,
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Ionicons: require('./node_modules/react-native-vector-icons/Fonts/Ionicons.ttf'),
      FontAwesome: require('./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      Entypo: require('./node_modules/react-native-vector-icons/Fonts/Entypo.ttf'),
      EvilIcons: require('./node_modules/react-native-vector-icons/Fonts/EvilIcons.ttf'),
      Feather: require('./node_modules/react-native-vector-icons/Fonts/Feather.ttf'),
      "Material Icons": require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
  });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}


// import React, { useState, useEffect } from 'react';
// import {
//   Switch,
//   BrowserRouter as Router,
//   Route,
//   Redirect,
// } from 'react-router-dom';
// import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
// import { UserContext } from './context/UserContext';
// import { checkUser } from './apis/magic';
// import Authenticate from './components/Authenticate';
// import Dashboard from './components/Dashboard';
// import PrivateRoute from './components/PrivateRoute';


// export default function App() {
//   const [loading, setLoading] = React.useState(false);
//   const [user, setUser] = React.useState(null);
//   const [email, setEmail] = React.useState('');

//   // Check if we are logged in and fetch the user info
//   const onCheck = React.useCallback(async () => {
//     // setLoading(true);
//     try {
//       if (await magic.user.isLoggedIn()) {
//         setUser(await magic.user.getMetadata());
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Login with a Magic link and dismiss keyboard
//   const onLogin = React.useCallback(async () => {
//     Keyboard.dismiss();
//     setLoading(true);
//     try {
//       await magic.auth.loginWithMagicLink({ email });
//       setUser(await magic.user.getMetadata());
//     } finally {
//       setLoading(false);
//     }
//   }, [email]);

//   // Log out and restore the initial state to show the login form
//   const onLogout = React.useCallback(async () => {
//     setLoading(true);
//     try {
//       await magic.user.logout();
//       setUser(null);
//       setEmail('');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // When the app loads, check if we have an existing session
//   React.useEffect(() => {
//     onCheck();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         {user && (
//           // User is authenticated, show user info
//           <>
//             <Text style={styles.paragraph}>Hi {user.email}!</Text>
//             <Text style={styles.code}>{JSON.stringify(user, null, 2)}</Text>
//             <Button disabled={loading} title={loading ? 'loading...' : 'logout'} onPress={onLogout} />
//           </>
//         )}
//         {!user && (
//           // User is not authenticated, show login form
//           <>
//             <Text style={styles.paragraph}>Enter your email to authenticate</Text>
//             <TextInput style={styles.input} value={email} onChangeText={setEmail} textContentType="emailAddress" />
//             <Button disabled={loading} title={loading ? 'loading...' : 'login'} onPress={onLogin} />
//           </>
//         )}
//       </View>
//       {/* This is required for the overlay to render */}
//       <magic.Relayer />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ecf0f1',
//   },
//   content: {
//     padding: 8,
//     maxWidth: 800,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   code: {
//     margin: 16,
//   },
//   input: {
//     marginVertical: 16,
//     padding: 12,
//     backgroundColor: '#e5e5e5',
//   },
// });

// import Spinner from 'react-bootstrap/Spinner';

// const App = () => {
//   const [user, setUser] = useState({ isLoggedIn: null, email: '' });
//   const [loading, setLoading] = useState();
//   useEffect(() => {
//     const validateUser = async () => {
//       setLoading(true);
//       try {
//         await checkUser(setUser);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     validateUser();
//   }, [user.isLoggedIn]);
//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: '100vh' }}
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }
//   return (
//     <UserContext.Provider value={user}>
//       <Router>
//         {user.isLoggedIn && <Redirect to={{ pathname: '/dashboard' }} />}
//         <Switch>
//           <Route exact path="/" component={Authenticate} />
//           <PrivateRoute path="/dashboard" component={Dashboard} />
//         </Switch>
//       </Router>
//     </UserContext.Provider>
//   );
// };
// export default App;