"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

interface FAQModalProps {
    isOpen: boolean
    onClose: () => void
}

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
    useLockBodyScroll(isOpen)
    const [activeCategory, setActiveCategory] = useState<string>("General")
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

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

    const faqData = {
        "General": [
            {
                question: "What exactly is Capsulr?",
                answer: "Capsulr is the first ultra-fast decentralized time-lock protocol built on Solana, designed to secure digital assets, messages, and predictions in immutable on-chain capsules."
            },
            {
                question: "Why Solana?",
                answer: "We leverage Solana's high-speed infrastructure to ensure that every capsule is minted instantly with near-zero transaction costs, providing a seamless experience for global users."
            },
            {
                question: "What makes a \"Digital Legacy\"?",
                answer: "It’s your story, assets, or \"alpha\" stored forever. Whether it's a message to your future self, a gift for a loved one, or a market prediction, Capsulr ensures it stays private until the perfect moment."
            }
        ],
        "Security": [
            {
                question: "How are my messages secured?",
                answer: "All content within a capsule is encrypted using industry-standard AES-256-GCM encryption and secured by non-custodial smart contracts. Only the intended recipient can unlock the content."
            },
            {
                question: "What are Oracle-Driven Triggers?",
                answer: "These are smart conditions powered by Pyth Network and Switchboard. You can set your capsule to unlock based on real-world events, such as SOL reaching a specific price target (e.g., $500)."
            },
            {
                question: "Is the protocol audited?",
                answer: "Yes. As part of Phase 01, our core Rust/Anchor protocol underwent private security audits to ensure the highest level of smart contract integrity."
            }
        ],
        "Ecosystem": [
            {
                question: "What is the utility of $CAPS?",
                answer: "$CAPS is the heart of our ecosystem. Holders enjoy reduced minting fees, governance voting rights in the Capsulr DAO, and access to exclusive \"Genesis\" NFT passes."
            },
            {
                question: "Where can I trade $CAPS?",
                answer: "$CAPS was launched via a fair launch on Pump.fun and is actively traded on Raydium and other major Solana DEXs."
            },
            {
                question: "Can I gift capsules to others?",
                answer: "Absolutely. You can mint a \"Gifted Capsule\" and send it directly to any Solana wallet address. The recipient will see it in their dashboard but cannot open it until your set conditions are met."
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

                    {/* 3D Container Wrapper to preserve perspective */}
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
                                <h2 className="text-2xl font-bold font-space-grotesk text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                    FAQ
                                </h2>
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
                                    {Object.keys(faqData).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setActiveCategory(category)
                                                setExpandedQuestion(null) // Reset expanded on category change
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === category
                                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_-5px_rgba(34,211,238,0.3)]"
                                                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                {/* Questions Content */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 custom-scrollbar">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        {activeCategory} Questions
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
                                    </h3>

                                    <div className="space-y-3">
                                        {faqData[activeCategory as keyof typeof faqData].map((item, index) => {
                                            const isOpen = expandedQuestion === item.question
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={false}
                                                    onClick={() => setExpandedQuestion(isOpen ? null : item.question)}
                                                    className={`group rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${isOpen
                                                        ? "bg-white/5 border-cyan-500/30 shadow-[0_4px_20px_-10px_rgba(34,211,238,0.1)]"
                                                        : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                                                        }`}
                                                >
                                                    <div className="p-5 flex items-start justify-between gap-4">
                                                        <span className={`font-medium text-lg transition-colors ${isOpen ? "text-cyan-400" : "text-gray-200 group-hover:text-white"
                                                            }`}>
                                                            {item.question}
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
                                                                    {item.answer}
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

export default FAQModal
