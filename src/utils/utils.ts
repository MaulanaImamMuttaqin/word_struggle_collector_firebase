import typingFieldStates from "../components/TypingField/states/typingFieldStates"
import { words_list } from "../constant/words"
export const getStandardDeviation = (array: Array<number>): number => {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

export const calculateTypingSpeed = (char: number, wrong: number) => {
    let gross = char / 5
    let time = typingFieldStates.timer / 60
    let net = Math.round((gross - wrong) / time)
    let accuracy = (((char - wrong) / char) * 100).toFixed(1)
    return [net, accuracy]
}
export const random_int = (size: number): number => {

    const number: number = Math.floor(Math.random() * size)
    return number
}
export const get_words_random = (): Array<string> => {
    let words_to_typed: string[] = []
    while (words_to_typed.length < 200) {
        words_to_typed.push(words_list[random_int(words_list.length)])
    }
    // console.log(words_to_typed)
    return words_to_typed
}