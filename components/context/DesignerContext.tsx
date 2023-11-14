"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"
import { FormElementIstance } from "../FormElements"

type DesignerContextType = {
    elements: FormElementIstance[];
    setElements: Dispatch<SetStateAction<FormElementIstance[]>>
    addElement: (index: number, element: FormElementIstance) => void
    removeElement: (index: string) => void

    selectedElement: FormElementIstance | null
    setSelectedElement:  Dispatch<SetStateAction<FormElementIstance | null>>

    updateElement: (id: string, element: FormElementIstance) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({
    children,
}:{children: ReactNode}){
    const [elements, setElements] = useState<FormElementIstance[]>([])
    const [selectedElement, setSelectedElement ] = useState<FormElementIstance | null>(null)
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

    const updateElement = (id: string,element: FormElementIstance) => {
        setElements(prev => {
            const newElements = [...prev]
            const index = newElements.findIndex(el => el.id === id)
            newElements[index] = element
            return newElements
        })
    }
    return <DesignerContext.Provider value={{elements, setElements,addElement,removeElement,selectedElement,setSelectedElement, updateElement}}>{children}</DesignerContext.Provider>
}