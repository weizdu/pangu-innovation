"use client"

import { Zap } from "lucide-react"

interface ValidateTabProps {
  idea: string
  onIdeaChange: (value: string) => void
}

export function ValidateTab({ idea, onIdeaChange }: ValidateTabProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <textarea
          value={idea}
          onChange={(e) => onIdeaChange(e.target.value)}
          placeholder={"\u8F93\u5165\u4F60\u7591\u72C2\u7684\u60F3\u6CD5... (\u4F8B\u5982: \u60F3\u505A\u4E00\u4E2A\u7ED9\u72D7\u7528\u7684\u76F8\u4EB2App)"}
          className="min-h-[180px] w-full resize-none rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          maxLength={500}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/50">
          {idea.length}/500
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
        <Zap className="h-3.5 w-3.5 text-accent" />
        <span className="text-xs text-muted-foreground">
          {"AI \u6B63\u5728\u5F85\u547D..."}
        </span>
      </div>
    </div>
  )
}
