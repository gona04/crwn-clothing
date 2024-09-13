import React, { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        console.log(auth);
        const result = await getRedirectResult(auth);
        if (result) {
          const { user } = result;
          console.log('Redirect result user:', user);
          await createUserDocumentFromAuth(user);
        } else {
          console.log('No redirect result found');
        }
      } catch (error) {
        console.error('Error handling redirect result', error);
      }
    };

    fetchRedirectResult();
  }, []);

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      console.log('Popup result user:', user);
      await createUserDocumentFromAuth(user);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const logGoogleRedirect = () => {
    const {user} =  signInWithGoogleRedirect();
    console.log('Redirect result user:', user);
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
      <button onClick={logGoogleRedirect}>Sign in with Google Redirect</button>
    </div>
  );
};

export default SignIn;