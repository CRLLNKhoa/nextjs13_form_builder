"use client";
import { Form } from "@prisma/client";
import React, {useEffect, useState} from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDesigner from "./hooks/useDesigner"
import { ImSpinner2 } from "react-icons/im";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Link from "next/link";
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";
import Confetti from "react-confetti"

function FormBuilder({ form }: { form: Form }) {

  const {setElements} = useDesigner()
  const [isReady, setIsReady] = useState(false);

  const mouseSenosor  = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, 
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5
    }
  })

  const sensors = useSensors(mouseSenosor, touchSensor)

  useEffect(() => {
    if(isReady) return
    const elements = JSON.parse(form.content);
    setElements(elements)
    const readyTimeOut = setTimeout(() => setIsReady(true),500)
    return () => clearTimeout(readyTimeOut)
  }, [form, setElements]);


  if(!isReady){
    return(
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    )
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`

  if(form.published){
    return(
      <>
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
        <div className="flex flex-col items-center justify-center h-full w-full">
         <div className="max-w-md text-center">
            <h1 className="text-2xl"> 🎉Biểu mẫu đã được xuất bản🎉</h1>
            <h2 className="text-xl mt-4">Chia sẻ biểu mẫu</h2>
            <h3 className="text-sm text-muted-foreground border-b pb-10">
              Bất kì ai có liên kết này điều có thể xem vài gửi phản hồi về biểu mẫu
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                toast({
                    title: "Đã sao chép!",
                    description: "Liên kết đã được sao chép vào bản ghi tạm!"
                })
              }}>Sao chép</Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <BiSolidArrowToLeft /> Trở lại trang chính
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  Chi tiết biểu mẫu <BiSolidArrowToRight />
                </Link>
              </Button>
            </div>
         </div>
        </div>
      </>
    )
  }

  return (
    <DndContext sensors={sensors}>
        <main className="flex flex-col w-full">
          <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Form: </span>
              {form.name}
            </h2>
            <div className="flex items-center gap-2">
              <PreviewDialogBtn />
              {!form.published && (
                <>
                  <SaveFormBtn id={form.id} />
                  <PublishFormBtn id={form.id}/>
                </>
              )}
            </div>
          </nav>
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
            <Designer />
          </div>
        </main>
        <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
