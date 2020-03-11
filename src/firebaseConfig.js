import Firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfSnABWssrA6Wloq7gLVDGWQKLF8gnaCs",
  authDomain: "game-questions.firebaseapp.com",
  databaseURL: "https://game-questions.firebaseio.com",
  projectId: "game-questions",
  storageBucket: "game-questions.appspot.com",
  messagingSenderId: "127686454868",
  appId: "1:127686454868:web:bacb8c51729e50c71a87c1"
};

Firebase.initializeApp(firebaseConfig);

export default Firebase;
