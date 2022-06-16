import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { useAuthState } from "react-firebase-hooks/auth"



interface IAuthContext {
  name: string | null,
  setName: Dispatch<SetStateAction<string | null>>,
  docRef?: any
}

const initialContext = {
  name: null,
  setName: () => { },
  docRef: null
}
export const AuthContext = createContext<IAuthContext>(initialContext)




function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [docRef, setDocRef] = useState<any>()
  const [name, setName] = useState<string | null>(null)
  const [user, loading, error] = useAuthState(auth);


  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const document = await getDocs(q);
      const data = document.docs[0].data();

      setName(data.name);
      setDocRef(doc(db, "users_scores", data.uid))
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return setName(null);

    fetchUserName();
  }, [user, loading]);



  return (
    <AuthContext.Provider value={{
      name,
      setName,
      docRef
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider  