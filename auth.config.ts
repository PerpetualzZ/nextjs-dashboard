import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  // 指定自定义登录、注销和错误页面的路由
  pages: {
    signIn: '/login',
  },

  // 添加逻辑以保护您的路由。这将阻止用户访问仪表板页面，除非他们已登录。
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;