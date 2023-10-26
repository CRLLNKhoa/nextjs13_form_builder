import React from 'react'
import { Button } from './ui/button'
import {MdPublic} from "react-icons/md"

function PublishFormBtn() {
    return (
        <Button className='bg-gradient-to-r from-indigo-400 to-cyan-400 text-white font-bold'>
         <MdPublic className="mr-2" />
         Công khai</Button>
       )
}

export default PublishFormBtn