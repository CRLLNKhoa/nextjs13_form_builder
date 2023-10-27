"use client"

import { ReactNode, createContext, useState } from "react"
import { FormElementIstance } from "../FormElements"

type DesignerContextType = {
    elements: FormElementIstance[];
    addElement: (index: number, element: FormElementIstance) => void
    removeElement: (index: string) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({
    children,
}:{children: ReactNode}){
    const [elements, setElements] = useState<FormElementIstance[]>([])
    const addElement =  (index: number, element: FormElementIstance) => {
        setElements((prev) => {
            const newElements = [...prev]
            newElements.splice(index, 0,element)
            return newElements
        })
    }
    const removeElement = (id: string) => {
        setElements(prev => prev.filter(elm => elm.id !== id))
    }
    return <DesignerContext.Provider value={{elements, addElement,removeElement}}>{children}</DesignerContext.Provider>
}