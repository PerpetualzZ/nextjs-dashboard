// 使用 Next.js 中间件保护您的路由
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
// authConfig 对象初始化 NextAuth.js 并导出 auth 属性。您还使用中间件中的 matcher 选项来指定它应该在特定路径上运行。
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher 选项来指定它应该在特定路径上运行。
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};