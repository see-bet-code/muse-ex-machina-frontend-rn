import { Magic } from '@magic-sdk/react-native';
// import { OAuthExtension } from '@magic-ext/oauth';
import {useCallback} from 'react'

const magic = new Magic(process.env.REACT_APP_MAGIC_KEY);

export const onCheck = async (cb) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    return cb({ isLoggedIn: true, email: user.email });
  }
  return cb({ isLoggedIn: false });
};

// Check if we are logged in and fetch the user info
const onCheck = useCallback(async () => {
  // setLoading(true);
  try {
    if (await magic.user.isLoggedIn()) {
      setUser(await magic.user.getMetadata());
    }
  } finally {
    setLoading(false);
  }
}, []);

export const loginUser = async (email) => {
  await magic.auth.loginWithMagicLink({ email });
};

export const logoutUser = async () => {
  await magic.user.logout();
};



// Login with a Magic link and dismiss keyboard
const onLogin = React.useCallback(async () => {
  Keyboard.dismiss();
  setLoading(true);
  try {
    await magic.auth.loginWithMagicLink({ email });
    setUser(await magic.user.getMetadata());
  } finally {
    setLoading(false);
  }
}, [email]);

// Log out and restore the initial state to show the login form
const onLogout = React.useCallback(async () => {
  setLoading(true);
  try {
    await magic.user.logout();
    setUser(null);
    setEmail('');
  } finally {
    setLoading(false);
  }
}, []);