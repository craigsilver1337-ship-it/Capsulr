"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, Sliders, ShieldCheck, Unlock } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect & Design",
      description: "Connect your Solana wallet. Choose assets (SOL, SPL tokens, NFTs) and craft your message using our encrypted editor.",
      icon: <Wallet className="h-6 w-6 text-[#00F0FF]" />,
    },
    {
      number: "02",
      title: "Set Smart Conditions",
      description: "Define immutable unlock parameters: specific date, Oracle price target (e.g., SOL > $500), or wallet activity.",
      icon: <Sliders className="h-6 w-6 text-[#00F0FF]" />,
    },
    {
      number: "03",
      title: "Decentralized Custody",
      description: "Your capsule is minted as a unique NFT. Assets are secured in a non-custodial smart contract on Solana.",
      icon: <ShieldCheck className="h-6 w-6 text-[#00F0FF]" />,
    },
    {
      number: "04",
      title: "Trustless Reveal",
      description: "When conditions are met, the contract automatically unlocks. Claim your assets or share the revealed capsule with the world.",
      icon: <Unlock className="h-6 w-6 text-[#00F0FF]" />,
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 15
      }
    }
  } as const

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-space-grotesk tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Creating and unlocking time capsules is easy with our streamlined process. Follow these simple steps to preserve your digital legacy.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Visual Connector Removed */}

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative z-10 group"
            >
              {/* Simplified Hover Effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-cyan-500/0 opacity-0 group-hover:opacity-100 group-hover:bg-cyan-500/20 blur-xl transition-all duration-500 pointer-events-none" />

              <div
                className="
                  relative
                  bg-black/40 backdrop-blur-xl 
                  border border-white/10
                  rounded-2xl h-full p-8 
                  flex flex-col items-start
                  transition-all duration-500
                  hover:border-cyan-400/50
                  hover:bg-black/60
                  hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]
                "
              >
                {/* Step Number & Icon Header */}
                <div className="flex justify-between items-center w-full mb-6 relative z-10">
                  <div className="p-3 bg-black/40 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors duration-300">
                    <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <span
                    className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none font-space-grotesk group-hover:from-cyan-500/20 group-hover:to-transparent transition-all duration-500"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-100 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
