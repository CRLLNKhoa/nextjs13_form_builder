"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react'

function Error({error}:{error: Error}) {
    useEffect(() => {
        console.log("Lỗi!")
    }, []);
  return (
    <div className='flex w-full h-full flex-col items-center justify-center'>
        <h2 className="mb-4 text-2xl font-bold">Biểu mẫu không tồn tại!</h2>
        <Button asChild variant={"secondary"}><Link href={"/"}>Trở về trang chủ</Link></Button>
    </div>
  )
}

export default Error