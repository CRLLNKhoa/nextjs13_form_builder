"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

export default function VisitBtn({shareUrl}:{shareUrl: string}) {
  const [moumted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, []);

  if(!moumted){
    return null
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div>
      <Button className='w-[200px]'
      onClick={() => {
        window.open(shareLink,"_blank")
      }}>
        Đi đến
      </Button>
    </div>
  )
}
