import { ReactNode } from 'react';
import Link from 'next/link';
import TableOfContents from'./TableOfContents';
import BackToTop from './BackToTop';

type PostLayoutProps = {
  children: ReactNode;
  toc: Array<{
    id: string;
    text: string;
    level: number;
  }>;
};

export default function PostLayout({ children, toc }: PostLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <BackToTop />
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧文章内容区 */}
        <main className="w-full md:w-3/4">
          <Link 
            href="/" 
            className="inline-flex items-center mb-6 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            返回文章列表
          </Link>
          {children}
        </main>
        
        {/* 右侧目录 */}
        <aside className="hidden md:block md:w-1/4">
          <div className="sticky top-8">
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>
    </div>
  );
}