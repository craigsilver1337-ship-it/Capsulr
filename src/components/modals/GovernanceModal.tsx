"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Users, Vote, Coins, FileText, CheckCircle, Clock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

interface GovernanceModalProps {
    isOpen: boolean
    onClose: () => void
}

const GovernanceModal = ({ isOpen, onClose }: GovernanceModalProps) => {
    useLockBodyScroll(isOpen)
    const [activeTab, setActiveTab] = useState<"ACTIVE" | "PAST">("ACTIVE")

    const principles = [
        {
            title: "Decentralized Decision Making",
            description: "Every major protocol update, from fee structures to new oracle integrations, is decided by the community through on-chain voting."
        },
        {
            title: "Voting Power",
            description: "Your influence is proportional to your $CAPS holdings. The more you stake, the louder your voice in the Capsulr ecosystem."
        },
        {
            title: "Proposal Submission",
            description: "Any \"Guardian\" holding more than 100,000 $CAPS can submit a formal proposal for community review."
        }
    ]

    const proposals = [
        {
            id: "#08",
            title: "Increase Storage Incentives",
            status: "VOTING ACTIVE",
            description: "Increase the yield for long-term locked capsules to attract more liquidity providers.",
            support: 78,
            votes: 12405
        },
        {
            id: "#09",
            title: "Integration with Jito MEV",
            status: "UPCOMING",
            description: "Implement Jito-bundle support to ensure transaction priority for urgent time-sensitive unlocks.",
            support: 0,
            votes: 0
        }
    ]

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
                        className="absolute inset-0 bg-black/80 backdrop-blur-md z-10 cursor-pointer"
                    />

                    {/* Modal Container */}
                    <div className="relative z-20 w-full max-w-5xl px-4 h-[90vh] md:h-auto md:max-h-[85vh] flex items-center">
                        {/* Animated Halo Glow */}
                        <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50 -z-10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full md:h-[650px] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row ring-1 ring-white/10"
                        >
                            {/* Left Sidebar: Governance Principles (30%) */}
                            <div className="w-full md:w-[35%] bg-black/20 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent" />

                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                            <Vote className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold font-space-grotesk text-white tracking-tight">
                                            CAPSULR DAO
                                        </h2>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Power to the Guardians. Shape the future of digital eternity.
                                    </p>
                                </div>

                                <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Governance Principles</h3>
                                    {principles.map((item, idx) => (
                                        <div key={idx} className="group">
                                            <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400" />
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed pl-3.5 border-l border-white/5 group-hover:border-cyan-500/20 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Tier Badges Footer */}
                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Guardian Tiers</h4>
                                    <div className="flex gap-4">
                                        {["Pioneer", "Guardian", "Oracle"].map((tier, i) => (
                                            <div key={tier} className="flex flex-col items-center gap-1 group cursor-help">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${i === 2 ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]" :
                                                    i === 1 ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]" :
                                                        "bg-slate-500/10 border-slate-500/30 text-slate-400"
                                                    }`}>
                                                    <ShieldCheck className="w-4 h-4" />
                                                </div>
                                                <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors">{tier}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Main Area: Dashboard (70%) */}
                            <div className="flex-1 flex flex-col bg-white/[0.02]">
                                {/* Top Stats Bar */}
                                <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 relative">
                                    <div className="flex gap-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total Locked</span>
                                            <div className="flex items-center gap-2">
                                                <Coins className="w-4 h-4 text-amber-400" />
                                                <span className="text-xl font-bold font-mono text-white animate-pulse">34,600,000</span>
                                                <span className="text-xs text-gray-500">$CAPS</span>
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-white/5 my-auto" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Active Proposals</span>
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-cyan-400" />
                                                <span className="text-xl font-bold font-mono text-white">03</span>
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-white/5 my-auto hidden sm:block" />
                                        <div className="flex-col hidden sm:flex">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">DAO Members</span>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-emerald-400" />
                                                <span className="text-xl font-bold font-mono text-white">241</span>
                                            </div>
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

                                {/* Content Area */}
                                <div className="p-8 flex-1 overflow-y-auto">
                                    {/* Tabs */}
                                    <div className="flex gap-6 mb-8 border-b border-white/5">
                                        {["ACTIVE", "PAST"].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab as any)}
                                                className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab ? "text-cyan-400" : "text-gray-500 hover:text-gray-300"
                                                    }`}
                                            >
                                                {tab} PROPOSALS
                                                {activeTab === tab && (
                                                    <motion.div
                                                        layoutId="activeTab"
                                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Proposals Grid */}
                                    <div className="space-y-4">
                                        {activeTab === "ACTIVE" ? proposals.map((proposal) => (
                                            <motion.div
                                                key={proposal.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="group relative bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 overflow-hidden cursor-pointer"
                                            >
                                                {/* Hover Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                                <div className="flex justify-between items-start mb-4 relative z-10">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-xs font-mono text-gray-500">{proposal.id}</span>
                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${proposal.status === "VOTING ACTIVE"
                                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                                : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                                                                }`}>
                                                                {proposal.status}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                            {proposal.title}
                                                        </h3>
                                                    </div>

                                                    {/* View Button (Visible on Hover) */}
                                                    <motion.button
                                                        initial={{ opacity: 0, x: 10 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="hidden group-hover:flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-all"
                                                        animate={{ opacity: 1, x: 0 }}
                                                    >
                                                        View Details
                                                    </motion.button>
                                                </div>

                                                <p className="text-gray-400 text-sm mb-6 relative z-10 max-w-2xl">
                                                    {proposal.description}
                                                </p>

                                                {/* Progress Bar (Only for active voting) */}
                                                {proposal.status === "VOTING ACTIVE" && (
                                                    <div className="relative z-10">
                                                        <div className="flex justify-between text-xs mb-2">
                                                            <span className="text-gray-400">Current Support</span>
                                                            <span className="text-white font-mono">{proposal.support}% YES</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${proposal.support}%` }}
                                                                transition={{ duration: 1, delay: 0.2 }}
                                                                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {proposal.status === "UPCOMING" && (
                                                    <div className="relative z-10 flex items-center gap-2 text-xs text-gray-500">
                                                        <Clock className="w-3 h-3" />
                                                        <span>Voting begins in 14h 23m</span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )) : (
                                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                                    <FileText className="w-8 h-8 text-gray-600" />
                                                </div>
                                                <h4 className="text-gray-400 font-medium">No past proposals loaded</h4>
                                            </div>
                                        )}
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

export default GovernanceModal
