// 允许用户在发票页面之间导航
import Pagination from '@/app/ui/invoices/pagination';
// 允许用户搜索特定发票
import Search from '@/app/ui/search';
// 显示发票
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // 如果searchParams存在并且query属性也存在，则query变量被赋予该值；如果不存在，则赋予空字符串''作为默认值。
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // 返回基于搜索查询的总页数
  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/* Suspense组件允许你将组件的渲染“挂起”（即延迟），直到某些条件（通常是数据的加载）得到满足。 */}
      {/* 当正在加载数据时,显示InvoicesTableSkeleton组件 */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
