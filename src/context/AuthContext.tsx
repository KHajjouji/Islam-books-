import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (currentUser.email !== 'hypocritic2002@gmail.com') {
          const allowedRef = doc(db, 'allowed_emails', currentUser.email || '');
          const allowedSnap = await getDoc(allowedRef);
          
          if (!allowedSnap.exists()) {
            await firebaseSignOut(auth);
            alert("You must be registered by an admin to log in.");
            setUser(null);
            setIsAdmin(false);
            setLoading(false);
            return;
          }
        }

        // Check if user document exists, if not create it
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          // Create new user document
          const isDefaultAdmin = currentUser.email === 'hypocritic2002@gmail.com';
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            role: isDefaultAdmin ? 'admin' : 'customer',
            createdAt: serverTimestamp()
          });
          setIsAdmin(isDefaultAdmin);
        } else {
          const userData = userSnap.data();
          setIsAdmin(userData.role === 'admin' || currentUser.email === 'hypocritic2002@gmail.com');
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
