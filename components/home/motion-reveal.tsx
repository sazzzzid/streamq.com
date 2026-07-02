"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface MotionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

export function MotionReveal({ children, className, delay = 0, id }: MotionRevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
