"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

export default function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [moumted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!moumted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input
        value={shareLink}
        readOnly
      />
      <Button className="max-w-[250px]" onClick={() => {
        navigator.clipboard.writeText(shareLink)
        toast({
          title: "Sao chép thành công!",
          description: "Liên kết đã được lưu vào bảng ghi tạm"
        })
      }}>
        <ImShare className="mr-2 h-4 w-4" />
        Chia sẻ liên kết
      </Button>
    </div>
  );
}
