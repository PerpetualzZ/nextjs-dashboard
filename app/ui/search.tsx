// useSearchParams- 允许您访问当前 URL 的参数。例如，此 URL /dashboard/invoices?page=1&query=pending 的搜索参数将如下所示：{page: '1', query: 'pending'}。
// usePathname - 让您读取当前 URL 的路径名。例如，对于路由 /dashboard/invoices，usePathname 将返回 '/dashboard/invoices'。
// useRouter - 以编程方式启用客户端组件内的路由之间的导航。您可以使用多种方法。

'use client'; // 客户端组件

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  useSearchParams,
  useRouter,
  usePathname,
} from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const SearchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 监听器
  function handleSearch(term: string) {
    // new URLSearchParams() 允许你利用 URLSearchParams 提供的各种方法来操作URL的查询字符串，例如添加、删除或读取查询参数
    const params = new URLSearchParams(SearchParams);
    if (term) {
      // // 如果term有值（即非空、非null、非undefined），则在查询字符串中设置 'query' 参数为 term 的值
      params.set('query', term);
    } else {
      // 如果 term 没有值（即为空字符串、null、或undefined），则从查询字符串中删除 'query' 参数
      params.delete('query');
    }
    // replace 方法来更新浏览器的当前URL而不会重新加载页面
    // 
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // 每当输入值发生变化时，调用这个函数
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
