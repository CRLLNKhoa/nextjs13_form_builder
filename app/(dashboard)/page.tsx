import { GetFormStats, GetForms } from "@/actions/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";

function Home() {
  return (
    <div className="container pt-4">
      <h2 className="text-xl font-bold col-span-2 mt-6">
        Thống kê số liệu biểu mẫu
      </h2>
      <Separator className="my-2" />
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <h2 className="text-xl font-bold col-span-2 mt-6">
        Danh sách biểu mẫu của bạn
      </h2>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-4 mt-4">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Lượt truy cập"
        icon={<LuView />}
        helperText="Tất cả các biểu mẫu"
        value={data?.vistis.toLocaleString() || ""}
        loading={loading}
        className="shadow-sm shadow-blue-600"
      />
      <StatsCard
        title="Lượt làm khảo sát "
        icon={<FaWpforms />}
        helperText="Tất cả các biểu mẫu"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-sm shadow-yellow-600"
      />
      <StatsCard
        title="Tỉ lệ hoàn thành khảo sát"
        icon={<HiCursorClick />}
        helperText="Lượt truy cập dẫn đến việc gửi biểu mẫu"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-sm shadow-green-600"
      />
      <StatsCard
        title="Tỉ lệ không khảo sát"
        icon={<TbArrowBounce />}
        helperText="Lượt truy cập dẫn đến việc gửi biểu mẫu"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-sm shadow-red-600"
      />
    </div>
  );
}

export const StatsCard = ({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  helperText: string;
  icon: ReactNode;
  loading: boolean;
  className: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
};

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[160px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card title={form.name} className="h-[160px]">
      <CardHeader className="py-4">
        <CardTitle className="flex justify-between text-sm">
          <span className="flex truncate w-[80%] items-center gap-2 justify-between">
            {form.name}
          </span>
          {form.published && <Badge color="green">Hiện</Badge>}
          {!form.published && <Badge variant={"destructive"}>Ẩn</Badge>}
        </CardTitle>
        <CardDescription className="capitalize flex items-start justify-between text-muted-foreground">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
            locale: vi,
          })}
          {form.published && (
            <span className="flex text-[12px] items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visstis.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "Mô tả trống"}
      </CardContent>
      <CardFooter className="flex items-center">
        {form.published && (
          <Button className="w-full mt-2" asChild size={"sm"}>
            <Link href={`/forms/${form.id}`}>
              Xem thông tin
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button className="w-full mt-2" asChild variant={"secondary"} size={"sm"}>
            <Link href={`/builder/${form.id}`}>
              Chỉnh sửa
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Home;
