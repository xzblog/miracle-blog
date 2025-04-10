import { getAllPosts, getPostBySlug, getAdjacentPosts } from '@/lib/markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostLayout from '@/components/PostLayout';

function extractTOC(content: string) {
  const headingRegex = /<h([1-6])[^>]*?id="([^"]+)"[^>]*?>([^<]+?)(?:<a[^>]*?class="anchor"[^>]*?>.*?<\/a>)?<\/h[1-6]>/g;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    toc.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].trim()
    });
  }

  return toc;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const allPosts = await getAllPosts();
  const { prev, next } = getAdjacentPosts(allPosts, slug);
  
  // 从文章内容中提取目录结构
  const toc = extractTOC(post.content);
  
  return (
    <PostLayout toc={toc}>
      <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:group">
        <header className="mb-8 scroll-mt-8" id="article-header">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/?tag=${tag}`}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </header>
        
        <main 
          className='main prose-headings:scroll-mt-8' 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prev ? (
              <Link 
                href={`/posts/${prev.slug}`}
                className="group flex flex-col p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">上一篇</span>
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{prev.title}</span>
              </Link>
            ) : <div />}
            
            {next ? (
              <Link 
                href={`/posts/${next.slug}`}
                className="group flex flex-col p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-right"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">下一篇</span>
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{next.title}</span>
              </Link>
            ) : <div />}
          </div>
        </footer>
      </article>
    </PostLayout>
  );
}