import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';

export default function ProfileCard() {
  return (
    <Card className="mb-6">
      <CardContent className="flex flex-col items-center p-6">
        <div className="relative h-32 w-32 overflow-hidden rounded-full mb-4">
          <Image 
            src="/avatar.png"
            alt="Miracle.Zhang" 
            width={128} 
            height={128}
            className="object-cover"
            priority
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Miracle.Zhang</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4">Web / Flutter / Nestjs developer</p>
        
        <div className="flex space-x-6">
          <Link href="https://juejin.cn/user/553809588791853/posts" aria-label="Juejin" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1316 1024" fill="currentColor" className="h-5 w-5">
              <path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z"></path>
            </svg>
          </Link>
          <Link href="https://github.com/xzblog" aria-label="GitHub" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </Link>
          <Link href="mailto:example@example.com" aria-label="Email" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}