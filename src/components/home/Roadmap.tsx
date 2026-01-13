"use client"

import { useState, useRef, MouseEvent } from "react"
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { Check, Copy, Twitter, Send, FileText, Cpu, ArrowUpRight, ShieldCheck } from "lucide-react"

const smoothEase = [0.16, 1, 0.3, 1] as const

// --- Quantum Node Component ---
const QuantumNode = ({ active }: { active: boolean }) => (
    <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Outer Ring */}
        <div className={`absolute inset-0 rounded-full border border-cyan-500/30 ${active ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
        <div className={`absolute inset-0 rounded-full border border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent rotate-45 ${active ? 'animate-[spin_3s_linear_infinite_reverse]' : ''}`} />

        {/* Inner Core */}
        <div className={`relative z-10 w-4 h-4 rounded-full bg-black border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500 ${active ? 'scale-125 bg-cyan-400 border-white shadow-[0_0_30px_rgba(34,211,238,0.8)]' : ''}`}>
            {active && <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-50" />}
        </div>

        {/* Energy Field */}
        {active && (
            <div className="absolute inset-[-10px] rounded-full bg-cyan-400/10 blur-xl animate-pulse" />
        )}
    </div>
)

// --- 3D Tilt Card Component with Spotlight ---
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // For Tilt
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    // For Spotlight (raw values for instant follow)
    const spotlightX = useMotionValue(0)
    const spotlightY = useMotionValue(0)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        const clientX = e.clientX - rect.left
        const clientY = e.clientY - rect.top

        const mouseXFromCenter = clientX - width / 2
        const mouseYFromCenter = clientY - height / 2

        // Tilt
        x.set(mouseXFromCenter / 40)
        y.set(mouseYFromCenter / -40)

        // Spotlight
        spotlightX.set(clientX)
        spotlightY.set(clientY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const tiltTransform = useMotionTemplate`rotateX(${mouseY}deg) rotateY(${mouseX}deg)`
    const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(34,211,238,0.10), transparent 40%)`

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: tiltTransform, transformStyle: "preserve-3d" }}
            className={`relative transition-all duration-200 ease-out group/tilt ${className}`}
        >
            {/* Spotlight Layer */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/tilt:opacity-100 z-30"
                style={{ background: spotlightBackground }}
            />
            {children}
        </motion.div>
    )
}

const Roadmap = () => {
    const phases = [
        {
            title: "Phase 01: The Foundation",
            date: "Q4 2025",
            status: "completed",
            note: "Protocol Initialization complete. Core systems stabilized. The foundation for decentralized temporal storage is now immutable.",
            items: [
                "Started 3 months ago",
                "Protocol Core on Rust/Anchor",
                "Private Security Audits",
                "Smart Contract Architecture"
            ]
        },
        {
            title: "Phase 02: Token Ignition",
            date: "Q1 2026",
            status: "current",
            note: "Network Ignition sequence engaged. Pump.fun launch parameters set. Community uplink established. Executing mass adoption protocols.",
            items: [
                "Fair Launch on Pump.fun",
                "Raydium DEX Listing",
                "Aggressive Marketing Campaign",
                "Capsulr Guardians Community"
            ]
        },
        {
            title: "Phase 03: The Expansion",
            date: "Q2 2026",
            status: "upcoming",
            note: "Expansion mode active. Integrating CEX nodes and scaling infrastructure. Security protocols running at maximum efficiency. Global reach imminent.",
            items: [
                "Capsulr Pass NFT Collection",
                "CoinGecko & CMC Listing",
                "CEX Listings (MEXC, Gate.io)",
                "Birdeye & Dexscreener Integration"
            ]
        },
        {
            title: "Phase 04: Infinite Ecosystem",
            date: "Q3-Q4 2026",
            status: "future",
            note: null,
            items: [
                "Capsulr Mobile App Launch",
                "Cross-Chain Bridges",
                "DAO Governance System",
                "Protocol Updates V2.0"
            ]
        }
    ]

    const [isCopied, setIsCopied] = useState(false)
    const contractAddress = "EEDo3xnRYUf7pmrAgqiNfXePFDvnHa3RbohQgP8U5bYT"

    const handleCopy = () => {
        navigator.clipboard.writeText(contractAddress)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })
    const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"])
    const ghostBgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <section className="py-24 md:py-40 relative overflow-hidden" ref={containerRef}>

            {/* --- Intelligent Background (Digital Ghost) --- */}
            <motion.div style={{ y: ghostBgY }} className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden mix-blend-screen">
                <div className="absolute top-[10%] left-[5%] text-cyan-900/20 font-mono text-xl md:text-2xl animate-float">S = k ln Ω</div>
                <div className="absolute top-[30%] right-[10%] text-cyan-900/20 font-mono text-2xl md:text-3xl animate-float" style={{ animationDelay: '2s' }}>t' = γt</div>
                <div className="absolute bottom-[20%] left-[15%] text-cyan-900/20 font-mono text-2xl animate-float" style={{ animationDelay: '5s' }}>H(m) = sha256(m)</div>
                <div className="absolute top-[50%] right-[25%] text-emerald-900/20 font-mono text-xl animate-float" style={{ animationDelay: '1s' }}>Curve25519</div>

                <div className="absolute top-[15%] right-[20%] text-6xl md:text-8xl font-black text-cyan-950/20 blur-sm">IMMUTABLE</div>
                <div className="absolute bottom-[10%] left-[10%] text-7xl md:text-9xl font-black text-cyan-950/20 blur-md">ETERNAL</div>
                <div className="absolute top-[40%] left-[20%] text-5xl md:text-7xl font-black text-cyan-950/20 blur-sm">PROOF OF TIME</div>
                <div className="absolute bottom-[30%] right-[10%] text-5xl md:text-7xl font-black text-cyan-950/20 blur-sm">DECENTRALIZED MEMORY</div>
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, ease: smoothEase }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 font-space-grotesk tracking-tight">
                        The Developer's <span className="text-cyan-400">Journey</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        From the first line of code to a decentralized ecosystem.
                    </p>
                </motion.div>


                <div className="relative max-w-6xl mx-auto">

                    {/* --- 3D Time Pipeline --- */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 rounded-full perspective-[200px]">
                        <div className="w-full h-full bg-gray-900 shadow-[0_0_10px_rgba(0,0,0,0.8)] rounded-full  border-x border-white/5 opacity-50" />
                        <motion.div
                            style={{ height: lineHeight }}
                            className="absolute top-0 left-0 w-full bg-cyan-500 rounded-full shadow-[0_0_30px_4px_rgba(34,211,238,0.5)] bg-gradient-to-b from-cyan-400 via-white to-cyan-400"
                        />
                    </div>

                    <div className="space-y-20 md:space-y-40">
                        {phases.map((phase, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row items-center justify-center gap-16 md:gap-0`}>

                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20">
                                    {phase.status !== 'future' && (
                                        <QuantumNode active={phase.status === 'completed' || phase.status === 'current'} />
                                    )}
                                </div>

                                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${index % 2 === 0 ? 'md:order-1 md:pr-24 text-left' : 'md:order-3 md:pl-24 text-left'}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: smoothEase, delay: index * 0.1 }}
                                    >
                                        <TiltCard className="group h-full">
                                            <div className={`relative h-full bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-700 hover:border-cyan-500/40 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.2)] animate-float`} style={{ animationDelay: `${index}s` }}>
                                                <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                <div className="absolute top-6 left-6 z-20 transform translate-z-20" style={{ transform: "translateZ(20px)" }}>
                                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${phase.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                        phase.status === 'current' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)] animate-pulse' :
                                                            'bg-white/5 text-gray-400 border border-white/5'
                                                        }`}>
                                                        {phase.date}
                                                    </div>
                                                </div>

                                                <div className="absolute right-6 top-6 opacity-20 transform translate-z-10 group-hover:scale-110 transition-transform duration-500" style={{ transform: "translateZ(30px)" }}>
                                                    <Cpu className="w-20 h-20 text-cyan-500" />
                                                </div>

                                                <div className="relative z-10 mt-8 transform" style={{ transform: "translateZ(20px)" }}>
                                                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-cyan-200 transition-colors pr-20">
                                                        {phase.title}
                                                    </h3>

                                                    <ul className="space-y-3">
                                                        {phase.items.map((item, i) => (
                                                            <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                                                                {phase.status !== 'future' ? (
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_cyan]" />
                                                                ) : (
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                                                )}
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </TiltCard>
                                    </motion.div>
                                </div>


                                {phase.note && (
                                    <div className={`w-full md:w-[45%] mt-6 md:mt-0 ${index % 2 === 0 ? 'md:order-3 md:pl-24' : 'md:order-1 md:pr-24 text-left md:text-right'} pl-16 md:pl-0`}>
                                        <div className="relative">
                                            <span className="absolute -left-6 -top-6 text-6xl opacity-10 font-serif text-cyan-100">“</span>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                viewport={{ once: true, amount: 0.4 }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                className="relative"
                                            >
                                                <div className="font-dancing text-xl md:text-3xl text-cyan-50/90 leading-relaxed whitespace-pre-wrap py-2 group cursor-default relative inline-block">
                                                    <span className="group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300">
                                                        {phase.note}
                                                    </span>
                                                </div>
                                            </motion.div>

                                            <span className="absolute -right-6 -bottom-8 text-6xl opacity-10 font-serif text-cyan-100">”</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Connectivity Hub (Spotlight Edition) --- */}
                <div className="max-w-7xl mx-auto mt-48">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <TiltCard className="group shadow-[0_0_50px_-20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_80px_-20px_rgba(34,211,238,0.2)] transition-shadow duration-500">
                            {/* Ultra transparent glass container */}
                            <div className="relative bg-black/20 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl overflow-hidden hover:border-cyan-400/50 transition-colors duration-500">

                                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">

                                    {/* --- Left: Verified Protocol Integrity --- */}
                                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-cyan-500/30 relative z-10">

                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                                                    <span className="text-sm font-bold text-emerald-100 tracking-wide drop-shadow-sm">Verified Protocol Integrity</span>
                                                </div>
                                            </div>

                                            <p className="text-cyan-100/60 text-base leading-relaxed mb-8 max-w-xl font-light">
                                                The official Capsulr smart contract address on Solana. Use this to verify protocol interactions or for direct liquidity swaps on decentralized exchanges.
                                            </p>

                                            <div className="bg-black/40 rounded-xl border border-cyan-500/40 p-5 mb-6 relative group/ca overflow-hidden transition-all duration-300 hover:bg-black/60 hover:border-cyan-400 shadow-[0_0_20px_-5px_rgba(34,211,238,0.15)]">
                                                <div className="font-mono text-lg md:text-xl font-bold text-cyan-50 break-all tracking-wide relative z-10 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                                                    {contractAddress}
                                                </div>
                                                {/* Scanning scanline inside CA box */}
                                                <div className="absolute top-0 left-0 h-full w-[2px] bg-cyan-400/50 shadow-[0_0_15px_cyan] animate-[scan-horizontal_3s_ease-in-out_infinite] opacity-0 group-hover/ca:opacity-100 transition-opacity" />
                                            </div>

                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCopy}
                                                className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all font-bold text-sm group/btn relative overflow-hidden ${isCopied
                                                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                                    : "bg-cyan-500/10 border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                                    }`}
                                            >
                                                {isCopied && <div className="absolute inset-0 bg-emerald-500/10 animate-ping" />}
                                                {isCopied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 group-hover/btn:text-white transition-colors" />}
                                                <span>{isCopied ? "Address Copied!" : "Copy Contract Address"}</span>
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* --- Right: Docs & Community --- */}
                                    <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-10 bg-white/[0.01] relative z-10">

                                        {/* Technical Blueprint */}
                                        <div className="group/docs">
                                            <h4 className="text-lg font-bold text-white mb-3 group-hover/docs:text-cyan-200 transition-colors">Technical Blueprint</h4>
                                            <p className="text-sm text-gray-400 mb-4 leading-relaxed group-hover/docs:text-gray-300 transition-colors">
                                                Explore the mathematical foundation of our time-lock technology. Learn how we utilize Solana&apos;s speed to ensure your digital legacy remains immutable.
                                            </p>
                                            <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm transition-colors group/link">
                                                <span>Read Docs</span>
                                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                            </a>
                                        </div>

                                        {/* Community Hub */}
                                        <div className="group/community">
                                            <h4 className="text-lg font-bold text-white mb-3 group-hover/community:text-cyan-200 transition-colors">Community Hub</h4>
                                            <p className="text-sm text-gray-400 mb-5 leading-relaxed group-hover/community:text-gray-300 transition-colors">
                                                Join the growing collective of Guardians. Be the first to hear about security audits, new unlock triggers, and upcoming feature reveals.
                                            </p>
                                            <div className="flex gap-4">
                                                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-cyan-500/20 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/50 hover:text-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.2)] transition-all duration-300 group/icon">
                                                    <Twitter className="w-5 h-5 transition-transform group-hover/icon:scale-110" />
                                                </a>
                                                <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-cyan-500/20 flex items-center justify-center text-gray-400 hover:bg-[#229ED9]/10 hover:border-[#229ED9]/50 hover:text-[#229ED9] hover:shadow-[0_0_20px_rgba(34,158,217,0.2)] transition-all duration-300 group/icon">
                                                    <Send className="w-5 h-5 transition-transform group-hover/icon:scale-110" />
                                                </a>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>

            </div>

            <style jsx global>{`
                @keyframes scan-horizontal {
                    0% { left: 0%; opacity: 0; }
                    10% { opacity: 0.5; }
                    90% { opacity: 0.5; }
                    100% { left: 100%; opacity: 0; }
                }
            `}</style>
        </section>
    )
}

export default Roadmap
