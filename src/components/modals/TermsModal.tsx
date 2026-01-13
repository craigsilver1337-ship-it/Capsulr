"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, ShieldAlert, Scale, ScrollText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

interface TermsModalProps {
    isOpen: boolean
    onClose: () => void
}

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
    useLockBodyScroll(isOpen)
    const [activeSection, setActiveSection] = useState<string>("Acceptance of Terms")

    // Refs for scrolling to sections
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const contentRef = useRef<HTMLDivElement>(null)

    const sections = [
        {
            id: "acceptance",
            title: "Acceptance of Terms",
            icon: FileText,
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>1.1. Binding Agreement:</strong> By accessing the Capsulr platform, connecting your digital wallet, or interacting with our smart contracts, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service in their entirety.
                    </p>
                    <p>
                        <strong>1.2. Eligibility:</strong> You represent and warrant that you are at least 18 years of age and have the full legal capacity to enter into this agreement. If you are using the service on behalf of a legal entity, you further warrant that you have the authority to bind that entity to these terms.
                    </p>
                    <p>
                        <strong>1.3. Modification of Terms:</strong> Capsulr reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the protocol following any updates constitutes acceptance of the revised terms.
                    </p>
                </div>
            )
        },
        {
            id: "description",
            title: "Protocol Description & Fees",
            icon: ScrollText,
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>2.1. The Service:</strong> Capsulr provides a decentralized, non-custodial time-lock infrastructure on the Solana blockchain. Users can lock digital assets (SOL, SPL tokens, NFTs) and encrypted data within smart contracts, subject to specific trigger conditions.
                    </p>
                    <p>
                        <strong>2.2. Non-Custodial Nature:</strong> You acknowledge that Capsulr is a set of autonomous smart contracts. We do not have access to, nor can we recover, frozen assets or encrypted data. You maintain exclusive control over your assets via your private keys.
                    </p>
                    <p>
                        <strong>2.3. Transaction & Protocol Fees:</strong> Every interaction with the protocol requires "Gas" (SOL) to be paid to the Solana network. Capsulr may also charge protocol fees for minting capsules. These fees are non-refundable and subject to change via DAO governance.
                    </p>
                </div>
            )
        },
        {
            id: "responsibilities",
            title: "User Responsibilities & Prohibited Use",
            icon: Scale,
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>3.1. Wallet Security:</strong> You are solely responsible for maintaining the confidentiality of your private keys and seed phrases. Any action initiated through your wallet is deemed to be your own.
                    </p>
                    <p>
                        <strong>3.2. Content Restrictions:</strong> You agree not to use Capsulr to store or transmit any material that is illegal, defamatory, or violates intellectual property rights. We do not monitor encrypted content, but we will comply with legal orders regarding public-facing metadata.
                    </p>
                    <p>
                        <strong>3.3. Compliance:</strong> You represent that you are not a resident of any jurisdiction subject to comprehensive sanctions (e.g., OFAC) and that you will not use the protocol for money laundering, terrorist financing, or any other illicit activities.
                    </p>
                </div>
            )
        },
        {
            id: "risk",
            title: "Comprehensive Risk Disclosure",
            icon: AlertTriangle,
            isWarning: true,
            content: (
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-cyan-400">4.1. Smart Contract Vulnerabilities:</strong> While our code has been audited, you acknowledge that no smart contract is 100% secure. You use the protocol at your own risk and accept the possibility of technical failures or exploits.</li>
                    <li><strong className="text-cyan-400">4.2. Oracle & Third-Party Dependencies:</strong> Our "Oracle Triggers" rely on external data providers (e.g., Pyth Network). We are not liable for any inaccuracies, delays, or failures in these third-party data feeds that may affect the unlocking of your capsules.</li>
                    <li><strong className="text-cyan-400">4.3. Market & Regulatory Risks:</strong> The value of locked assets may fluctuate significantly. Furthermore, the legal status of crypto-assets and decentralized protocols is subject to change. Regulatory actions may affect our ability to continue providing the platform.</li>
                </ul>
            )
        },
        {
            id: "liability",
            title: "Limitation of Liability & Indemnification",
            icon: ShieldAlert,
            isWarning: true,
            content: (
                <div className="space-y-4">
                    <p>
                        <strong>5.1. No Warranties:</strong> Capsulr is provided on an "as is" and "as available" basis. We expressly disclaim all warranties, whether express or implied, including but not limited to the fitness for a particular purpose and non-infringement.
                    </p>
                    <p>
                        <strong>5.2. Indemnification:</strong> You agree to indemnify and hold harmless the Capsulr developers, contributors, and DAO members from any claims, damages, or legal fees arising from your breach of these terms or your use of the protocol.
                    </p>
                    <p>
                        <strong>5.3. Finality of Transactions:</strong> Transactions on the Solana blockchain are irreversible. Capsulr cannot reverse, cancel, or modify any transaction once it has been broadcast to the network.
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
                                        <Scale className="w-6 h-6 text-cyan-500" />
                                        TERMS OF SERVICE
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
                                            onClick={() => scrollToSection(section.title)}
                                            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 group ${activeSection === section.title
                                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                                                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                                }`}
                                        >
                                            <section.icon className={`w-4 h-4 ${activeSection === section.title ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"}`} />
                                            {section.title}
                                        </button>
                                    ))}
                                </div>

                                {/* Navigation Mobile (Horizontal Scroll) */}
                                <div className="md:hidden flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.title)}
                                            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${activeSection === section.title
                                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                                : "bg-white/5 text-gray-400 border border-transparent"
                                                }`}
                                        >
                                            {section.title}
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
                                            ref={(el) => { sectionRefs.current[section.title] = el; return; }}
                                            data-section={section.title}
                                            className="scroll-mt-6"
                                        >
                                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                                <section.icon className="w-5 h-5 text-cyan-500" />
                                                {section.title}
                                            </h3>

                                            {section.isWarning ? (
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
                                            For any legal inquiries, please contact legal@capsulr.io
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

export default TermsModal
