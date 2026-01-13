"use client"

import { motion } from "framer-motion"
import {
  Clock,
  Key,
  Shield,
  Trophy,
  Image,
  LineChart,
  Gift,
  Layers,
  FileKey,
  Lock
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import GlobeComponent from "../Globe"
import { cn } from "@/lib/utils"
import { useState } from "react"

const Features = () => {
  const features = [
    {
      icon: <Clock className="h-10 w-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />,
      title: "On-Chain Precision",
      description: "Lock assets until a specific block height or timestamp. Immutable scheduling powered by Solana."
    },
    {
      icon: <Shield className="h-10 w-10 text-cyan-400 group-hover:text-emerald-300 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />,
      title: "Non-Custodial Vaults",
      description: "Your assets are secured in decentralized smart contracts. Only the recipient holds the unlocking keys."
    },
    {
      icon: <Trophy className="h-10 w-10 text-cyan-400 group-hover:text-yellow-300 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" />,
      title: "Yield & Incentives",
      description: "Wrap SPL tokens or liquidity positions. Contents can accrue yield while locked inside the capsule."
    },
    {
      icon: <Key className="h-10 w-10 text-cyan-400 group-hover:text-purple-300 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(216,180,254,0.5)]" />,
      title: "Oracle-Driven Triggers",
      description: "Unlock based on real-world data (e.g., SOL > $500) via Pyth/Switchboard, or DAO governance votes."
    },
  ]

  const contentTypes = [
    {
      icon: <Layers className="h-8 w-8 text-cyan-400" />,
      title: "Liquid Assets",
      frontDesc: "Store SOL, SPL tokens, or yield-bearing assets.",
      backDesc: "Supports auto-compounding protocols like Marginfi or Kamino. Unlock liquidity pools precisely when needed."
    },
    {
      icon: <Image className="h-8 w-8 text-purple-400" />,
      title: "Premium NFTs",
      frontDesc: "Lock blue-chip NFTs or digital art collections.",
      backDesc: "Wrap individual NFTs or entire collections. Perfect for delayed reveals, long-term holding, or giveaways."
    },
    {
      icon: <FileKey className="h-8 w-8 text-emerald-400" />,
      title: "Private Notes & Seeds",
      frontDesc: "Secure encrypted passwords or personal manifestos.",
      backDesc: "Utilizes end-to-end Zero-Knowledge encryption. Even we cannot see your data. Absolute privacy ensured."
    },
    {
      icon: <LineChart className="h-8 w-8 text-yellow-400" />,
      title: "Alpha & Predictions",
      frontDesc: "Seal market predictions to prove foresight later.",
      backDesc: "Prove your track record on-chain. Timestamped immutable proof of your foresight before the market moved."
    },
    {
      icon: <Gift className="h-8 w-8 text-pink-400" />,
      title: "Future Inheritance",
      frontDesc: "Set up trustless streams for family or DAOs.",
      backDesc: "Set up multi-sig triggers or inactivity timers (dead man's switch) to ensure assets reach loved ones."
    },
    {
      icon: <Lock className="h-8 w-8 text-red-400" />,
      title: "Exclusive Access",
      frontDesc: "Hide keys for gated content meant for a later date.",
      backDesc: "Store decryption keys for private Discords, early access links, or content that only reveals in the future."
    },
  ]
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)

  const handleCardInteraction = (index: number) => {
    // Desktop hover will still work via CSS group-hover
    // This state handles mobile tap toggling
    setFlippedIndex(flippedIndex === index ? null : index)
  }

  // Ultra-smooth premium easing
  // Ultra-smooth premium easing
  const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  // Animation variants for section title
  const titleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: smoothEase }
    }
  }

  // Animation variants for cards
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: smoothEase,
        opacity: { duration: 0.2 } // Fade in almost instantly to avoid "transparent lag"
      }
    }
  }

  // Animation variants for content type cards (Staggered Grid)
  const gridVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const gridItemVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: smoothEase }
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Globe & Fog */}
      <div className="absolute inset-0 -z-50 opacity-80 pointer-events-none">
        <GlobeComponent />
      </div>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/30 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">

          {/* Section 1: The Next Evolution */}
          <motion.div
            className="text-center mb-20"
            variants={titleVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-space-grotesk tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-500 to-teal-400">
                The Next Evolution
              </span>{" "}
              of Digital Time Capsules
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Combine social, creative, and game mechanics with Solana's speed for
              a truly unique way to connect past, present, and future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                transition={{ delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.5, ease: smoothEase } }}
              >
                {/* Running Neon Border */}
                <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#22d3ee_50%,#ffffff_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow pointer-events-none" />
                <div className="absolute -inset-[1px] rounded-2xl bg-cyan-500/20 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 pointer-events-none" />

                <Card className="group relative bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 h-full overflow-hidden transition-all duration-500 hover:border-cyan-400 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset] hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.4)]">

                  <CardHeader className="p-0 relative z-10">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-cyan-100 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Section 2: What You Can Store */}
          <div className="text-center relative">
            {/* Background for section 2 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 blur-3xl -z-10 rounded-full opacity-50" />

            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-16 font-space-grotesk"
              variants={titleVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: false, amount: 0.3 }}
            >
              What You Can Store In Your <span className="text-cyan-400">Time Capsule</span>
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              variants={gridVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: false, amount: 0.2 }}
            >
              {contentTypes.map((type, index) => (
                <motion.div
                  key={index}
                  variants={gridItemVariants}
                  // Flip Card Container
                  className="group h-[280px] w-full [perspective:1000px] cursor-default"
                  onClick={() => handleCardInteraction(index)}
                >
                  {/* Flipper Wrapper */}
                  <div className={cn(
                    "relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]",
                    "group-hover:[transform:rotateY(180deg)]",
                    flippedIndex === index && "[transform:rotateY(180deg)]"
                  )}>

                    {/* Front Face */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-white/5 via-black/40 to-cyan-950/20 border border-cyan-500/10 rounded-xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl shadow-[0_0_15px_-5px_rgba(34,211,238,0.1)]">
                      <div className="h-16 w-16 mb-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-400/60 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] transition-all duration-300">
                        {type.icon}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-50 transition-colors">
                        {type.title}
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {type.frontDesc}
                      </p>

                      {/* Hint to flip */}
                      <div className="absolute bottom-4 text-xs font-medium text-cyan-500/70 animate-pulse tracking-wide">
                        Hover to reveal
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-cyan-500/20 via-black/90 to-cyan-900/20 border border-cyan-400/40 rounded-xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl shadow-[0_0_30px_-5px_rgba(34,211,238,0.2)]">
                      <h4 className="text-lg font-bold text-cyan-200 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {type.title} Details
                      </h4>
                      <p className="text-sm text-cyan-50/90 leading-relaxed font-medium">
                        {type.backDesc}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features