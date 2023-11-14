import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { MdPublic } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDescription } from "./ui/alert";
import { FaIcons } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter()
  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Thành công!",
        description: "Biểu mẫu đã được công khai!",
      });
      router.refresh()
    } catch (error) {
      toast({
        title: "Có gì đó sai sai!",
        description: "Xảy ra lỗi!",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white font-bold">
          <MdPublic className="mr-2" />
          Công khai
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc chắn không!
          </AlertDialogTitle>
          <AlertDescription className="text-[12px] flex flex-col gap-2">
           <span className="mt-2">
              1. Hành động này không thể được hoàn tác. Sau khi xuất bản, bạn sẽ
              không thể chỉnh sửa biểu mẫu này.
           </span>
            <span>
              2. Bằng cách xuất bản biểu mẫu này, bạn sẽ cung cấp nó cho mọi người
              và bạn sẽ có thể thu thập các bài gửi.
            </span>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Trở lại</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Công khai {loading && <FaIcons className="animate-spin ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
