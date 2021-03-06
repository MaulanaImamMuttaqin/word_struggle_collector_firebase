import typingFieldStates from "../components/TypingField/states/typingFieldStates"
import { words_list } from "../constant/words"

export const getStandardDeviation = (array: Array<number>, max?: number | null): number => {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    const result = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    if (max) {
        if (result > max) {
            return max
        }
    }
    return result
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
export const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

export const makeid = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}