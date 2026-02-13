import { StoryCardData } from "@/components/result-view"

const CANVAS_WIDTH = 750
const CANVAS_HEIGHT = 1334

// 辅助函数：加载图片
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

/**
 * 实现类似 Object-Fit: Cover 的背景绘制
 */
const drawImageCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  const imgRatio = img.width / img.height
  const canvasRatio = w / h
  let sx, sy, sw, sh

  if (imgRatio > canvasRatio) {
    // 图片太宽，裁剪左右
    sw = img.height * canvasRatio
    sh = img.height
    sx = (img.width - sw) / 2
    sy = 0
  } else {
    // 图片太高，裁剪上下
    sw = img.width
    sh = img.width / canvasRatio
    sx = 0
    sy = (img.height - sh) / 2
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
}

/**
 * 保持比例绘制图片
 */
const drawImageWithAspectRatio = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  targetWidth: number,
  targetHeight?: number
): { width: number; height: number } => {
  const width = targetWidth
  const height = targetHeight || (targetWidth * (img.naturalHeight / img.naturalWidth))
  ctx.drawImage(img, x, y, width, height)
  return { width, height }
}

/**
 * 辅助函数：文字换行绘制
 */
const drawWrappedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 3
) => {
  const words = text.split("")
  let line = ""
  const lines = []

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n]
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      lines.push(line)
      line = words[n]
    } else {
      line = testLine
    }
  }
  lines.push(line)

  const finalLines = lines.slice(0, maxLines)
  finalLines.forEach((l, i) => {
    const offset = (i - (finalLines.length - 1) / 2) * lineHeight
    ctx.fillText(l, x, y + offset)
  })
}

