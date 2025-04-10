'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { setTheme } = useTheme();

  // 只在客户端渲染时设置 mounted 状态
  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { name: 'light', icon: '☀️', label: '明亮' },
    { name: 'dark', icon: '🌙', label: '暗黑' },
    { name: 'system', icon: '💻', label: '系统' },
  ];

  // 在服务器端渲染时不显示任何内容
  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`flex items-center gap-2 transition-all duration-300 ${isExpanded ? 'translate-x-0' : 'translate-x-[calc(100%-2rem)]'}`}>
        <div className="flex gap-2 bg-white dark:bg-gray-800 p-2 rounded-l-lg shadow-lg">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t.name);
              }}
              className={`px-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
              title={t.label}
            >
              <span className="text-xl">{t.icon}</span>
            </button>
          ))}
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer">
          <span className="text-xl">🎨</span>
        </div>
      </div>
    </div>
  );
}