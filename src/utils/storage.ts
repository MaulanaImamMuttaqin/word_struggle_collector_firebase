
interface storage {
    getName: () => string,
    setName: (name: any) => void,
}

export const storage: storage = {
    getName: () => JSON.parse(window.localStorage.getItem("name")!),
    setName: (name: any) =>
        window.localStorage.setItem("name", JSON.stringify(name)),
};

