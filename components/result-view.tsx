"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, AlertTriangle, TrendingUp, Target, Download, Loader2, Camera } from "lucide-react"
import { useState, useRef } from "react"
import html2canvas from "html2canvas"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export interface StoryCardData {
  header: {
    project_name: string
    slogan: string
  }
  positioning: {
    track: string
    model: string
  }
  reason: {
    pain: string
    trend: string
    usp: string
  }
  loop: {
    desc: string
    steps: string[]
    type: string
  }
  saas_hook: {
    score: string
    valuation: string
    risks: string[]
  }
}

interface ResultViewProps {
  data: StoryCardData
  onReset: () => void
}

export function ResultView({ data, onReset }: ResultViewProps) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)

  const score = data.saas_hook.score?.toUpperCase() || 'B'
  
  // 动态主题配置
  const themes = {
    S: {
      gradient: "from-red-600 to-orange-500",
      border: "border-l-red-500",
      icon: "text-red-500",
      bgLight: "bg-red-100",
      textPrimary: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
      riskText: "text-red-600",
      riskBadge: "text-red-700 border-red-200 bg-red-50"
    },
    A: {
      gradient: "from-blue-600 to-cyan-500",
      border: "border-l-blue-500",
      icon: "text-blue-500",
      bgLight: "bg-blue-100",
      textPrimary: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      riskText: "text-blue-600",
      riskBadge: "text-blue-700 border-blue-200 bg-blue-50"
    },
    B: {
      gradient: "from-green-600 to-emerald-500",
      border: "border-l-green-500",
      icon: "text-green-500",
      bgLight: "bg-green-100",
      textPrimary: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      riskText: "text-green-600",
      riskBadge: "text-green-700 border-green-200 bg-green-50"
    },
    C: {
      gradient: "from-amber-500 to-yellow-400",
      border: "border-l-amber-500",
      icon: "text-amber-500",
      bgLight: "bg-amber-100",
      textPrimary: "text-amber-600",
      button: "bg-amber-500 hover:bg-amber-600",
      riskText: "text-amber-600",
      riskBadge: "text-amber-700 border-amber-200 bg-amber-50"
    },
    X: {
      gradient: "from-zinc-800 to-zinc-500",
      border: "border-l-zinc-700",
      icon: "text-zinc-600",
      bgLight: "bg-zinc-100",
      textPrimary: "text-zinc-800",
      button: "bg-zinc-800 hover:bg-zinc-900",
      riskText: "text-zinc-600",
      riskBadge: "text-zinc-700 border-zinc-200 bg-zinc-50"
    }
  }

  const theme = themes[score as keyof typeof themes] || themes.B

  // 根据文字长度动态调整估值字号
  const getValuationFontSize = (text: string) => {
    const len = text.length
    if (len <= 6) return "text-4xl"
    if (len <= 10) return "text-3xl"
    if (len <= 15) return "text-2xl"
    return "text-xl"
  }

  const getBadgeSizeClass = (text: string) => {
    const len = text.length
    if (len <= 6) return "w-9 h-9"
    if (len <= 10) return "w-[30px] h-[30px]"
    if (len <= 15) return "w-6 h-6"
    return "w-5 h-5"
  }

  const handleGeneratePoster = async () => {
    const element = document.getElementById('poster-card');
    if (!element) return;
    
    try {
      setIsGenerating(true);
      
      // 给一点点延迟确保渲染完成
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(element, {
        scale: 2, // 提高清晰度
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (document) => {
          const clonedElement = document.getElementById('poster-card');
          if (clonedElement) {
            clonedElement.style.borderRadius = '0';
            clonedElement.style.boxShadow = 'none';
            
            // 禁用所有动画，防止截图时文字处于淡入状态
            const animatedElements = clonedElement.querySelectorAll('.animate-in');
            animatedElements.forEach((el) => {
              (el as HTMLElement).style.animation = 'none';
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'none';
            });
          }
        }
      });
      
      const image = canvas.toDataURL("image/png");
      setPosterUrl(image);

      // 自动触发下载
      const link = document.createElement('a');
      link.href = image;
      link.download = `${data.header.project_name}-pangu-poster.png`;
      link.click();

    } catch (error) {
      console.error("Failed to capture page:", error);
      toast({
        title: "照片生成失败",
        description: "浏览器不支持页面截图功能",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!posterUrl) return
    const link = document.createElement("a")
    link.href = posterUrl
    link.download = `${data.header.project_name}-商业闭环海报.png`
    link.click()
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Action Buttons at Top */}
      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className={`flex-1 gap-2 rounded-xl ${theme.button}`} 
              onClick={handleGeneratePoster}
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              分享结果照片
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-[450px] p-0 overflow-hidden bg-zinc-950/90 border-zinc-800">
            <DialogHeader className="p-4 border-b border-zinc-800">
              <DialogTitle className="text-sm font-medium text-zinc-400">长按图片保存或分享</DialogTitle>
            </DialogHeader>
            <div className="p-4 flex flex-col items-center gap-4">
              {posterUrl ? (
                <>
                  <div className="relative w-full overflow-y-auto max-h-[70vh] rounded-lg shadow-2xl ring-1 ring-white/10">
                    <img src={posterUrl} alt="Captured Page" className="w-full h-auto" />
                  </div>
                  <Button onClick={handleDownload} className={`w-full gap-2 rounded-xl h-12 text-base font-semibold ${theme.button}`}>
                    <Download className="w-5 h-5" />
                    保存到相册
                  </Button>
                </>
              ) : (
                <div className="aspect-[3/4] w-full bg-zinc-900 flex flex-col items-center justify-center rounded-lg gap-3">
                  <Loader2 className={`w-8 h-8 animate-spin ${theme.icon}`} />
                  <p className="text-xs text-zinc-500">正在生成高清照片...</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div 
        ref={captureRef} 
        id="poster-card" 
        className="w-full max-w-[375px] mx-auto bg-[#fdfaf1] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col border border-amber-100/50"
        style={{ 
          backgroundImage: 'radial-gradient(#e5e7eb 0.5px, transparent 0.5px)', 
          backgroundSize: '10px 10px' 
        }}
      >
        {/* Header Section */}
        <div className="relative pt-12 pb-6 px-6 text-center space-y-4">
          <div className="space-y-1">
            <h1 className={`text-2xl font-black tracking-tight ${theme.textPrimary}`}>
              {data.header.project_name}
            </h1>
            <p className="text-sm font-medium text-amber-900/60 italic leading-relaxed">
              "{data.header.slogan}"
            </p>
          </div>

          {/* Valuation & Score Area */}
          <div className="relative py-2 flex flex-col items-center justify-center">
            {/* Stamp Image (Score) */}
            <div className="relative w-40 h-40 flex items-center justify-center pointer-events-none opacity-90">
              <img 
                src={`/assets/rank_${score}.png`} 
                alt={`Rank ${score}`}
                className="w-full h-full object-contain mix-blend-multiply"
                style={{ transform: 'rotate(-10deg)' }}
              />
            </div>

            {/* Valuation Section */}
             <div className="relative flex items-center justify-center w-full mt-2 pb-4 px-6">
               {/* Centered Text Container - Conditional width based on badge presence */}
               <div className={`relative flex flex-col items-center justify-center text-center ${
                 (score === 'S' || score === 'A' || score === 'X') ? 'max-w-[160px]' : 'max-w-[280px]'
               }`}>
                 {/* Large Badge - Absolutely positioned to the LEFT of the text container */}
                 {(score === 'S' || score === 'A' || score === 'X') && (
                   <div className="absolute right-[calc(100%+1rem)] top-1/2 -translate-y-1/2">
                     <img 
                       src={score === 'X' ? "/assets/badge_clown.png" : "/assets/badge_valuation.png"} 
                       alt="Badge"
                       className="w-20 h-20 object-contain drop-shadow-md max-w-none"
                     />
                   </div>
                 )}

                 <p className="text-sm font-black text-amber-900/50 tracking-[0.2em] uppercase mb-0.5">
                   第一桶金估值
                 </p>
                 <div className={`${getValuationFontSize(data.saas_hook.valuation)} font-black ${theme.textPrimary} tracking-tighter leading-tight drop-shadow-sm break-words`}>
                   {data.saas_hook.valuation}
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="flex-1 px-6 pb-8 space-y-8">
          {/* Core Metrics (Sector, Model, Pain, USP) - Unified Style */}
          <div className="space-y-3">
            <div className="bg-white/40 rounded-xl p-4 border border-white/60 space-y-4">
              {/* Sector */}
              <div className="flex items-start gap-3">
                <Target className={`w-5 h-5 mt-0.5 ${theme.icon}`} />
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-amber-900/40 uppercase tracking-wider mb-1">商业赛道</p>
                  <p className="text-sm text-amber-950/80 leading-relaxed font-medium">{data.positioning.track}</p>
                </div>
              </div>
              <Separator className="bg-amber-200/30" />
              {/* Model */}
              <div className="flex items-start gap-3">
                <TrendingUp className={`w-5 h-5 mt-0.5 ${theme.icon}`} />
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-amber-900/40 uppercase tracking-wider mb-1">商业模式</p>
                  <p className="text-sm text-amber-950/80 leading-relaxed font-medium">{data.positioning.model}</p>
                </div>
              </div>
              <Separator className="bg-amber-200/30" />
              {/* Pain Points */}
              <div className="flex items-start gap-3">
                <span className="text-xl leading-none">⚡️</span>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-amber-900/40 uppercase tracking-wider mb-1">核心痛点</p>
                  <p className="text-sm text-amber-950/80 leading-relaxed font-medium">{data.reason.pain}</p>
                </div>
              </div>
              <Separator className="bg-amber-200/30" />
              {/* USP */}
              <div className="flex items-start gap-3">
                <span className="text-xl leading-none">💎</span>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-amber-900/40 uppercase tracking-wider mb-1">核心卖点</p>
                  <p className="text-sm text-amber-950/80 leading-relaxed font-medium">{data.reason.usp}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Loop (Vertical Timeline) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-amber-900/40 uppercase tracking-widest text-center flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-amber-900/10"></span>
              业务闭环
              <span className="h-px w-8 bg-amber-900/10"></span>
            </h3>
            
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-900/10">
              {data.loop.steps.map((step, index) => (
                <div key={index} className="relative flex items-start pl-8 animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Timeline Circle with SVG for guaranteed centering in screenshots */}
                  <div className="absolute left-0 top-0 mt-1 z-10">
                    <svg width="22" height="22" viewBox="0 0 22 22">
                      <circle cx="11" cy="11" r="10" fill={theme.bgLight.includes('blue') ? '#DBEAFE' : '#FEF3C7'} />
                      <text 
                        x="11" 
                        y="11" 
                        fill={theme.textPrimary.includes('blue') ? '#2563EB' : '#92400E'}
                        fontSize="12"
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{ fontFamily: 'sans-serif' }}
                      >
                        {index + 1}
                      </text>
                    </svg>
                  </div>
                  <div className="flex-1 bg-white/40 rounded-lg p-2.5 border border-white/60">
                    <p className="text-xs text-amber-950/70 font-medium leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section (Risks) */}
        <div className={`mt-auto p-6 space-y-3 ${score === 'X' ? 'bg-red-50' : 'bg-red-50/80'} border-t border-red-100/50`}>
          <div className="flex items-center gap-2">
            <img src="/assets/icon_risk_lock.png" alt="Risk" className="w-5 h-5 object-contain" />
            <h3 className={`text-xs font-bold uppercase tracking-widest ${score === 'X' ? 'text-red-600' : 'text-red-500/80'}`}>
              潜在风险
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.saas_hook.risks.map((risk, index) => (
              <span 
                key={index} 
                className={`flex items-center justify-center text-[11px] px-2 py-1.5 rounded-md font-medium border leading-none ${
                  score === 'X' 
                    ? 'bg-red-100/50 border-red-200 text-red-600' 
                    : 'bg-white/60 border-red-100 text-red-500/70'
                }`}
              >
                <span className="pb-[2px]">{risk}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full rounded-xl bg-secondary py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
      >
        生成下一个创意
      </button>
    </div>
  )
}
