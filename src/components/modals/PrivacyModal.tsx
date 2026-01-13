"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, Lock, Eye, Database, Server, Clock, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

interface PrivacyModalProps {
    isOpen: boolean
    onClose: () => void
}

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
    useLockBodyScroll(isOpen)
    const [activeSection, setActiveSection] = useState<string>("Data Collection & Use")

    // Refs for scrolling to sections
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const contentRef = useRef<HTMLDivElement>(null)

    const sections = [
        {
            id: "introduction",
            title: "Introduction & Data Minimization",
            navTitle: "Data Minimization",
            icon: Eye,
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>1.1. Our Commitment to Privacy:</strong> Capsulr is built on the principle of "Privacy by Design." We believe that your digital legacy should remain yours alone. Our protocol is engineered to function without requiring any personal identifiable information (PII).
                    </p>
                    <p>
                        <strong>1.2. No Data Collection:</strong> We do not collect, store, or process your name, email address, phone number, IP address, or physical location. There are no tracking scripts or "cookies" that identify you as an individual.
                    </p>
                    <p>
                        <strong>1.3. Non-Custodial Architecture:</strong> As a non-custodial protocol, we never have access to your private keys, seed phrases, or the unencrypted contents of your capsules. Your security and privacy are enforced by the Solana blockchain and advanced mathematics.
                    </p>
                </div>
            )
        },
        {
            id: "onchain",
            title: "On-Chain Transparency & Metadata",
            navTitle: "On-Chain Data",
            icon: Database,
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>2.1. Public Ledger Visibility:</strong> By interacting with the Solana blockchain, you acknowledge that certain metadata is inherently public. This includes your public wallet address, transaction timestamps, block heights, and the specific smart contract functions you trigger.
                    </p>
                    <p>
                        <strong>2.2. Immutable Records:</strong> Transactions on Solana are permanent. Once you mint a capsule or trigger an unlock, this activity is recorded on a public ledger that Capsulr does not control and cannot modify.
                    </p>
                    <p>
                        <strong>2.3. Pseudonymity:</strong> While your real-world identity is not linked to your wallet by our protocol, your wallet's history is transparent. Users are encouraged to use dedicated "burner" wallets if they require an extra layer of operational security.
                    </p>
                </div>
            )
        },
        {
            id: "encryption",
            title: "Advanced Encryption & Storage",
            navTitle: "Encryption & Storage",
            icon: Lock,
            isHighlight: true,
            content: (
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full mb-2">
                        <Lock className="w-3 h-3 text-cyan-400" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 animate-pulse">End-to-End Encrypted</span>
                    </div>
                    <p>
                        <strong>3.1. Client-Side Encryption (AES-256-GCM):</strong> Every message or asset description you lock is encrypted directly in your browser or application before it ever reaches our servers or the blockchain. We utilize the AES-256-GCM standard, providing military-grade security.
                    </p>
                    <p>
                        <strong>3.2. Zero-Knowledge Principles:</strong> We operate under a Zero-Knowledge framework. The protocol verifies that the unlock conditions are met (e.g., a specific date or price target) without ever needing to "know" or "see" what is inside the capsule.
                    </p>
                    <p>
                        <strong>3.3. Arweave Decentralized Storage:</strong> For long-term preservation, encrypted capsule manifests are uploaded to the Arweave network. This ensures your data survives as long as the internet exists, independent of Capsulr’s servers. Like the blockchain, Arweave storage is permanent and cannot be deleted.
                    </p>
                </div>
            )
        },
        {
            id: "thirdparty",
            title: "Third-Party & Infrastructure",
            navTitle: "Third-Party",
            icon: Server,
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>4.1. RPC Node Providers:</strong> To communicate with the Solana network, the Capsulr interface uses RPC (Remote Procedure Call) nodes. While we select high-privacy providers, these third parties may technically see your IP address and wallet address to route your transactions.
                    </p>
                    <p>
                        <strong>4.2. Oracle Networks (Pyth/Switchboard):</strong> When you set price-based triggers, our protocol fetches data from decentralized oracles. These oracles only provide data to the contract and do not have access to your private capsule information.
                    </p>
                    <p>
                        <strong>4.3. External Links:</strong> Our website may contain links to social media (X, Telegram) or analytics platforms (Dexscreener, Birdeye). These external sites have their own privacy policies which we do not control.
                    </p>
                </div>
            )
        },
        {
            id: "rights",
            title: "International Users & Rights",
            navTitle: "Global Rights",
            icon: Clock, // Keeping Clock or switching to something global if needed, preserving standard lucide icons
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>5.1. Global Access:</strong> Capsulr is a borderless protocol. By using our service, you consent to the processing of your decentralized data across global nodes.
                    </p>
                    <p>
                        <strong>5.2. GDPR & The Right to be Forgotten:</strong> Due to the immutable nature of blockchain technology (Solana) and permanent storage (Arweave), the "Right to Erasure" or "Right to be Forgotten" cannot be exercised for data that has already been broadcast to these networks.
                    </p>
                    <p>
                        <strong>5.3. Future Policy Updates:</strong> As the regulatory landscape for Web3 evolves, we may update this policy. All updates will be timestamped and reflected in this dashboard. Your continued use of the protocol after updates constitutes acceptance of the new terms.
                    </p>
                </div>
            )
        }
    ]

    const scrollToSection = (title: string) => {
        setActiveSection(title)
        const element = sectionRefs.current[title]
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    // Intersection Observer to update active section on scroll
    useEffect(() => {
        if (!isOpen) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const title = entry.target.getAttribute('data-section')
                    if (title) setActiveSection(title)
                }
            })
        }, {
            root: contentRef.current,
            threshold: 0.5
        })

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [isOpen])

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
                            className="absolute -inset-1 bg-gradient-to-r from-red-500/10 via-cyan-500/10 to-red-500/10 rounded-[2.5rem] blur-2xl opacity-50 -z-10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full md:h-[650px] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row ring-1 ring-white/10"
                        >
                            {/* Left Sidebar (Desktop) / Top Bar (Mobile) - 30% */}
                            <div className="w-full md:w-[35%] bg-black/20 border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-8 flex flex-col relative flex-shrink-0 max-h-[30vh] md:max-h-full">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent" />

                                <div className="mb-6 md:mb-10">
                                    <h2 className="text-2xl font-bold font-space-grotesk text-white tracking-tight flex items-center gap-2">
                                        <Shield className="w-6 h-6 text-cyan-500" />
                                        PRIVACY POLICY
                                    </h2>
                                    <p className="text-gray-400 text-xs mt-2 font-mono">
                                        Last Updated: January 13, 2026
                                    </p>
                                </div>

                                {/* Navigation Desktop */}
                                <div className="hidden md:flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.navTitle)}
                                            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 group ${activeSection === section.navTitle
                                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                                                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                                }`}
                                        >
                                            <section.icon className={`w-4 h-4 ${activeSection === section.navTitle ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"}`} />
                                            {section.navTitle}
                                        </button>
                                    ))}
                                </div>

                                {/* Navigation Mobile (Horizontal Scroll) */}
                                <div className="md:hidden flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.navTitle)}
                                            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${activeSection === section.navTitle
                                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                                : "bg-white/5 text-gray-400 border border-transparent"
                                                }`}
                                        >
                                            {section.navTitle}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Main Area: Content (70%) */}
                            <div className="flex-1 flex flex-col bg-white/[0.02] relative">
                                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Content Scroll Area */}
                                <div
                                    ref={contentRef}
                                    className="p-6 md:p-10 overflow-y-auto flex-1 custom-scrollbar space-y-12 scroll-smooth"
                                >
                                    {sections.map((section) => (
                                        <div
                                            key={section.id}
                                            ref={(el) => { sectionRefs.current[section.navTitle] = el; return; }}
                                            data-section={section.navTitle}
                                            className="scroll-mt-6"
                                        >
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                                <section.icon className="w-5 h-5 text-cyan-500" />
                                                {section.title}
                                            </h3>

                                            {section.isHighlight ? (
                                                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
                                                    <div className="text-gray-300 text-sm leading-relaxed relative z-10">
                                                        {section.content}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-gray-400 text-sm leading-relaxed pl-1">
                                                    {section.content}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="pt-8 mt-12 border-t border-white/5 text-center">
                                        <p className="text-xs text-gray-600">
                                            For privacy related inquiries, please contact privacy@capsulr.io
                                        </p>
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

export default PrivacyModal
