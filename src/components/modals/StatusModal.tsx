"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { X, ChevronDown, Activity, Server, Shield, Globe, Clock, Zap, HardDrive, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

interface StatusModalProps {
    isOpen: boolean
    onClose: () => void
}

const StatusModal = ({ isOpen, onClose }: StatusModalProps) => {
    useLockBodyScroll(isOpen)
    const [activeCategory, setActiveCategory] = useState<string>("Core Services Status")
    const [expandedItem, setExpandedItem] = useState<string | null>(null)

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

    const statusData = {
        "Core Services Status": [
            {
                title: "Solana RPC Cluster (Mainnet-Beta)",
                status: "Operational",
                description: "High-performance connection to Solana nodes for real-time transaction processing and finality.",
                icon: <Server className="w-4 h-4" />
            },
            {
                title: "Capsulr Indexing Engine v2.4",
                status: "Operational",
                description: "Our proprietary engine responsible for tracking capsule ownership, metadata changes, and on-chain event listeners.",
                icon: <Activity className="w-4 h-4" />
            },
            {
                title: "Time-Lock Oracle Sync (Pyth & Switchboard)",
                status: "Operational",
                description: "Active monitoring of cross-chain price feeds to trigger conditional unlocks based on market volatility.",
                icon: <Clock className="w-4 h-4" />
            },
            {
                title: "Encrypted Metadata Storage (Arweave Gateway)",
                status: "Operational",
                description: "Permanent, decentralized storage layer for encrypted capsule manifests and non-sensitive metadata.",
                icon: <HardDrive className="w-4 h-4" />
            },
            {
                title: "Zk-Proof Generation Node",
                status: "Operational",
                description: "Compute layer for verifying Zero-Knowledge proofs without revealing sensitive capsule content during the reveal phase.",
                icon: <Shield className="w-4 h-4" />
            }
        ],
        "Performance Metrics (Real-time)": [
            {
                title: "Global API Latency",
                value: "Global Avg: 108ms",
                description: "North America: 42ms | Europe: 118ms | Asia-Pacific: 164ms",
                icon: <Globe className="w-4 h-4" />
            },
            {
                title: "Blockchain Statistics",
                value: "~400ms Finality",
                description: "Transaction Finality Rate: 99.991% | Capsule Minting Success Rate: 100% (Last 24 hours)",
                icon: <Cpu className="w-4 h-4" />
            },
            {
                title: "Traffic Capacity",
                value: "Low (8%)",
                description: "Peak Concurrent Users (Last 7 days): 14,289",
                icon: <Zap className="w-4 h-4" />
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
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Apple-like ease
                            style={{
                                rotateX: rotateX,
                                rotateY: rotateY,
                            }}
                            className="w-full bg-white/5 border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_-10px_rgba(16,185,129,0.1)] backdrop-blur-xl"
                        >

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-2xl font-bold font-space-grotesk text-white flex items-center gap-3">
                                        System Status
                                        <div className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                        </div>
                                    </h2>
                                    <div className="flex items-center gap-2 text-xs font-mono">
                                        <span className="text-emerald-400 font-bold tracking-wider">ALL SYSTEMS OPERATIONAL</span>
                                        <span className="text-gray-500">|</span>
                                        <span className="text-gray-400">99.98% Uptime</span>
                                    </div>
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
                                    {Object.keys(statusData).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setActiveCategory(category)
                                                setExpandedItem(null)
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === category
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]"
                                                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 custom-scrollbar">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        {activeCategory}
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent" />
                                    </h3>

                                    <div className="space-y-3">
                                        {statusData[activeCategory as keyof typeof statusData].map((item, index) => {
                                            const isExpanded = expandedItem === item.title
                                            const isOperational = item.status === "Operational" || item.status === "No incidents reported"
                                            const isResolved = item.status === "Resolved"

                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={false}
                                                    onClick={() => setExpandedItem(isExpanded ? null : item.title)}
                                                    className={`group rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${isExpanded
                                                        ? "bg-white/5 border-emerald-500/30 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.1)]"
                                                        : "bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                                                        }`}
                                                >
                                                    <div className="p-5 flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`p-2 rounded-lg ${isExpanded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                                                {item.icon}
                                                            </div>
                                                            <div>
                                                                <span className={`font-medium text-lg block transition-colors ${isExpanded ? "text-emerald-400" : "text-gray-200 group-hover:text-white"}`}>
                                                                    {item.title}
                                                                </span>
                                                                {(item.status || item.value) && (
                                                                    <span className={`text-xs font-mono mt-1 block ${activeCategory === "Performance Metrics"
                                                                        ? "text-cyan-400"
                                                                        : isOperational
                                                                            ? "text-emerald-500"
                                                                            : isResolved
                                                                                ? "text-yellow-500"
                                                                                : "text-gray-400"
                                                                        }`}>
                                                                        {item.status || item.value}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <ChevronDown
                                                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 mt-3 ${isExpanded ? "rotate-180 text-emerald-400" : ""}`}
                                                        />
                                                    </div>
                                                    <AnimatePresence initial={false}>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                            >
                                                                <div className="px-5 pb-5 text-gray-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4 pl-[4.5rem]">
                                                                    {item.description}
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

export default StatusModal
