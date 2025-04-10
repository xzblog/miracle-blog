import Link from 'next/link';
import { Post } from '@/lib/markdown';

type PostListProps = {
  posts: Post[];
  groupedByYear: Record<string, Post[]>;
};

export default function PostList({ groupedByYear }: PostListProps) {
  // 获取所有年份并按降序排序
  const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  return (
    <div className="space-y-10">
      {years.map((year) => (
        <div key={year} className="mb-8 relative">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">{year}</h2>
            <span className="ml-14 text-sm text-gray-500 dark:text-gray-400">
              {groupedByYear[year].length} 篇文章
            </span>
          </div>
          <div className='absolute left-[4.88em] top-3 mx-auto h-3 w-3 z-10 rounded-full border-2 bg-none'></div>
          <div className="absolute left-[5.21em] top-[1.5em] bottom-[1.6em] w-px border-l border-dashed border-gray-200 dark:border-gray-700"></div>
          
          <ul className="space-y-4">
            {groupedByYear[year].map((post) => {
              // 从日期中提取月和日
              const date = new Date(post.date);
              const month = date.getMonth() + 1;
              const day = date.getDate();
              
              return (
                <li key={post.slug} className="group relative hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors duration-200 px-4 py-2">
                  <div className="flex items-center">
                    <div className="min-w-[80px] text-gray-500 dark:text-gray-400 text-sm relative">
                      <div className="absolute left-[4rem] top-1/2 z-10 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600  group-hover:h-4 group-hover:bg-blue-400 dark:group-hover:bg-blue-300 transition-all"></div>
                      {month.toString().padStart(2, '0')}-{day.toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1 pl-12 flex">
                      <div className='flex-1'>
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="text-lg font-medium group-hover:ml-2  group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-all"
                        >
                          {post.title}
                        </Link>
                      </div>
                      <div className="hidden sm:flex gap-2">
                        {post.tags.map((tag) => (
                          <Link 
                            key={tag} 
                            href={`/?tag=${tag}`}
                            className="text-xs px-2 max-h-6 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 "
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}