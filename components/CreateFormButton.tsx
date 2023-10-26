"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { formSchema, formSchemaType } from "@/schema/form";
import { CreateForm } from "@/actions/form";
import { FaWpforms } from "react-icons/fa";
import { useRouter } from "next/navigation";

function CreateFormButton() {
  const router = useRouter()
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Thành công!",
        description: "Bạn đã tạo biểu mẫu thành công!",
        variant: "default",
      });
      router.push(`/builder/${formId}`)
    } catch (error) {
      toast({
        title: "Lỗi!",
        description: "Biểu mẫu đã tồn tại!",
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="group border border-primary/20 h-[160px]  hover:cursor-pointer border-dashed gap-4 items-center flex flex-col hover:border-primary">
          <FaWpforms className="text-2xl" />
          Tạo biểu mẫu mới
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo biểu mẫu</DialogTitle>
          <DialogDescription>
            Tạo biểu mẫu mới để bất đầu nhận các phản hồi
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên biểu mẫu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới thiệu biểu mẫu</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormButton;
