export function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center">
          <img 
            src="/assets/pangu logo.png" 
            alt="Logo" 
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          {"\u76D8\u53E4\u521B\u65B0"}
        </h1>
      </div>
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-muted-foreground">AI Ready</span>
      </div>
    </header>
  )
}
