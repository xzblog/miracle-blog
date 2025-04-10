'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  items: TOCItem[];
};

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const tocRef = useRef<HTMLUListElement>(null);

  // 滚动目录项到可见区域
  const scrollActiveItemIntoView = useCallback(() => {
    if (!tocRef.current || !activeId) return;
    
    const activeItem = tocRef.current.querySelector(`a[href="#${activeId}"]`)?.parentElement;
    if (activeItem) {
      const containerRect = tocRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      
      if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 找到最接近视口顶部的可见标题
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) => {
            return prev.boundingClientRect.top > curr.boundingClientRect.top ? curr : prev;
          });
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: [0, 1]
      }
    );

    // 观察所有标题元素
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  // 当activeId变化时，滚动目录项到可见区域
  useEffect(() => {
    scrollActiveItemIntoView();
  }, [activeId, scrollActiveItemIntoView]);

  return (
    <nav className="toc">
      <h2 className="text-lg font-semibold mb-4">目录</h2>
      <ul ref={tocRef} className="space-y-2 text-sm max-h-[400px] overflow-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center group"
          >
            <div className='w-6'>
              <div 
                className={`
                  h-1 bg-gray-200 dark:bg-gray-700 rounded  
                  ${activeId === item.id ? 'bg-gray-500' : ''}
                  group-hover:bg-gray-500 transition-colors
                `}
                style={{ width: `${(7 - item.level) * 4}px` }}
              />
            </div>
            <a
              href={`#${item.id}`}
              className={`
                ml-2 block py-1 text-gray-600 dark:text-gray-300
                group-hover:text-gray-800 group-hover:font-medium transition-colors whitespace-nowrap overflow-hidden
                ${activeId === item.id ? 'text-gray-800 font-medium' : ''}
              `}
              style={{
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }}
              title={item.text}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}