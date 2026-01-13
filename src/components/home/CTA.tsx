"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, X, Check, Loader2, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const CTA = () => {
  const router = useRouter()
  const [daysRemaining, setDaysRemaining] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Countdown Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2027-01-01T00:00:00")
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24))
      setDaysRemaining(days > 0 ? days : 0)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  // Parallax Effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for parallax
  const springConfig = { damping: 30, stiffness: 80 }
  const parallaxX = useSpring(useTransform(mouseX, [-500, 500], [40, -40]), springConfig)
  const parallaxY = useSpring(useTransform(mouseY, [-500, 500], [40, -40]), springConfig)

  // Card Tilt Effect
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  // Animation variants
  const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: appleEase,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: appleEase, duration: 0.8 }
    }
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 bg-black relative overflow-hidden perspective-1000"
    >
      {/* Neon Separator Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] z-20 opacity-80" />
      {/* Animated background with Parallax & Mask */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="flex justify-center items-center absolute inset-0 opacity-60 z-0"
      >
        <div className="relative w-full h-full">
          <Image
            src="/capsule2.gif"
            alt="Digital Legacy Background"
            fill
            className="object-contain"
            unoptimized
          />
          {/* Radial Gradient Mask */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle, transparent 20%, #000 90%)"
            }}
          />
        </div>
      </motion.div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 rounded-full filter blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 font-space-grotesk"
          >
            Your Digital Legacy{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-200">
              Starts Now
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Join thousands of users preserving memories, predictions, and digital assets
            for future revelation. Your story deserves to be told—even if that story
            is meant for tomorrow.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            {/* Start Creating Now - Shimmer Effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-md group"
            >
              <Button
                size="lg"
                onClick={() => router.push('/create')}
                className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:text-white hover:from-cyan-600 hover:to-cyan-700 px-8 py-6 text-lg w-full sm:w-auto overflow-hidden cursor-pointer"
              >
                <span className="relative z-10">Start Creating Now</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  animate={{
                    x: ['-150%', '150%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 3,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </Button>
            </motion.div>

            {/* Join Waitlist - Hover Glow & Icon Takeoff */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                className="group border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-950/30 px-8 py-6 text-lg w-full sm:w-auto relative transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  className="mr-2"
                  whileHover={{ y: -3, x: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.div>
                Join Waitlist
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Glassmorphism Card */}
          <motion.div
            variants={itemVariants}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative perspective-1000 group mx-auto max-w-2xl"
          >
            {/* Ambient Glow behind card */}
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden"
            >
              {/* Border Beam Effect */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-[50%] h-[200%] opacity-0 group-hover:opacity-100 animate-[spin_4s_linear_infinite] top-[-50%] left-[-50%] blur-sm" />
              </div>

              <div className="absolute inset-0 rounded-3xl border border-cyan-500/20" />
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-50" />

              <motion.p
                className="relative text-cyan-400 font-semibold mb-4 tracking-[0.2em] text-sm drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                COMING SOON
              </motion.p>

              <h3 className="relative text-2xl md:text-3xl font-bold mb-4 text-white">
                The Great Unlocking - New Year&apos;s 2027
              </h3>

              <p className="relative text-gray-300 leading-relaxed mb-8">
                Join our next major protocol milestone. On January 1st, 2027, the second generation of
                automated capsules will initiate a mass-unlock event across the Solana network.
              </p>

              <motion.div
                className="relative mt-4 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-black/40 border border-cyan-500/30 px-4 py-2 rounded-full backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-sm font-mono text-cyan-100">
                    {daysRemaining} days remaining
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

const WaitlistModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setTimeout(() => {
        onClose()
        setStatus("idle")
        setEmail("")
      }, 2000)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-all duration-300"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              className="w-full max-w-md pointer-events-auto"
            >
              {/* Glass Card */}
              <div className="relative bg-[#030712]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-cyan-900/20 overflow-hidden ring-1 ring-white/5">

                {/* Top Shine */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Ambient Glows */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

                <div className="mb-8 text-center relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.2)] mb-6 group">
                    <Mail className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3 font-space-grotesk tracking-tight">Join the Waitlist</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[90%] mx-auto">
                    Get exclusive early access to the next generation of time capsules. Secure your spot in history.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-0 h-12 rounded-lg backdrop-blur-xl transition-all duration-300 pl-4"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status !== "idle"}
                    className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold h-12 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : status === "success" ? (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        <span>Welcome Aboard!</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Join Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <p className="text-[10px] text-center text-slate-500/80">
                    We prefer decentralization over data collection.
                    <span className="md:block"> Your privacy is cryptographically secured.</span>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CTA
