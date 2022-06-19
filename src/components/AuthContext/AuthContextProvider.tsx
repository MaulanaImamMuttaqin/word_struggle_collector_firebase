import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { useAuthState } from "react-firebase-hooks/auth"



interface IAuthContext {
  name: string | null,
  setName: Dispatch<SetStateAction<string | null>>,
  docRef?: any,
  userData: any
}

const initialContext = {
  name: null,
  setName: () => { },
  docRef: null,
  userData: {}
}
export const AuthContext = createContext<IAuthContext>(initialContext)




function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [docRef, setDocRef] = useState<any>()
  const [name, setName] = useState<string | null>(null)
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<any | null>(null)

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const document = await getDocs(q);
      const data = document.docs[0].data();
      const score_document = await getDoc(doc(db, "users_scores", data.uid))
      if (score_document.data()) {
        console.log(score_document)
      } else {
        await setDoc(doc(db, "users_scores", data.uid), {
          "speed": 0,
          "timestamp": serverTimestamp(),
          "words_score": []
        });
      }
      // setUserData({
      //   name: score_document.data().,
      //   timeStamp: data.timeStamp,
      //   totalTest: data.total_test
      // })
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
      docRef,
      userData
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider  