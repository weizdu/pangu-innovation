"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const LOADING_MESSAGES = [
  "\u6B63\u5728\u62C6\u89E3\u8D5B\u9053...",
  "\u6B63\u5728\u63A8\u6F14\u4F30\u503C...",
  "\u6B63\u5728\u7ED8\u5236\u5546\u4E1A\u95ED\u73AF...",
]

interface LoadingOverlayProps {
  isVisible: boolean
  isDone?: boolean
  onComplete: () => void
  customMessages?: string[]
}

export function LoadingOverlay({ isVisible, isDone = false, onComplete, customMessages }: LoadingOverlayProps) {
  const messages = customMessages || LOADING_MESSAGES
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setMessageIndex(0)
      setProgress(0)
      return
    }

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 1800)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // If already at 100, do nothing (waiting for onComplete timeout)
        if (prev >= 100) return 100

        // If not done yet, cap progress at 92%
        if (!isDone && prev >= 92) {
          // Slow crawl from 92% to 98% while waiting
          return Math.min(prev + 0.1, 98)
        }

        // If done, speed up to 100
        if (isDone) {
          const next = prev + 5
          if (next >= 100) {
            clearInterval(progressInterval)
            clearInterval(messageInterval)
            setTimeout(onComplete, 500)
            return 100
          }
          return next
        }

        // Normal progress
        return prev + 1.2
      })
    }, 60)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [isVisible, isDone, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md transition-all">
      <div className="flex flex-col items-center gap-8 px-6">
        {/* Animated spinner */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-20 w-20 rounded-full bg-accent/10 animate-pulse-ring" />
          <div className="absolute h-16 w-16 rounded-full bg-accent/5 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600">
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          </div>
        </div>

        {/* Rotating message */}
        <div className="flex flex-col items-center gap-3">
          <p
            key={messageIndex}
            className="animate-in fade-in slide-in-from-bottom-2 text-base font-medium text-foreground"
            style={{ animationDuration: '400ms' }}
          >
            {messages[messageIndex]}
          </p>
          <p className="text-xs text-muted-foreground">
            Pangu AI Engine v3.0
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-56">
          <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-150 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-center text-xs tabular-nums text-muted-foreground">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>
      </div>
    </div>
  )
}
