import { useEffect, useState } from "react"

const useDebouce = (value, delay) => {
    
    const [debouce, setDebouce] = useState(value)

    useEffect(() => {
        const timerId =  setTimeout(() => {
            setDebouce(value)
        },delay)

        return () => clearTimeout(timerId)
    },[value, delay])

    return debouce
}

export default useDebouce
