import { useContext,useEffect,useState } from "react";
import axios from "axios"

const stateContext= createContext()

export const stateContextProvider = ({children})=>{
const [weather, setweather] = useState(null)
const [tem, settem] = useState("")
const [wsp, setwsp] = useState("")
}