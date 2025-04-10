'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type TagsCardProps = {
  tags: string[];
  counts: Record<string, number>;
};

export default function TagsCard({ tags, counts }: TagsCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get('tag');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 只在桌面设备上启用固定功能
      if (window.innerWidth >= 768) { // md断点
        const offset = window.scrollY;
        setIsSticky(offset > 300); // 当滚动超过300px时固定标签卡片
      } else {
        setIsSticky(false); // 移动设备上禁用固定功能
      }
    };

    // 初始检查滚动位置
    handleScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <Card className={`mb-6 ${isSticky ? 'sticky top-4 transition-all duration-300 shadow-md' : ''}`}>
      <CardHeader>
        <CardTitle>标签</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`rounded-full px-3 py-1 text-sm ${currentTag === tag
                ? 'bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {tag}
              <span className="ml-1 text-xs">{counts[tag]}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}