"use client"

import * as React from "react"
import { Check, ChevronsUpDown, ChevronRight, Search, PenLine, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CategoryGroup {
  label: string
  children: string[]
}

interface ComboboxSelectProps {
  value: string | string[]
  onValueChange: (value: any) => void
  categories: CategoryGroup[]
  placeholder: string
  multiple?: boolean
}

export function ComboboxSelect({
  value,
  onValueChange,
  categories,
  placeholder,
  multiple = false,
}: ComboboxSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set())
  const [isCustomMode, setIsCustomMode] = React.useState(false)
  const [customInput, setCustomInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const customInputRef = React.useRef<HTMLInputElement>(null)

  // Focus search input when popover opens
  React.useEffect(() => {
    if (open && !isCustomMode) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open, isCustomMode])

  React.useEffect(() => {
    if (isCustomMode) {
      setTimeout(() => customInputRef.current?.focus(), 0)
    }
  }, [isCustomMode])

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  // Filter categories based on search
  const filteredCategories = React.useMemo(() => {
    if (!search.trim()) return categories
    const lowerSearch = search.toLowerCase()
    return categories
      .map((cat) => {
        const catMatch = cat.label.toLowerCase().includes(lowerSearch)
        const matchingChildren = cat.children.filter((c) =>
          c.toLowerCase().includes(lowerSearch)
        )
        if (catMatch) return cat
        if (matchingChildren.length > 0) return { ...cat, children: matchingChildren }
        return null
      })
      .filter(Boolean) as CategoryGroup[]
  }, [categories, search])

  // Auto-expand categories that have matching search results
  React.useEffect(() => {
    if (search.trim()) {
      const toExpand = new Set<string>()
      filteredCategories.forEach((cat) => toExpand.add(cat.label))
      setExpandedCategories(toExpand)
    }
  }, [search, filteredCategories])

  const handleSelect = (item: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : []
      const next = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item]
      onValueChange(next)
    } else {
      onValueChange(item)
      setOpen(false)
      setSearch("")
      setIsCustomMode(false)
    }
  }

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      if (multiple) {
        const current = Array.isArray(value) ? value : []
        onValueChange([...current, customInput.trim()])
        setCustomInput("")
        setIsCustomMode(false)
      } else {
        onValueChange(customInput.trim())
        setOpen(false)
        setSearch("")
        setCustomInput("")
        setIsCustomMode(false)
      }
    }
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setSearch("")
      setIsCustomMode(false)
      setCustomInput("")
    }
  }

  const totalItems = categories.reduce((sum, c) => sum + c.children.length, 0)

  const displayValue = React.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return ""
      return value.join(", ")
    }
    return value as string
  }, [value, multiple])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex min-h-[44px] w-full items-center justify-between rounded-xl border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:bg-secondary/50 cursor-pointer",
            ((multiple && Array.isArray(value) && value.length === 0) || (!multiple && !value)) && "text-muted-foreground"
          )}
        >
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {multiple && Array.isArray(value) && value.length > 0 ? (
              value.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 rounded-md bg-secondary/80 px-1.5 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  <span className="truncate max-w-[120px]">{item}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelect(item)
                    }}
                    className="rounded-sm opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="truncate">{displayValue || placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-40" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        sideOffset={6}
      >
        <div className="flex flex-col">
          {isCustomMode ? (
            <div className="flex flex-col gap-2 p-3">
              <p className="text-xs font-medium text-muted-foreground">
                {"\u8F93\u5165\u81EA\u5B9A\u4E49\u5185\u5BB9"}
              </p>
              <div className="flex gap-2">
                <input
                  ref={customInputRef}
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCustomSubmit()
                    if (e.key === "Escape") {
                      setIsCustomMode(false)
                      setCustomInput("")
                    }
                  }}
                  placeholder={"\u8F93\u5165\u5E76\u6309 Enter \u786E\u8BA4..."}
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={handleCustomSubmit}
                  disabled={!customInput.trim()}
                  className="rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition-opacity disabled:opacity-30"
                >
                  {"\u786E\u8BA4"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCustomMode(false)
                  setCustomInput("")
                }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {"\u2190 \u8FD4\u56DE\u5217\u8868"}
              </button>
            </div>
          ) : (
            <>
              {/* Search */}
              <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`\u641C\u7D22 ${totalItems} \u4E2A\u9009\u9879...`}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              {/* Custom input entry */}
              <button
                type="button"
                onClick={() => setIsCustomMode(true)}
                className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
              >
                <PenLine className="h-3 w-3" />
                {"\u627E\u4E0D\u5230\uFF1F\u81EA\u5B9A\u4E49\u8F93\u5165"}
              </button>

              {/* Category list */}
              <div className="max-h-[280px] overflow-y-auto p-1">
                {filteredCategories.length === 0 ? (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    {"\u65E0\u5339\u914D\u7ED3\u679C"}
                  </div>
                ) : (
                  filteredCategories.map((cat) => {
                    const isExpanded = expandedCategories.has(cat.label)
                    return (
                      <div key={cat.label}>
                        <button
                          type="button"
                          onClick={() => toggleCategory(cat.label)}
                          className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
                        >
                          <ChevronRight
                            className={cn(
                              "h-3 w-3 shrink-0 transition-transform",
                              isExpanded && "rotate-90"
                            )}
                          />
                          <span>{cat.label}</span>
                          <span className="ml-auto text-[10px] opacity-50">
                            {cat.children.length}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="ml-3 flex flex-col">
                            {cat.children.map((item) => {
                              const isSelected = multiple
                                ? Array.isArray(value) && value.includes(item)
                                : value === item
                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => handleSelect(item)}
                                  className={cn(
                                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-secondary/70",
                                    isSelected && "bg-secondary font-medium"
                                  )}
                                >
                                  <Check
                                    className={cn(
                                      "h-3 w-3 shrink-0",
                                      isSelected ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <span className="truncate">{item}</span>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
