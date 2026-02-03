"use client"

import dynamic from "next/dynamic"

const ScrollProgress = dynamic(
  () => import("@/components/motion/scroll-animations").then((mod) => mod.ScrollProgress),
  { ssr: false }
)

export function ScrollProgressClient() {
  return <ScrollProgress />
}
