"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { X, ChevronDown, BookOpen, Rocket, Zap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

interface GuidesModalProps {
    isOpen: boolean
    onClose: () => void
}

const GuidesModal = ({ isOpen, onClose }: GuidesModalProps) => {
    useLockBodyScroll(isOpen)
    const [activeCategory, setActiveCategory] = useState<string>("Getting Started")
    const [expandedGuide, setExpandedGuide] = useState<string | null>(null)

    // Mouse tilt effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - left) / width - 0.5
        const y = (e.clientY - top) / height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { damping: 20, stiffness: 300 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { damping: 20, stiffness: 300 })

    const guidesData = {
        "Getting Started": [
            {
                title: "Connecting Your Wallet",
                content: "To begin, click the 'Connect Wallet' button in the top right. We recommend using Phantom or Solflare. Ensure you have a small amount of SOL for transaction fees (usually less than $0.01)."
            },
            {
                title: "Creating Your First Capsule",
                content: "Navigate to 'Create Capsule', choose your content (text, files, or tokens), and set the unlock conditions. You will mint a unique NFT that acts as the key to your vault."
            },
            {
                title: "Understanding Fees",
                content: "Capsulr uses a tiny fee for protocol maintenance. Holders of $CAPS tokens receive significant discounts on every minting operation."
            }
        ],
        "Advanced Features": [
            {
                title: "Setting Oracle Triggers",
                content: "Beyond simple dates, you can lock capsules until specific market events occur. For example, \"Unlock when SOL price > $500\". This is powered by Pyth Network's real-time price feeds."
            },
            {
                title: "Gifting Capsules",
                content: "You can send a locked capsule directly to a friend's wallet. They will see it in their 'Gifted' tab, but the contents remain encrypted until the conditions you set are met."
            },
            {
                title: "Adding Assets (Yield-Bearing)",
                content: "You can lock SPL tokens inside. If the assets are from supported protocols (like Kamino or Marginfi), your capsule can accrue yield while it is still locked."
            }
        ],
        "Security Best Practices": [
            {
                title: "The Non-Custodial Rule",
                content: "Your assets are held in a smart contract, not by us. If you lose access to your wallet, we cannot \"recover\" your capsule. Always back up your seed phrase."
            },
            {
                title: "Encryption Privacy",
                content: "Your messages are encrypted before they even leave your browser. No one—not even the Capsulr team—can read the content until the unlock condition is triggered."
            }
        ]
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center isolate">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-2xl z-10 cursor-pointer"
                    />

                    {/* 3D Container Wrapper */}
                    <div
                        className="relative z-20 w-full max-w-4xl px-4"
                        style={{ perspective: 1000 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1.0,
                                y: 0,
                                rotateX: rotateX as any,
                                rotateY: rotateY as any
                            }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                rotateX: rotateX,
                                rotateY: rotateY,
                            }}
                            className="w-full bg-white/5 border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_-10px_rgba(34,211,238,0.1)] backdrop-blur-xl"
                        >

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
                                <div>
                                    <h2 className="text-2xl font-bold font-space-grotesk text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] flex items-center gap-3">
                                        <BookOpen className="w-6 h-6 text-cyan-400" />
                                        CAPSULR ACADEMY
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">Master the art of digital time-locking on Solana.</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="flex flex-col md:flex-row h-[70vh] md:h-[600px]">
                                {/* Sidebar Filters */}
                                <div className="w-full md:w-64 p-6 border-b md:border-b-0 md:border-r border-white/5 bg-black/20 space-y-2 flex-shrink-0">
                                    {Object.keys(guidesData).map((category) => {
                                        let Icon = Rocket
                                        if (category === "Advanced Features") Icon = Zap
                                        if (category === "Security Best Practices") Icon = ShieldCheck

                                        return (
                                            <button
                                                key={category}
                                                onClick={() => {
                                                    setActiveCategory(category)
                                                    setExpandedGuide(null)
                                                }}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 ${activeCategory === category
                                                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_-5px_rgba(34,211,238,0.3)]"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {category}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 custom-scrollbar">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        {activeCategory}
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
                                    </h3>

                                    <div className="space-y-3">
                                        {guidesData[activeCategory as keyof typeof guidesData].map((item, index) => {
                                            const isOpen = expandedGuide === item.title
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={false}
                                                    onClick={() => setExpandedGuide(isOpen ? null : item.title)}
                                                    className={`group rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${isOpen
                                                        ? "bg-white/5 border-cyan-500/30 shadow-[0_4px_20px_-10px_rgba(34,211,238,0.1)]"
                                                        : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                                                        }`}
                                                >
                                                    <div className="p-5 flex items-start justify-between gap-4">
                                                        <span className={`font-medium text-lg transition-colors ${isOpen ? "text-cyan-400" : "text-gray-200 group-hover:text-white"
                                                            }`}>
                                                            {item.title}
                                                        </span>
                                                        <ChevronDown
                                                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? "rotate-180 text-cyan-400" : ""
                                                                }`}
                                                        />
                                                    </div>
                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                            >
                                                                <div className="px-5 pb-5 text-gray-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                                                                    {item.content}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default GuidesModal
