import React from 'react'
import { Button } from './ui/button'
import {BiSave} from "react-icons/bi"

function SaveFormBtn() {
    return (
        <Button variant={'outline'}>
         <BiSave className="mr-2" />
         Lưu</Button>
       )
}

export default SaveFormBtn