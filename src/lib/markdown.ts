import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// 博客文章的类型定义
export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  fileName?: string;
};

// 获取所有博客文章的目录
const postsDirectory = path.join(process.cwd(), 'docs');

// 获取所有博客文章的元数据
export async function getAllPosts(): Promise<Post[]> {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        // 读取 markdown 文件内容
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        // 使用 fileName 字段作为 slug，如果不存在则使用文件名
        const slug = encodeURIComponent(fileName.replace(/\.md$/, ''));

        // 使用 gray-matter 解析 frontmatter 已在上面完成

        // 处理 markdown 内容转换为 HTML
        const processedContent = await unified()
          .use(remarkParse)
          .use(remarkGfm) // 支持GitHub风格Markdown（表格、任务列表等）
          .use(remarkRehype)
          .use(rehypeSlug) // 为标题添加ID
          .use(rehypeAutolinkHeadings, { // 为标题添加锚点链接
            behavior: 'append',
            properties: {
              className: ['anchor'],
              ariaHidden: true,
              tabIndex: -1
            },
            content: {
              type: 'element',
              tagName: 'svg',
              properties: {
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 16 16',
                width: 16,
                height: 16,
                className: ['ml-2 h-4 w-4 opacity-0 group-hover:opacity-100']
              },
              children: [{
                type: 'element',
                tagName: 'path',
                properties: {
                  fillRule: 'evenodd',
                  d: 'M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'
                }
              }]
            }
          })
          .use(rehypeHighlight) // 代码高亮
          .use(rehypeStringify)
          .process(matterResult.content);

        const content = processedContent.toString();

        // 确保 tags 是数组
        const tags = Array.isArray(matterResult.data.tags)
          ? matterResult.data.tags
          : [];

        // 合并数据
        return {
          slug,
          title: matterResult.data.title || '',
          date: matterResult.data.date || '',
          tags,
          content,
        };
      })
  );

  // 按日期排序，最新的在前面
  return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 获取所有标签
export function getAllTags(posts: Post[]): string[] {
  const tagsSet = new Set<string>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet);
}

// 按标签筛选文章
export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((post) => post.tags.includes(tag));
}

// 获取特定文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${decodeURIComponent(slug)}.md`);
    // 确保文件存在
    if (!fs.existsSync(fullPath)) {
      console.error(`Error getting post by slug: ${slug}`,);
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // 使用 gray-matter 解析 frontmatter
    const matterResult = matter(fileContents);
    
    // 处理 markdown 内容转换为 HTML
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm) // 支持GitHub风格Markdown（表格、任务列表等）
      .use(remarkRehype)
      .use(rehypeSlug) // 为标题添加ID
      .use(rehypeAutolinkHeadings, { // 为标题添加锚点链接
        behavior: 'append',
        properties: {
          className: ['anchor'],
          ariaHidden: true,
          tabIndex: -1
        },
        content: {
          type: 'element',
          tagName: 'svg',
          properties: {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 16 16',
            width: 16,
            height: 16,
            className: ['ml-2 h-4 w-4 opacity-0 group-hover:opacity-100']
          },
          children: [{
            type: 'element',
            tagName: 'path',
            properties: {
              fillRule: 'evenodd',
              d: 'M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'
            }
          }]
        }
      })
      .use(rehypeHighlight) // 代码高亮
      .use(rehypeStringify)
      .process(matterResult.content);
      
    const content = processedContent.toString();
    
    // 确保 tags 是数组
    const tags = Array.isArray(matterResult.data.tags)
      ? matterResult.data.tags
      : [];
      
    return {
      slug,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      tags,
      content,
    };
  } catch (error) {
    console.error(`Error getting post by slug: ${slug}`, error);
    return null;
  }
}

// 获取前一篇和后一篇文章
export function getAdjacentPosts(posts: Post[], currentSlug: string): { prev: Post | null; next: Post | null } {
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;
  
  return { prev, next };
}

// 按年份对文章进行分组
export function groupPostsByYear(posts: Post[]): Record<string, Post[]> {
  const groupedPosts: Record<string, Post[]> = {};
  
  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    
    if (!groupedPosts[year]) {
      groupedPosts[year] = [];
    }
    
    groupedPosts[year].push(post);
  });
  
  // 确保年份是按降序排列的（最新的年份在前面）
  return Object.fromEntries(
    Object.entries(groupedPosts).sort((a, b) => (a[0] > b[0] ? -1 : 1))
  );
}