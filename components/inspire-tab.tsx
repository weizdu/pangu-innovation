"use client"

import { Shuffle, Map, User, Briefcase } from "lucide-react"
import { ComboboxSelect } from "@/components/combobox-select"
import {
  TRACK_CATEGORIES,
  ROLE_CATEGORIES,
  ASSET_CATEGORIES,
  ALL_TRACKS,
  ALL_ROLES,
  ALL_ASSETS,
} from "@/lib/inspire-data"

interface InspireTabProps {
  track: string[]
  role: string[]
  asset: string[]
  onTrackChange: (value: string[]) => void
  onRoleChange: (value: string[]) => void
  onAssetChange: (value: string[]) => void
}

export function InspireTab({
  track,
  role,
  asset,
  onTrackChange,
  onRoleChange,
  onAssetChange,
}: InspireTabProps) {
  function handleRandomize() {
    onTrackChange([ALL_TRACKS[Math.floor(Math.random() * ALL_TRACKS.length)]])
    onRoleChange([ALL_ROLES[Math.floor(Math.random() * ALL_ROLES.length)]])
    onAssetChange([ALL_ASSETS[Math.floor(Math.random() * ALL_ASSETS.length)]])
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {/* Track */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Map className="h-3.5 w-3.5" />
            {"\u8D5B\u9053 (Track)"}
          </label>
          <ComboboxSelect
            value={track}
            onValueChange={(val) => onTrackChange(val as string[])}
            categories={TRACK_CATEGORIES}
            placeholder={"\u9009\u62E9\u6216\u8F93\u5165\u8D5B\u9053..."}
            multiple
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            {"\u8EAB\u4EFD (Role)"}
          </label>
          <ComboboxSelect
            value={role}
            onValueChange={(val) => onRoleChange(val as string[])}
            categories={ROLE_CATEGORIES}
            placeholder={"\u9009\u62E9\u6216\u8F93\u5165\u8EAB\u4EFD..."}
            multiple
          />
        </div>

        {/* Assets */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5" />
            {"\u8D44\u6E90 (Assets)"}
          </label>
          <ComboboxSelect
            value={asset}
            onValueChange={(val) => onAssetChange(val as string[])}
            categories={ASSET_CATEGORIES}
            placeholder={"\u9009\u62E9\u6216\u8F93\u5165\u8D44\u6E90..."}
            multiple
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleRandomize}
        className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
      >
        <Shuffle className="h-4 w-4 text-accent" />
        {"\u968F\u673A\u7EC4\u5408"}
      </button>
    </div>
  )
}
