import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import useKeyPress from '../../customHooks/useKeyPress'
import { db } from '../../firebase'
import { storage } from '../../utils/storage'
import { calculateTypingSpeed, getStandardDeviation, get_words_random } from '../../utils/utils'
import { AuthContext } from '../AuthContext/AuthContextProvider'
import { ITFActions, ITPActions } from './Interfaces'
import Reducers from './reducers/Reducers'
import Refs from './refs'




const TypingField = ({ children }: { children: any }) => {

    const { docRef } = useContext(AuthContext)
    const { TFstate, TPstate, TFDispatch, TPDispatch } = Reducers()
    const { letterRef, inputRef, exessElContainer, focusCoverRef } = Refs()
    const mousePressed = useKeyPress("mouse", "mouse", window)

    // const [name, setName] = useState(storage.getName() || "")


    const [words, setWords] = useState<Array<string>>(get_words_random())

    const [ryhtmWord, setRythmWord] = useState<Array<number>>([])
    const [SDList, setSDList] = useState<Array<any>>([])


    const [wrgIncremented, setWrgIncremented] = useState<boolean>(false)
    // const [peakDetect, setPeakDetect] = useState<boolean | null>(null)
    const [wrgLettTotal, setWrgLettTotal] = useState<number>(0)
    const [ifWordStarted, setIfWordStarted] = useState<boolean>(false)

    // const [letWrgInd , setLetWrgInd] = useState()

    // let wrgLettTotal = 0
    let peakDetect = false
    // let wrgIncremented = false
    // let ifWordStarted = false

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        TFDispatch({ type: ITFActions.START })
        let spaceExist = e.target.value[e.target.value.length - 1] === " " ? true : false
        let element = letterRef.current[TFstate.HLIndex]
        let letters = element.childNodes as NodeListOf<HTMLElement>
        let word = e.target.value
        let word_arr = word.split("")
        let typedCorrect: boolean | null = words[TFstate.HLIndex].startsWith(word.trim())


        TFDispatch({ type: ITFActions.TYPED, payload: word })
        if (word.length > TFstate.wordTyped.length) {
            TPDispatch({ type: ITPActions.CHAR })
        }

        // loop for coloring each letter in the word
        words[TFstate.HLIndex].split("").forEach((l: any, i: number) => {
            letters[i].classList.remove("text-white", "text-blue-500", "text-red-600", "border-b-2", "border-red-600")
            // console.log(letters[i].innerHTML)
            if (word_arr[i] === undefined) {
                letters[i].classList.add("text-white")
            } else {
                if (letters[i].innerText === word_arr[i]) letters[i].classList.add("text-blue-500")
                else letters[i].classList.add("text-red-600", "border-b-2", "border-red-600")
            }
        })


        if (word_arr.length > words[TFstate.HLIndex].length) {
            let exessCont = exessElContainer.current[TFstate.HLIndex]
            exessCont.innerHTML = ""

            word_arr.slice(words[TFstate.HLIndex].length, word_arr.length).forEach((w, i) => {
                let newEl = document.createElement("SPAN")
                let text = document.createTextNode(w)
                newEl.classList.add("text-red-600", "border-b-2", "border-red-600")
                newEl.appendChild(text)
                exessCont.appendChild(newEl)
            })
        } else {
            exessElContainer.current[TFstate.HLIndex].innerHTML = ""
        }

        if ((typedCorrect && typedCorrect != null) || !ifWordStarted) {
            setRythmWord(p => [...p, Math.round(Date.now() / 10)])
            // ifWordStarted = true
            peakDetect = false
            // wrgIncremented = false
            setIfWordStarted(true)
            // setPeakDetect(false)
            setWrgIncremented(false)
        } else {
            peakDetect = true
            // setPeakDetect(true)
        }

        if (peakDetect && !wrgIncremented) {
            // wrgLettTotal++
            // wrgIncremented = true
            setWrgLettTotal(p => p + 1)
            setWrgIncremented(true)
            // console.log("wrong")
        }

        // if the user pressed space move to next word and check the previously typed word if correct or not 
        if (spaceExist) {
            let [isCorrect, wrongChar] = checkTypedWord(TFstate.wordTyped, words[TFstate.HLIndex])
            if (!typedCorrect || !isCorrect) return;
            if (word === "") return inputRef.current!.value = ""

            console.log(wrgLettTotal)
            TFDispatch({ type: ITFActions.SPACED })
            if (isCorrect) TPDispatch({ type: ITPActions.CORRECT, payload: wrongChar })
            else TPDispatch({ type: ITPActions.INCORRECT, payload: wrongChar })
            let rythm = calculateRyhtm(ryhtmWord)
            setSDList(p => [...p, {
                word: words[TFstate.HLIndex],
                totalPeak: wrgLettTotal,
                standDeviation: getStandardDeviation(rythm),
                calStandDeviation: getStandardDeviation(rythm) * (wrgLettTotal < 1 ? 1 : wrgLettTotal),
                rythm: JSON.stringify(rythm),
                correct: isCorrect
            }])
            inputRef.current!.value = ""
            setRythmWord([])
            // wrgLettTotal = 0
            setWrgLettTotal(0)
            // ifWordStarted = false
            setIfWordStarted(false)

        }
    }


    const calculateRyhtm = (rythm: number[]) => {
        let r: number[] = []
        for (let i = 0; i < rythm.length; i++) {
            if (rythm[i + 1]) {
                r.push(rythm[i + 1] - rythm[i])
            }
        }
        return r
    }

    const checkTypedWord = (typed: string, answer: string) => {
        let typedArr = typed.split("")
        let answerArr = answer.split("")
        let wrongChar = (typedArr.length > answerArr.length) ? typedArr.length - answerArr.length : 0;
        answerArr.forEach((a, i) => {
            if ((typedArr[i] === undefined) || (a !== typedArr[i])) {
                wrongChar++
            }
        })
        if (typed.trim() !== answer) {

            // letterRef.current[TFstate.HLIndex].classList.add("border-b-2", "border-red-500")
            return [false, wrongChar];
        }
        // letterRef.current[TFstate.HLIndex].classList.remove("border-b-2", "border-red-500")
        return [true, wrongChar]
    }


    useEffect(() => {
        let timerInterval: number = 0

        if (TFstate.typingStarted && TFstate.timer !== 0) {

            timerInterval = window.setInterval(() => {
                if (!TFstate.isPaused) {
                    TFDispatch({ type: ITFActions.DECREASE_TIME })
                }
            }, 1000)
        } else if (TFstate.timer === 0) {
            let [net, accuracy] = calculateTypingSpeed(TPstate.charCount, TPstate.charWrong)
            TPDispatch({ type: ITPActions.FINISH, payload: { net, accuracy } })
            TFDispatch({ type: ITFActions.STOP })
            updateData()
            clearInterval(timerInterval)
            // clearInterval(rythmInterval)
        }


        return () => clearInterval(timerInterval)
    }, [TFstate.typingStarted, TFstate.timer, TFstate.isPaused])




    useEffect(() => {
        if (!(mousePressed && !TFstate.inputIsFocus)) return;
        inputRef.current!.focus()
    }, [mousePressed])

    useEffect(() => {
        if (!(TFstate.typingStarted && TFstate.timer === 0)) return;
        inputRef.current!.blur()
    }, [TFstate.typingStarted])



    useEffect(() => {
        inputRef.current!.focus()
    }, [])




    const restart = (new_test?: boolean) => {
        if (new_test) setWords(get_words_random())
        setSDList([])
        setRythmWord([])
        restart_letter_styles(TFstate.HLIndex)
        inputRef.current!.value = ""
        inputRef.current!.focus()
        TFDispatch({ type: ITFActions.RESET })
        TPDispatch({ type: ITPActions.RESET })

    }

    const restart_letter_styles = (index: number) => {
        for (let a = 0; a <= index; a++) {
            let letter = letterRef.current[a].childNodes as NodeListOf<HTMLElement>

            letter.forEach((l, i) => {
                l.className = ""
            })
        }
    }


    const updateData = async () => {
        let obj: any = {};
        SDList.forEach(l => {
            obj["words_score." + l.word] = l.standDeviation
        })

        let update_data = {
            "speed": TPstate.speed,
            ...obj
        }

        await updateDoc(docRef, update_data);
    }

    const focusInput = (): void => {
        inputRef.current!.focus()
    }

    const props = {
        words,
        input: {
            inputRef,
            inputHandler,
            onFocus: () => {
                TFDispatch({ type: ITFActions.FOCUS })
            },
            onBlur: () => TFDispatch({ type: ITFActions.UNFOCUS })
        },
        states: {
            TFstate, TPstate,
            SDList
        },
        refs: {
            letterRef, inputRef, exessElContainer, focusCoverRef,
        },
        restart,
        focusInput
    }

    return <div className="h-screen center">
        {children(props)}\
    </div>

}

export default TypingField
