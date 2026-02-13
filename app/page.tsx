"use client"

import { useState, useCallback } from "react"
import { Lightbulb, Compass, ArrowRight, Wand2, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { ValidateTab } from "@/components/validate-tab"
import { InspireTab } from "@/components/inspire-tab"
import { LoadingOverlay } from "@/components/loading-overlay"
import { ResultView, StoryCardData } from "@/components/result-view"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"

const MOCK_IDEAS = [
  "基于AI的猫咪语翻译器 SaaS",
  "银发族回忆录自动生成工具",
  "跨境电商选品雷达 App"
]

export default function Home() {
  const [idea, setIdea] = useState("")
  const [track, setTrack] = useState<string[]>([])
  const [role, setRole] = useState<string[]>([])
  const [asset, setAsset] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingType, setLoadingType] = useState<"generate" | "expand">("generate")
  const [isInspiring, setIsInspiring] = useState(false)
  const [activeTab, setActiveTab] = useState("inspire")
  const [result, setResult] = useState<StoryCardData | null>(null)
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const handleGenerate = useCallback(async () => {
    if (!idea.trim()) return

    setLoadingType("generate")
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.error || "Failed to generate idea"
        const errorDetail = data.details ? ` (${data.details})` : ""
        throw new Error(`${errorMsg}${errorDetail}`)
      }

      setResult(data)
    } catch (error: any) {
      console.error('Generation Error:', error)
      toast({
        title: "生成失败",
        description: error.message || "请稍后再试或检查网络连接",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }, [idea, toast])

  const handleInspire = useCallback(async () => {
    setIsInspiring(true)
    setGeneratedIdeas([])
    
    try {
      const response = await fetch("/api/inspire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track, role, asset }),
      })

      if (!response.ok) {
        throw new Error("Failed to inspire ideas")
      }

      const data = await response.json()
      setGeneratedIdeas(data)
    } catch (error) {
      console.error(error)
      toast({
        title: "获取灵感失败",
        description: "请稍后再试或检查网络连接",
        variant: "destructive",
      })
    } finally {
      setIsInspiring(false)
    }
  }, [track, role, asset, toast])

  const handleIdeaClick = useCallback(async (selectedIdea: string) => {
    setActiveTab("validate")
    setLoadingType("expand")
    setIsLoading(true) // 借用生成状态的 UI 表现
    
    try {
      const response = await fetch("/api/expand-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: selectedIdea }),
      })

      if (!response.ok) {
        throw new Error("无法扩展灵感内容")
      }

      const data = await response.json()
      setIdea(data.expanded)
    } catch (error) {
      console.error(error)
      // 如果扩展失败，退而求其次只填充简短文字
      setIdea(selectedIdea)
      toast({
        title: "灵感填充提示",
        description: "由于网络原因，未能生成完整商业模板，已填充简短内容",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleReset = useCallback(() => {
    setResult(null)
    setIdea("")
    setGeneratedIdeas([])
  }, [])

  const isValidateDisabled = idea.trim().length === 0
  const isInspireDisabled = track.length === 0 || role.length === 0 || asset.length === 0

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col px-5 pb-6 pt-2">
        {result ? (
          <ResultView data={result} onReset={handleReset} />
        ) : (
          <>
            {/* Tab Section */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-1 flex-col"
            >
              <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl bg-secondary p-1">
                <TabsTrigger
                  value="inspire"
                  className="flex items-center gap-1.5 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <Compass className="h-3.5 w-3.5" />
                  寻找灵感
                </TabsTrigger>
                <TabsTrigger
                  value="validate"
                  className="flex items-center gap-1.5 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  验证想法
                </TabsTrigger>
              </TabsList>

              <TabsContent value="validate" className="mt-4 flex-1">
                <ValidateTab idea={idea} onIdeaChange={setIdea} />
              </TabsContent>

              <TabsContent value="inspire" className="mt-4 flex-1 flex flex-col">
                <InspireTab
                  track={track}
                  role={role}
                  asset={asset}
                  onTrackChange={setTrack}
                  onRoleChange={setRole}
                  onAssetChange={setAsset}
                />
                
                {/* Generated Ideas Section */}
                {generatedIdeas.length > 0 && (
                  <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-xs font-medium text-muted-foreground ml-1">
                      为你生成的灵感 (点击即可验证):
                    </p>
                    <div className="grid gap-2">
                      {generatedIdeas.map((item, index) => (
                        <Card 
                          key={index}
                          onClick={() => handleIdeaClick(item)}
                          className="p-3 text-sm cursor-pointer hover:border-red-500/50 hover:bg-red-50/50 transition-colors active:scale-[0.99]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-muted-foreground">
                              {index + 1}
                            </span>
                            {item}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action Area */}
            <div className="mt-6 flex flex-col gap-3">
              {activeTab === "validate" ? (
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isValidateDisabled || isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-red-500/20 transition-all hover:shadow-xl hover:shadow-red-500/30 active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
                >
                  立即生成商业闭环
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleInspire}
                  disabled={isInspireDisabled || isInspiring}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
                >
                  {isInspiring ? (
                    "AI 正在头脑风暴..."
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      🔮 摇出3个金点子
                    </>
                  )}
                </button>
              )}

              <p className="text-center text-[11px] text-muted-foreground/70">
                每日免费剩余次数: 3 | Pangu Innovation OS
              </p>
            </div>
          </>
        )}
      </main>

      <LoadingOverlay 
        isVisible={isLoading} 
        isDone={!!result || (loadingType === "expand" && !!idea)} 
        onComplete={handleLoadingComplete}
        customMessages={loadingType === "expand" ? ["正在分析灵感...", "正在生成想法...", "正在构建商业雏形..."] : undefined}
      />

      {/* Footer Section */}
      <footer className="mt-auto py-8 px-5 border-t border-border/40 bg-muted/5">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] text-muted-foreground/50 tracking-wider">
            黑客松故事卡来源于《创新者的第一桶金》
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] font-medium text-muted-foreground/80 hover:text-red-500 transition-colors flex items-center gap-1 underline underline-offset-4 decoration-muted-foreground/20"
          >
            👨‍💻 作者公众号 / 反馈建议
          </button>
        </div>
      </footer>

      {/* QR Code Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative mx-5 w-full max-w-[280px] overflow-hidden rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-secondary/50 p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                <img 
                  src="/assets/qr_code.jpg" 
                  alt="QR Code" 
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-center text-xs font-medium text-muted-foreground">
                长按或扫码关注公众号
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
