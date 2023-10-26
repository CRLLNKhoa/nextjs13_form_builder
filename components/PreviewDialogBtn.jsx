import React from 'react'
import { Button } from './ui/button'
import {MdPreview} from "react-icons/md"

function PreviewDialogBtn() {
  return (
   <Button variant={'outline'}>
    <MdPreview className="mr-2" />
    Xem trước</Button>
  )
}

export default PreviewDialogBtn