export const generatePoster = async (data: StoryCardData): Promise<string> => {
  const canvas = document.createElement("canvas")
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  const ctx = canvas.getContext("2d")

  if (!ctx) throw new Error("Canvas context not found")

  // --- 1. 背景层 ---
  const bg = await loadImage("/assets/bg_paper.png")
  drawImageCover(ctx, bg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // --- 2. 核心元素绘制 (启用 Multiply 模式) ---

  // 2.1 视觉核心 (Flywheel)
  const flywheel = await loadImage("/assets/template_flywheel.svg")
  const flywheelSize = 600
  const flywheelX = (CANVAS_WIDTH - flywheelSize) / 2
  const flywheelY = 750 - (flywheelSize / 2)

  ctx.save()
  ctx.globalCompositeOperation = 'multiply'
  drawImageWithAspectRatio(ctx, flywheel, flywheelX, flywheelY, flywheelSize, flywheelSize)
  ctx.restore()

  // 2.Dynamic Stamp (根据评分选择印章)
  const score = data.saas_hook.score?.toUpperCase() || 'B';
  let stampSrc = '/assets/rank_S.png'; 
  if (score === 'A') stampSrc = '/assets/rank_A.png';
  if (score === 'B') stampSrc = '/assets/rank_B.png';
  if (score === 'C') stampSrc = '/assets/rank_C.png'; // 添加 C 级印章支持
  if (score === 'X') stampSrc = '/assets/rank_X.png';
  
  const stamp = await loadImage(stampSrc)
  const stampSize = 160
  const stampX = 610 // 向右移动一点，避免碰到左边内容（UI上是向右移动避免碰到边框）
  const stampY = 50

  ctx.save()
  ctx.globalCompositeOperation = 'multiply'
  ctx.translate(stampX + stampSize / 2, stampY + stampSize / 2)
  ctx.rotate((-15 * Math.PI) / 180) // 改为负 15 度，与 UI 保持一致
  ctx.drawImage(stamp, -stampSize / 2, -stampSize / 2, stampSize, stampSize)
  ctx.restore()

  // 2.3 底部风险锁定
  const riskLock = await loadImage("/assets/icon_risk_lock.png")
  const lockHeight = 60
  const lockY = 1150
  
  ctx.save()
  ctx.globalCompositeOperation = 'multiply'
  ctx.font = "24px serif, 'STSong', 'SimSun', sans-serif"
  const riskText = "风险锁定：" + data.saas_hook.risks.join(" | ")
  const textWidth = ctx.measureText(riskText).width
  const iconWidth = (lockHeight * (riskLock.naturalWidth / riskLock.naturalHeight))
  const totalWidth = iconWidth + 10 + textWidth
  const startX = (CANVAS_WIDTH - totalWidth) / 2
  
  ctx.drawImage(riskLock, startX, lockY, iconWidth, lockHeight)
  ctx.restore()
  
  ctx.fillStyle = "#666666"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText(riskText, startX + iconWidth + 10, lockY + lockHeight / 2)

  // --- 3. 动态文字层 ---
  
  // 获取主题颜色映射
  const themeColors = {
    S: '#dc2626', // red-600
    A: '#2563eb', // blue-600
    B: '#16a34a', // green-600
    C: '#d97706', // amber-600
    X: '#27272a'  // zinc-800
  }
  const currentThemeColor = themeColors[score as keyof typeof themeColors] || themeColors.B

  // 3.1 项目标题 (左侧)
  ctx.textAlign = "left"
  ctx.textBaseline = "top"
  ctx.fillStyle = currentThemeColor // 使用主题色
  ctx.font = "bold 56px serif, 'STSong', 'SimSun', sans-serif"
  // 使用包装函数防止标题过长撞上徽章
  drawWrappedText(ctx, data.header.project_name, 50, 60, 500, 65, 2)

  // 3.2 Slogan
  ctx.fillStyle = "#666666"
  ctx.font = "28px serif, 'STSong', 'SimSun', sans-serif"
  drawWrappedText(ctx, data.header.slogan, 50, 140, 500, 36, 3)

  // 3.3 徽章 (右侧) - 仅 S, A, X 级显示，B 和 C 级不显示徽章
  if (score === 'S' || score === 'A' || score === 'X') {
    let badgeSrc = "/assets/badge_valuation.png"
    if (score === 'X') {
      badgeSrc = "/assets/badge_clown.png"
    }
    const badge = await loadImage(badgeSrc)
    const badgeSize = 220 // 增大尺寸
    const badgeX = CANVAS_WIDTH - badgeSize + 40 // 允许超出右边界一部分
    const badgeY = -40 // 允许超出顶边界一部分
    drawImageWithAspectRatio(ctx, badge, badgeX, badgeY, badgeSize, badgeSize)
  }
  
  // 3.4 闭环文字
  const centerX = CANVAS_WIDTH / 2
  const centerY = 750
  const radius = 300 + 35

  // 3.5 估值文字 (右侧) - 仿照 UI 布局
  ctx.save()
  ctx.textAlign = "right"
  ctx.textBaseline = "top"
  
  // 绘制 "第一桶金估值" 小字
  ctx.fillStyle = "#666666"
  ctx.font = "bold 24px serif, 'STSong', 'SimSun', sans-serif"
  ctx.fillText("第一桶金估值", CANVAS_WIDTH - 50, 60)
  
  // 绘制具体的估值数字/文字 - 支持换行，根据长度动态调整字号
  const valuation = data.saas_hook.valuation
  let valuationFontSize = 48
  let valuationLineHeight = 55
  if (valuation.length > 15) {
    valuationFontSize = 32
    valuationLineHeight = 38
  } else if (valuation.length > 10) {
    valuationFontSize = 40
    valuationLineHeight = 46
  }

  ctx.fillStyle = currentThemeColor // 使用主题色
  ctx.font = `900 ${valuationFontSize}px serif, 'STSong', 'SimSun', sans-serif`
  // 限制宽度为 320px，防止撞上左侧的印章
  drawWrappedText(ctx, valuation, CANVAS_WIDTH - 50, 100, 320, valuationLineHeight, 3)
  ctx.restore()

  const angles = [
    -Math.PI / 2,
    -Math.PI / 2 + (Math.PI * 2 / 5),
    -Math.PI / 2 + (Math.PI * 2 / 5 * 2),
    -Math.PI / 2 + (Math.PI * 2 / 5 * 3),
    -Math.PI / 2 + (Math.PI * 2 / 5 * 4),
  ]

  ctx.font = "24px serif, 'STSong', 'SimSun', cursive, sans-serif"
  ctx.fillStyle = "#2c2c2c"

  data.loop.steps.slice(0, 5).forEach((step, i) => {
    const angle = angles[i]
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius
    
    if (Math.abs(Math.cos(angle)) < 0.1) {
      ctx.textAlign = "center"
    } else if (Math.cos(angle) > 0) {
      ctx.textAlign = "left"
    } else {
      ctx.textAlign = "right"
    }
    drawWrappedText(ctx, step, x, y, 200, 32)
  })

  return canvas.toDataURL("image/png")
}
