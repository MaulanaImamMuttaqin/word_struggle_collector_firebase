import { doc } from 'firebase/firestore'
import React, { createContext, Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react'
import { db } from '../../firebase'
import { storage } from '../../utils/storage'
import { authReducer, IAction, IAuthActions, IAuthState } from './reducer'
import authStates from './states'


interface IAuthContext {
  username: {
    name: string,
    nameIsSet: boolean,
    nameSetter: (name: string) => void,
    setNameIsSet: Dispatch<SetStateAction<boolean>>
  },
  docRef?: any
}

const initialContext = {
  username: {
    name: "",
    nameIsSet: true,
    nameSetter: (name: string, regis?: boolean) => { },
    setNameIsSet: () => { }
  },
  docRef: null
}
export const AuthContext = createContext<IAuthContext>(initialContext)




function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [nameIsSet, setNameIsSet] = useState<boolean>(true)
  const [docRef, setDocRef] = useState<any>()
  const [name, setName] = useState(storage.getName() || "")

  const nameSetter = (name: string, regis: boolean = false) => {
    if (!regis) {
      storage.setName(name)
      setDocRef(doc(db, "users_scores", name))
      setNameIsSet(true)
      setName(name)
    } else {

    }
  }

  useEffect(() => {
    console.log("check user exist")
    if (!storage.getName() && nameIsSet) {
      setNameIsSet(false)
    } else {
      setDocRef(doc(db, "users_scores", storage.getName()))
    }
  }, [nameIsSet])

  return (
    <AuthContext.Provider value={{
      username: {
        name,
        nameIsSet,
        setNameIsSet,
        nameSetter,
      },
      docRef
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider  