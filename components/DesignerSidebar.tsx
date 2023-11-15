import React from 'react'
import { Button } from "@/components/ui/button"
import { IoMdAdd } from "react-icons/io";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useDesigner from './hooks/useDesigner'
import FormElementsSidebar from './FormElementsSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'

function DesignerSidebar() {
  const {selectedElement} = useDesigner()
  return (
   <>
      <aside className='w-[400px] max-w-[400px] hidden md:flex lg:flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
        {!selectedElement && <FormElementsSidebar />}
        {selectedElement && <PropertiesFormSidebar />}
      </aside>
   </>
  )
}

export default DesignerSidebar
