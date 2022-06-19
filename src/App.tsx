// import { useEffect, useState } from 'react';
import './App.css';
// import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
// import { db } from './firebase';
import TypingFieldSinglePlayer from './components/TypingFieldSinglePlayer';
// import { storage } from './utils/storage';
import Wrapper from './components/Wrapper';
import AuthContextProvider from './components/AuthContext/AuthContextProvider';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Speed Check"
  }, [])
  // const [count, setCount] = useState<any>(0)
  // const docRef = doc(db, "users_scores", "GlFBlSL87ou8GrvljiWv")
  // const docRef = doc(db, "users_scores", "GlFBlSL87ou8GrvljiWv")

  // useEffect(() => {
  //   async function getData() {
  //     const docsnap = await getDoc(docRef);
  //     setCount(docsnap.data())
  //     console.log(docsnap.data())
  //   }
  //   getData()
  // }, [])

  // useEffect(() => {
  //   onSnapshot(
  //     docRef,
  //     { includeMetadataChanges: true },
  //     (doc) => {
  //       setCount(doc.data())
  //     }
  //   );
  // }, [])

  // const updateData = async (counter: number) => {
  //   await setDoc(docRef, {
  //     count: count.count + counter
  //   });
  // }



  return (
    <div className="App">
      <div className='h-screen w-screen overflow-hidden bg-dark-blue-gradient' >
        <AuthContextProvider>
          <Wrapper>
            <TypingFieldSinglePlayer />
          </Wrapper>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
