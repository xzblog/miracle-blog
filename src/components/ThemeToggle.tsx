'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();

  // 添加主题变化监听
  useEffect(() => {
    console.log('当前主题:', theme);
  }, [theme]);

  const themes = [
    { name: 'light', icon: '☀️', label: '明亮' },
    { name: 'dark', icon: '🌙', label: '暗黑' },
    { name: 'system', icon: '💻', label: '系统' },
  ];

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
                console.log('切换主题到:', t.name);
                setTheme(t.name);
              }}
              className={`px-2 rounded-lg transition-colors
                ${theme === t.name ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
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