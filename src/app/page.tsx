import { getAllPosts, getAllTags, groupPostsByYear } from '@/lib/markdown';
import BlogLayout from '@/components/BlogLayout';
import PostList from '@/components/PostList';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Miracle Zhang's Blog",
  description: "一个30岁才觉醒，为了梦想而努力的开发",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 获取所有文章
  const allPosts = await getAllPosts();
  
  // 获取所有标签和每个标签的文章数量
  const allTags = getAllTags(allPosts);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = allPosts.filter(post => post.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);
  
  const { tag  } = await searchParams; 
  // 按标签筛选文章
  const filteredPosts = tag
    ? allPosts.filter(post => post.tags.includes(tag as string))
    : allPosts;
  
  // 按年份分组
  const groupedByYear = groupPostsByYear(filteredPosts);
  
  return (
    <BlogLayout tags={allTags} tagCounts={tagCounts}>
      <div className="mb-6">
        {tag ? (
          <h1 className="text-3xl font-bold mb-2">标签: {tag}</h1>
        ) : (
          <h1 className="text-3xl font-bold mb-2">所有文章</h1>
        )}
        <p className="text-gray-500 dark:text-gray-400">
          共 {filteredPosts.length} 篇文章
        </p>
      </div>
      
      <PostList posts={filteredPosts} groupedByYear={groupedByYear} />
    </BlogLayout>
  );
}
