import { ReactNode } from 'react';
import ProfileCard from './ProfileCard';
import TagsCard from './TagsCard';

type BlogLayoutProps = {
  children: ReactNode;
  tags: string[];
  tagCounts: Record<string, number>;
};

export default function BlogLayout({ children, tags, tagCounts }: BlogLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧边栏 */}
        <aside className="md:w-1/4 space-y-6">
          <ProfileCard />
          <TagsCard tags={tags} counts={tagCounts} />
        </aside>
        
        {/* 右侧内容区 */}
        <main className="md:w-3/4">
          {children}
        </main>
      </div>
    </div>
  );
}