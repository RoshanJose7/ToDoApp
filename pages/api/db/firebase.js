import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from './FirebaseConfig';

firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : null;

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = async () => await auth.signInWithPopup(provider);

export default firebase;
