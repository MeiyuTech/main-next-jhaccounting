import { useTranslations } from "next-intl"
import Image from "next/image"
import { setRequestLocale } from "next-intl/server"

export default function NewsPost({
  params: { locale, slug },
}: Readonly<{ params: { locale: string; slug: string } }>) {
  setRequestLocale(locale);
  const t = useTranslations('NewsPost');

  // Mock post data 
  // TODO: In production, this should be fetched from a database based on the slug
  const post = {
    title: "AICPA to Congress: Delay needed in BOI reporting deadline",
    date: "2024-11-13",
    views: 2120,
    content: `
      <p>The deadline for beneficial ownership information (BOI) reports that applies to most small businesses should be delayed, the AICPA said in a letter to congressional committee leaders.</p>
      <br />
      <p>Otherwise, "this country will see millions of small business owners become accidentally and unknowingly delinquent in their compliance," said the letter to the chairs and ranking members of the Senate Banking Committee and the House Financial Services Committee. The letter is signed by AICPA CEO Barry Melancon, CPA, CGMA, and dated Nov. 11.</p>
      <br />
      <p>The Financial Crimes Enforcement Network (FinCEN), which oversees BOI reporting, has received about 6.5 million of the estimated 32 million reports that it expects to be filed, a FinCEN official said last week.</p>
      <br />
      <b>
        'Lack of clarity' and 'tight' deadlines
      </b>
      <p>"Small businesses should have a reasonable chance at compliance," the letter said. "There is still a lack of clarity and unanswered questions about the reporting requirements, which has held small businesses back from filing. … To ensure small businesses remain above board with federal laws and regulations, we believe the rule should be suspended for at least a year so the small business community can become better informed of their filing requirement."</p>
      <br />
      <p>Other concerns are an "unnecessarily tight 30-day timeline for report amendments and changes," the AICPA wrote, adding that the timeline makes monitoring client information complex for tax professionals who would ordinarily catch changes and updates during annual client meetings prior to clients' annual tax filing. The AICPA also noted additional complexities with staggered delays due to natural disasters.</p>
      <br />
      <b>
        Filing requirements

      </b>
      <p></p>
      
      <h2>谁有资格申请？</h2>
      <ul>
        <li>在2020年3月13日至2021年9月30日期间运营的企业</li>
        <li>因政府命令而完全或部分停业的企业</li>
        <li>经历重大收入下降的企业</li>
      </ul>
    `,
    coverImage: "/news/erc-cover.jpg",
    author: "By Martha Waggoner"
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{t('views', { count: post.views })}</span>
        </div>
        <div className="relative h-[400px] w-full mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Article content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
} 