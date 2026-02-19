"use client"

import { motion } from "framer-motion"

export function Logo() {
  return (
    <div className="flex items-center gap-3 group">
      <motion.div
        className="relative w-12 h-12 flex items-center justify-center"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <img
          src="/logo.svg"
          alt="Aurvox Solutions"
          width={48}
          height={48}
          className="w-12 h-12 object-contain dark:invert"
        />
      </motion.div>

      <div className="flex flex-col">
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight leading-none group-hover:text-primary transition-colors duration-300">
          Aurvox
        </h1>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.4em] mt-0.5 group-hover:text-accent transition-colors duration-300">
          Solutions
        </span>
      </div>
    </div>
  )
}
