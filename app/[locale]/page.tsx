/**
 * Home Page
 * 
 * 
 */

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"

export default function Home() {
  return (
    <>
      {/* Process Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">我们让申请变得简单</h2>
          <p className="mb-12">完成这5个步骤，我们就可以处理剩下的所有事情。</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                step: 1,
                title: "简单回答10个问题",
                description: "这个调查不收费，也不代表任何承诺，只需几分钟就可以完成。"
              },
              {
                step: 2,
                title: "接听电话",
                description: "在几分钟内，我们会给您打电话，告诉您接下来的步骤，并为您提供初步估计。"
              },
              {
                step: 3,
                title: "签署合同",
                description: "为我们的专家们提供授权，签署一份合同，这将正式启动您申请程序。"
              },
              {
                step: 4,
                title: "收集必要的文件",
                description: "我们将列出所有为您申请所需要的文件！您的信息将被储存在安全加密云中。"
              },
              {
                step: 5,
                title: "完成",
                description: "我们将向美国国税局提交所有资料，而您将收到支票。"
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-slate-800 flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
          <Button className="mt-12 bg-teal-500 hover:bg-teal-600 text-lg px-12 py-6 text-xl font-bold rounded-xl">
            现在就从回答几个简单的问题开始吧
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">为什么选择我们?</h2>
          <p className="mb-12">我们会自始至终帮助您完成整个过程</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "最专业服务团队",
                description: "我们的注册会计师、律师、数据分析师和薪资专家等专业人员建立了一套专业系统，可以最大限度地提高您的信用。"
              },
              {
                icon: "💰",
                title: "最快的通过率",
                description: "Jiahua将为您提供便捷最快速且高通过率的申请"
              },
              {
                icon: "💻",
                title: "最好技术支持",
                description: "经过认证和便于申诉的报告，即使您的抵免收到以后也能确保安心。"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link href="#" className="text-teal-500 hover:text-teal-600 inline-flex items-center">
                    read more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}