import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { ref, onUnmounted, computed } from 'vue';


const firebaseConfig = {
  apiKey: "AIzaSyD58FGLi9RhqDr5cYpZBz_15s9wV9Rb2sw",
  authDomain: "webapp-bb4da.firebaseapp.com",
  databaseURL: "https://webapp-bb4da-default-rtdb.firebaseio.com",
  projectId: "webapp-bb4da",
  storageBucket: "webapp-bb4da.appspot.com",
  messagingSenderId: "534574725702",
  appId: "1:534574725702:web:fac3a7d709be082ebf6847"
};

// Starting to initialize my firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export function useAuth() {
  const user = ref(null); 
  const isLogin = computed(() => user.value !== null); 

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });

  // Sign-in function, google auth
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Sign-out function
  const signOut = () => {
    auth.signOut();
  };

  return { user, isLogin, signIn, signOut };
}


export function useChat() {
  const messages = ref([]); // Storing my messages in an Array
  const messagesRef = collection(db, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(100)); // Setting the query to only get recent messages and set a limit to 100 messages

  // Listen to real-time updates on messages
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse(); 
  });

  onUnmounted(unsubscribe);

  // Sending  messages to Firestore
  const sendMessage = async (text) => {
    if (!auth.currentUser) return; 
    try {
      await addDoc(messagesRef, {
        userName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        userPhotoURL: auth.currentUser.photoURL,
        text: text,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error sending message:", error); 
    }
  };

  return { messages, sendMessage }; 
}
