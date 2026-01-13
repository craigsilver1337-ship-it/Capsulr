
// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Lock, Unlock, ArrowRight } from "lucide-react"
// Using native img tag instead of Next.js Image to avoid 500 errors
import { useRouter } from "next/navigation"
import Scene from "@/components/three/Scene"

const Hero = () => {
  const [showSecret, setShowSecret] = useState(false)
  const router = useRouter()

  const [animatedValues, setAnimatedValues] = useState({
    avgCost: 0,
    totalTransactions: 0,
    validatorNodes: 0
  })

  // Target values
  const targetValues = {
    avgCost: 0.002,
    totalTransactions: 3713,
    validatorNodes: 3603
  }

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeProgress = 1 - Math.pow(1 - progress, 3) // ease-out cubic

      setAnimatedValues({
        avgCost: targetValues.avgCost * easeProgress,
        totalTransactions: Math.floor(targetValues.totalTransactions * easeProgress),
        validatorNodes: Math.floor(targetValues.validatorNodes * easeProgress)
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedValues(targetValues) // Ensure exact final values
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
    }
  }

  // Animation variants for gradient overlays
  const gradientVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  // Animation variants for buttons
  const buttonVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }

  }
  // Background images positions - using pixel values to match screenshot layout
  const imagePositions = [
    { top: 50, left: 50, rotate: "-10deg", width: 400, height: 400 }, // Top-left: blurry oval
    { bottom: 100, right: 100, rotate: "15deg", width: 300, height: 500 }, // Bottom-right: large ring behind Carbon Neutral
    { top: 100, right: 100, rotate: "5deg", width: 300, height: 220 }  // Top-right: ring above Validator Nodes
  ]


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 md:pt-40 pb-20 bg-black group">
      {/* 3D Capsule Scene - Lifted Z-index to occlude text, pointer-events-none to allow clicking buttons underneath */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Scene />
      </div>

      {/* Animated Cyber Grid Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundPosition: ["0px 0px", "50px 50px"]
        }}
        transition={{
          opacity: { duration: 1.5, ease: "easeOut" },
          backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
        }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)'
        }}
      />

      {/* PDF: Atmospheric Live Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
      />
      {/* Background images */}
      {[
        "https://cdn.multiversx.com/webflow/Hero%20section%20background.webp",
        "https://cdn.multiversx.com/webflow/Home-Hero-Bg-03.webp",
        "https://cdn.multiversx.com/webflow/Glass%20shield%404-1080x1080%201.webp"
      ].map((src, index) => (
        <motion.div
          key={`${src}-${index}`}
          className="absolute z-[1] pointer-events-none"
          style={{
            ...(imagePositions[index].top !== undefined ? { top: `${imagePositions[index].top}px` } : {}),
            ...(imagePositions[index].left !== undefined ? { left: `${imagePositions[index].left}px` } : {}),
            ...(imagePositions[index].right !== undefined ? { right: `${imagePositions[index].right}px` } : {}),
            ...(imagePositions[index].bottom !== undefined ? { bottom: `${imagePositions[index].bottom}px` } : {}),
            transform: `rotate(${imagePositions[index].rotate})`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: index === 1 ? 0.8 : 0.5, scale: 1 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        >
          <img
            src={src}
            alt={`Hero Background ${index + 1}`}
            width={imagePositions[index].width}
            height={imagePositions[index].height}
            className="object-contain"
            style={{ flexShrink: 0, height: 'auto' }}
            onError={(e) => {
              // Silently handle image loading errors - hide the image
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 text-center relative max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk leading-tight mb-6 transition-all duration-700 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            Your Digital Legacy, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-300 animate-pulse duration-[3000ms]">
              Locked in Time
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-normal">
            The first ultra-fast time-lock protocol on Solana. Secure your messages, art,
            and alpha in immutable capsules.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto relative z-30"
        >

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 relative z-30">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <Button
                size="lg"
                className="bg-cyan-400 hover:bg-cyan-600 hover:text-white text-black font-semibold group transition-all duration-300" onClick={() => router.push("/create")}
              >
                Create Your Capsule
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/5 hover:text-white transition-all duration-300"
              >
                Explore Capsules
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Capsule Preview with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto z-30"
        >
          <div className="relative mx-auto w-full max-w-md aspect-[1/1.2] rounded-2xl p-1 group hover:scale-105 transition-transform duration-500">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-300/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity"
              animate={{
                opacity: [0.5, 0.7, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

            <div className="relative h-full w-full bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 flex flex-col">
              <div className="bg-transparent backdrop-blur-sm p-4 border-b border-cyan-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="h-3 w-3 rounded-full bg-cyan-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm text-gray-400">Capsule #42069</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Unlocks: 2026-12-31
                  </div>
                </div>
              </div>


              <div className="flex-1 p-6 flex flex-col items-center justify-center">
                {showSecret ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                  >
                    <Unlock className="h-10 w-10 mx-auto mb-4 text-cyan-400" />
                    <h3 className="text-xl font-medium mb-2">Message Revealed!</h3>
                    <p className="text-gray-300">
                      &quot; In 2025, ETH will reach $25,000 and transform global finance. &quot;
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                  >
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-cyan-400/30 blur-xl rounded-full" />
                      <Lock className="relative h-12 w-12 mx-auto text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Locked Message</h3>
                    <p className="text-gray-400">
                      Content is encrypted and will be revealed on unlock date
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="bg-transparent backdrop-blur-sm p-4 border-t border-cyan-500/10">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 opacity-50">Created by: 7n8z...4vR2</span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-black/20"
                      onClick={() => setShowSecret(!showSecret)}
                    >
                      Unlock
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            className="hidden xl:block absolute w-full max-w-xs group z-20"
            style={{ top: '80px', left: '40px' }}
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out overflow-hidden">
              {/* Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Average Cost
                </div>

                <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono">
                  ~${animatedValues.avgCost.toFixed(3)}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-300 rounded-full opacity-40" />
            </div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="hidden xl:block absolute w-full max-w-xs group z-20"
            style={{ top: '200px', left: '40px' }}
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out overflow-hidden">
              {/* Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
                  Total Capsules
                </div>
                <div className="text-gray-500 text-sm mb-4">
                  On our Chain
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono leading-tight">
                    {formatNumber(animatedValues.totalTransactions)}
                  </div>
                  <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-0.5 rounded-full w-fit">
                    +12.4% today
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-300 rounded-full opacity-40" />
            </div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="hidden xl:block absolute w-full max-w-xs group z-20"
            style={{ top: '80px', right: '40px' }}
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out overflow-hidden">
              {/* Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
                  Validator Nodes
                </div>
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono">
                  {formatNumber(animatedValues.validatorNodes)}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-60" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-300 rounded-full opacity-40" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden xl:block absolute group z-20"
            style={{ bottom: '80px', right: '40px' }}
          >
            <div className="relative group">
              <div className="relative bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl px-6 py-4 min-w-[280px] group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 ease-out overflow-hidden">
                {/* Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col gap-2 transition-transform duration-500 group-hover:translate-x-1">
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                    Efficient. Scalable. Global.
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="text-2xl font-bold text-green-400 whitespace-nowrap">
                      Carbon Neutral
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30 cursor-pointer hover:bg-green-500/30 transition-colors whitespace-nowrap"
                    >
                      Sustainability
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile/Tablet Stats Grid - Visible on screens smaller than XL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 w-full max-w-4xl mx-auto xl:hidden relative z-20">
          {/* Card 1: Average Cost */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 h-full group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out overflow-hidden">
              {/* Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Average Cost</div>
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono">~${animatedValues.avgCost.toFixed(3)}</div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Total Capsules */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 h-full group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out overflow-hidden">
              {/* Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Total Capsules</div>
                <div className="text-gray-500 text-sm mb-4">On our Chain</div>
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono leading-tight">{formatNumber(animatedValues.totalTransactions)}</div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Validator Nodes */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 h-full group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ease-out overflow-hidden">
              {/* Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">Validator Nodes</div>
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 font-mono">{formatNumber(animatedValues.validatorNodes)}</div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Carbon Neutral */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="group"
          >
            <div className="relative bg-black/40 backdrop-blur-md border border-green-500/30 rounded-2xl px-6 py-4 h-full flex flex-col justify-center group hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 ease-out overflow-hidden">
              {/* Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-linear pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col gap-2 transition-transform duration-500 group-hover:translate-x-1">
                <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Efficient. Scalable. Global.
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-2xl font-bold text-green-400 whitespace-nowrap">
                    Carbon Neutral
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30 cursor-pointer hover:bg-green-500/30 transition-colors whitespace-nowrap"
                  >
                    Sustainability
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
        <motion.span
          className="text-gray-400 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Scroll to explore
        </motion.span>
        <div className="w-6 h-9 border-2 border-cyan-500/30 rounded-full flex justify-center pt-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5
            }}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          />
        </div>
      </div>

      {/* Neon Separator Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] z-40 opacity-80" />
    </div>
  )
}

export default Hero
