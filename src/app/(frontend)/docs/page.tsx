"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    BookOpen,
    Shield,
    Coins,
    Map,
    ChevronRight,
    ExternalLink,
    Cpu,
    Lock,
    Zap,
    Terminal,
    Layers,
    Globe,
    CheckCircle2,
    Database,
    Unlink,
    Server,
    Code2,
    ShieldCheck,
    Activity,
    ArrowRight,
    Webhook,
    Key,
    Flame,
    Users,
    Search,
    Copy,
    Check,
    Compass,
    Link,
    ShieldAlert,
    HardDrive,
    BarChart3,
    GitBranch,
    Settings
} from "lucide-react"

// --- Global Tier-1 Components ---

const GlassCard = ({ children, className = "", hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
    <div className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500 ${hover ? 'hover:border-cyan-500/30 hover:bg-white/[0.05] group' : ''} ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">{children}</div>
    </div>
)

const IconWrapper = ({ icon: Icon, color = "text-cyan-400" }: { icon: any, color?: string }) => (
    <div className="p-3 bg-white/[0.05] border border-white/10 rounded-xl w-fit mb-4 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:border-cyan-500/30 transition-colors">
        <Icon size={20} strokeWidth={1.5} className={color} />
    </div>
)

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
    <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {children}
        </h2>
        {subtitle && <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
)

const CodeBlock = ({ code, language = "bash" }: { code: string, language?: string }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] my-6">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{language}</span>
                <button onClick={copyToClipboard} className="text-gray-500 hover:text-cyan-400 transition-colors">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-cyan-400/90 leading-relaxed">{code}</code>
            </pre>
        </div>
    )
}

const NavItem = ({ id, label, icon: Icon, active, onClick }: { id: string, label: string, icon: any, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active
            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_25px_-5px_rgba(34,211,238,0.2)]"
            : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
    >
        <div className={`p-2 rounded-lg transition-colors ${active ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-gray-500 group-hover:text-gray-300"}`}>
            <Icon size={18} strokeWidth={1.5} />
        </div>
        <span className="font-medium text-sm md:text-base tracking-tight">{label}</span>
        {active && (
            <motion.div
                layoutId="activeIndicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
            />
        )}
    </button>
)

// --- Sections ---

const Introduction = () => (
    <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
    >
        <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Activity size={14} className="animate-pulse" />
                Protocol v1.2 Live
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-space-grotesk tracking-tighter bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent leading-none">
                Welcome to <br /> Capsulr Protocol
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed max-w-3xl font-light">
                Capsulr is a decentralized infrastructure layer for temporal data encryption and scheduled revelation on Solana. By leveraging the high-speed Sealevel runtime and the permanent immutability of Arweave, we provide a trustless mechanism for time-locked assets and information. Our mission is to transform &quot;Time&quot; into a programmable primitive for DeFi, SocialFi, and digital inheritance.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard>
                <IconWrapper icon={Layers} />
                <h3 className="text-xl font-bold mb-3 text-white">On-Chain Precision</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Cryptographically guaranteed unlock conditions synced with Solana&apos;s network time. Ensures high-precision execution for all temporal triggers across the global cluster.
                </p>
            </GlassCard>
            <GlassCard>
                <IconWrapper icon={ShieldCheck} />
                <h3 className="text-xl font-bold mb-3 text-white">Non-Custodial Vaults</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Your keys, your capsules. We utilize client-side AES-256-GCM encryption. No single entity, including protocol nodes, ever has access to your raw payload before the trigger condition is met.
                </p>
            </GlassCard>
            <GlassCard>
                <IconWrapper icon={Zap} />
                <h3 className="text-xl font-bold mb-3 text-white">Advanced Triggers</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Beyond simple timestamps, Capsulr supports complex logic-based triggers: specific slot heights, Oracle price feeds (Pyth/Switchboard), or custom cross-chain events.
                </p>
            </GlassCard>
            <GlassCard>
                <IconWrapper icon={Globe} />
                <h3 className="text-xl font-bold mb-3 text-white">Distributed Integrity</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    The protocol utilizes a decentralized network of Guardians who manage the shard-based decryption sequence, ensuring liveness without any centralized point of failure.
                </p>
            </GlassCard>
        </div>
    </motion.section>
)

const Whitepaper = () => (
    <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
    >
        <SectionTitle subtitle="A deep dive into the technical architecture of the Capsulr network.">
            Protocol Stack
        </SectionTitle>

        <div className="space-y-4 max-w-4xl mx-auto">
            {[
                {
                    level: "Layer 4",
                    title: "Client-Side Encryption",
                    desc: "AES-256-GCM / End-to-End Privacy / Zero-Knowledge Framework",
                    icon: Shield,
                    color: "border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                },
                {
                    level: "Layer 3",
                    title: "Arweave Storage",
                    desc: "Permanent Data Availability / Immutability",
                    icon: Database,
                    color: "border-white/20 bg-white/5"
                },
                {
                    level: "Layer 2",
                    title: "Capsulr Logic",
                    desc: "Rust & Anchor Smart Contracts / On-Chain State Management",
                    icon: Code2,
                    color: "border-white/20 bg-white/5"
                },
                {
                    level: "Layer 1",
                    title: "Solana Mainnet",
                    desc: "High-Throughput Execution / Network Settlement",
                    icon: Cpu,
                    color: "border-white/20 bg-white/5"
                },
            ].map((layer, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-6 p-6 border rounded-2xl relative group overflow-hidden ${layer.color}`}
                >
                    <div className="flex-shrink-0 w-16 text-xs font-mono font-bold text-gray-500 uppercase tracking-tighter">
                        {layer.level}
                    </div>
                    <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1">{layer.title}</h4>
                            <p className="text-sm text-gray-400">{layer.desc}</p>
                        </div>
                        <layer.icon className="text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" size={24} strokeWidth={1.5} />
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="space-y-12">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Lock size={24} strokeWidth={1.5} className="text-cyan-400" />
                    Symmetric Encryption & Fragmentation
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="border-cyan-500/10 h-full">
                        <h4 className="text-white font-bold mb-4">Authenticated Encryption (AES-256-GCM)</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Capsulr utilizes AES-256-GCM for high-performance, authenticated encryption of all user payloads. This standard ensures both data confidentiality and integrity; any attempt to tamper with the encrypted data stored on Arweave is immediately detectable during the decryption process, preventing unauthorized modification of your digital legacy.
                        </p>
                    </GlassCard>

                    <GlassCard className="border-blue-500/10 h-full">
                        <h4 className="text-white font-bold mb-4">Threshold Cryptography</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            To eliminate single points of failure, the protocol conceptually applies Shamir&apos;s Secret Sharing (SSS) principles to the decryption keys. This ensures that no single entity or protocol node possesses the full key before the trigger conditions are met.
                        </p>
                    </GlassCard>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Key Sharding", desc: "Decryption keys are fragmented into unique shards upon creation." },
                    { title: "Decentralized Custody", desc: "Shards are distributed across a decentralized network of Guardians." },
                    { title: "Trigger-Based", desc: "Full key reconstruction occurs only after cryptographic verification." },
                    { title: "Non-Custodial", desc: "Users maintain absolute sovereignty; creators cannot be locked out." }
                ].map((item, i) => (
                    <div key={i} className="p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:border-cyan-500/20 transition-all">
                        <h5 className="text-cyan-400 font-bold text-xs mb-2">{item.title}</h5>
                        <p className="text-gray-500 text-[10px] leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </motion.section>
)

const Tokenomics = () => (
    <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
    >
        <SectionTitle subtitle="Understanding the economic engine and distribution of the Capsulr ecosystem.">
            Tokenomics ($CAPS)
        </SectionTitle>

        <div className="space-y-12">
            {/* Allocation Progress Bar */}
            <div className="space-y-6">
                <div className="flex justify-between items-end mb-2">
                    <div className="space-y-1">
                        <h4 className="text-white font-bold text-lg">Distribution Model</h4>
                        <p className="text-gray-500 text-sm">100% Fair Launch Distribution on Solana</p>
                    </div>
                    <div className="text-right">
                        <span className="text-cyan-400 font-mono text-2xl font-bold">1,000,000,000</span>
                        <span className="text-gray-500 text-sm block font-mono">Max Supply</span>
                    </div>
                </div>

                <div className="relative h-12 w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 flex">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "96.6%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-cyan-400 relative group"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-20" />
                        <div className="absolute inset-0 flex items-center px-4">
                            <span className="text-black font-bold text-xs md:text-sm truncate uppercase">96.6% Community & Liquidity</span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "3.4%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gray-700 flex items-center justify-end px-4"
                    >
                        <span className="text-white/40 font-bold text-[10px] whitespace-nowrap uppercase">3.4% Ecosystem Growth</span>
                    </motion.div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard className="p-4 border-white/5">
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">Ticker</p>
                    <p className="text-xl font-bold text-white">$CAPS</p>
                </GlassCard>
                <GlassCard className="p-4 border-white/5">
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">Network</p>
                    <p className="text-xl font-bold text-white">Solana (SPL)</p>
                </GlassCard>
                <GlassCard className="p-4 border-white/5">
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">Mint Authority</p>
                    <p className="text-xl font-bold text-red-400">Revoked</p>
                </GlassCard>
                <GlassCard className="p-4 border-white/5">
                    <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">Initial LP</p>
                    <p className="text-xl font-bold text-emerald-400">100% Burned</p>
                </GlassCard>
            </div>

            {/* Utility and Security */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Zap className="text-cyan-400" size={24} />
                        Token Utility
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { title: "Governance & Voting", desc: "$CAPS holders decide on fee structures, oracle integrations, and roadmap priorities." },
                            { title: "Guardian Staking", desc: "Stake $CAPS to run Guardian Nodes and earn protocol fees for securing the network." },
                            { title: "Service Discounts", desc: "Holders receive discounted rates on premium capsules and advanced oracle triggers." },
                            { title: "Protocol Incentives", desc: "Boosted yield for long-term time-locked liquidity positions within the ecosystem." }
                        ].map((u, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                                <CheckCircle2 className="text-cyan-400 flex-shrink-0" size={18} />
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">{u.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{u.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="text-emerald-400" size={24} />
                        Protocol Security & Trust
                    </h3>
                    <div className="space-y-4">
                        <GlassCard className="border-emerald-500/10">
                            <h4 className="text-white font-bold text-sm mb-2">Immutable Supply</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">
                                The contract&apos;s minting function has been disabled. The total supply is fixed at 1 billion $CAPS, rendering any future inflation or dilution impossible.
                            </p>
                        </GlassCard>
                        <GlassCard className="border-cyan-500/10 text-cyan-400 bg-cyan-400/5">
                            <h4 className="font-bold text-sm mb-2">Ownership Renounced</h4>
                            <p className="text-cyan-400/70 text-xs leading-relaxed">
                                Protocol control is being transitioned to the Capsulr DAO. No single entity or developer can modify the core token logic or access the treasury unilaterally.
                            </p>
                        </GlassCard>
                    </div>
                    <div className="p-6 border border-white/10 rounded-2xl bg-[#0a0a0a]">
                        <h4 className="text-white font-bold text-sm mb-3">Technical Implementation</h4>
                        <p className="text-gray-500 text-[11px] leading-relaxed">
                            Capsulr utilized a 100% fair launch mechanism on Pump.fun to ensure organic price discovery. By transitioning to Raydium with burned LP, the protocol ensured a decentralized distribution from &quot;block zero&quot;, with no private rounds or seed allocations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </motion.section>
)

const Roadmap = () => {
    const roadmapItems = [
        {
            phase: "Phase 1: Q4 2025",
            title: "Protocol Genesis",
            status: "Completed",
            items: [
                "Core Development: Finalization of the Capsulr core logic using Rust and the Anchor framework on Solana.",
                "Security Architecture: Completion of internal smart contract audits and stress-testing of the time-lock mechanism.",
                "Infrastructure Setup: Deployment of the Mainnet-Beta environment and integration with Arweave for permanent data availability.",
                "Technical Validation: Successful completion of private security audits to ensure cryptographic integrity."
            ]
        },
        {
            phase: "Phase 2: Q1 2026",
            title: "Network Ignition",
            status: "Active",
            items: [
                "Fair Launch Protocol: Initiation of the $CAPS token fair launch on Pump.fun with 100% community distribution.",
                "Liquidity Bootstrapping: Automated graduation to Raydium with permanent liquidity burning to ensure protocol stability.",
                "Guardian Onboarding: Launch of the Capsulr Guardians Hub, establishing the first wave of decentralized node operators.",
                "Ecosystem Growth: Implementation of strategic community alignment programs and protocol awareness campaigns."
            ]
        },
        {
            phase: "Phase 3: Q2 2026",
            title: "Utility & Scaling",
            status: "Upcoming",
            items: [
                "Capsulr Pass NFT: Release of the utility-driven NFT collection, providing holders with tiered access and governance multipliers.",
                "Exchange Expansion: Strategic listings on Tier-1 Centralized Exchanges (CEX) to enhance global liquidity and reach.",
                "Governance V1: Deployment of the on-chain DAO framework, allowing $CAPS holders to vote on protocol parameters.",
                "Aggregator Integration: Seamless integration with multi-DEX aggregators (Jupiter/Birdeye) for optimized token swaps."
            ]
        },
        {
            phase: "Phase 4: Q3-Q4 2026",
            title: "Infinite Ecosystem",
            status: "Future",
            items: [
                "Mobile-First Access: Launch of the Capsulr Mobile Application for seamless capsule creation and management on the go.",
                "Cross-Chain Time Bridges: Expansion of temporal data availability to other high-performance chains via interoperability protocols.",
                "Full DAO Sovereignty: Transition to a fully community-governed model with total control over the protocol treasury.",
                "Protocol V2.0: Major performance update focused on micro-settlement efficiency and advanced oracle-trigger complexity."
            ]
        }
    ]

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
        >
            <SectionTitle subtitle="Our strategic trajectory and technological milestones toward a decentralized temporal layer.">
                Project Roadmap
            </SectionTitle>

            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-4 md:left-[2.5rem] top-2 bottom-2 w-[1px] bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-white/5" />

                <div className="space-y-12">
                    {roadmapItems.map((item, i) => (
                        <div key={i} className="relative pl-12 md:pl-24">
                            <div className={`absolute left-[0.75rem] md:left-[2.25rem] top-2 w-6 h-6 -translate-x-1/2 rounded-full border-4 border-black z-10 ${item.status === 'Completed' ? 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' :
                                item.status === 'Active' ? 'bg-white border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]' :
                                    'bg-gray-800 border-gray-700'
                                }`}>
                                {item.status === 'Active' && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50" />}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-4"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-2">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border w-fit ${item.status === 'Completed' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                        item.status === 'Active' ? 'bg-white/10 text-white border-white/20' :
                                            'bg-white/5 text-gray-500 border-white/5'
                                        }`}>
                                        {item.phase}
                                    </span>
                                    <h4 className="text-2xl font-bold text-white tracking-tight">{item.title}</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.items.map((sub, j) => (
                                        <div key={j} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5 group hover:border-cyan-500/10 transition-colors">
                                            <CheckCircle2 size={16} className={`${item.status === 'Completed' || item.status === 'Active' ? 'text-cyan-400' : 'text-gray-600'} mt-0.5`} strokeWidth={1.5} />
                                            <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-tight font-light">{sub}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

// --- API & SDK Section ---

const API = () => (
    <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
    >
        <SectionTitle subtitle="Technical specifications for seamless protocol integration and cross-program invocation.">
            API & SDK Deep Dive
        </SectionTitle>

        {/* Account Architecture */}
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Webhook className="text-cyan-400" size={24} />
                Account Architecture: Deterministic Resource Addressing
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                Capsulr utilizes Program Derived Addresses (PDAs) to maintain a decentralized registry of all time-locked assets. This architecture allows for deterministic lookups without the need for centralized indexing. Each capsule is a unique vault account, secured by seeds that bind it to its creator and its order in the global registry.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                        <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/5 pb-2">PDA Seed Derivation</h4>
                        <ul className="space-y-2 text-xs font-mono">
                            <li className="flex justify-between">
                                <span className="text-gray-500">Static Prefix</span>
                                <span className="text-cyan-400">u8"capsule"</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-500">Creator</span>
                                <span className="text-cyan-400">Pubkey (Wallet Address)</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-500">Nonce</span>
                                <span className="text-cyan-400">u64 (Monotonic Counter)</span>
                            </li>
                        </ul>
                    </div>
                    <p className="text-[10px] text-gray-500 italic pl-2 border-l-2 border-cyan-500/30">
                        Developer Note: By using PDAs as vaults, Capsulr ensures that assets are held by the program itself, not a middleman, providing 100% non-custodial security.
                    </p>
                </div>

                <CodeBlock code={`const [capsulePda] = await PublicKey.findProgramAddress(
  [
    Buffer.from("capsule"),
    creator.toBuffer(),
    new anchor.BN(nonce).toArrayLike(Buffer, "le", 8),
  ],
  PROGRAM_ID
);`} language="typescript" />
            </div>
        </div>

        {/* Smart Contract Core */}
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Smart Contract Core (Anchor Framework)</h3>
                <p className="text-gray-400 text-sm max-w-3xl">
                    The protocol is engineered using the Anchor Framework, providing high-level security abstractions and a standardized Instruction Data format. A comprehensive IDL (Interface Definition Language) is available on-chain for seamless integration with frontend frameworks.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "initialize", desc: "Provisions the vault PDA, transfers collateral (SOL/SPL/NFT) into the smart contract, and binds immutable unlock triggers." },
                    { label: "unlock", desc: "Verifies the cryptographic state of the trigger, validates SSS fragments, and releases the payload to the recipient." },
                    { label: "gift", desc: "Atomic ownership transfer. Allows the current owner to transfer the 'claim right' to another wallet without moving assets." },
                ].map((item, i) => (
                    <GlassCard key={i} className="p-5 border-white/5 h-full">
                        <div className="flex items-center gap-2 mb-3">
                            <Terminal size={14} className="text-cyan-400" />
                            <p className="text-white font-mono text-sm font-bold">{item.label}</p>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </GlassCard>
                ))}
            </div>
        </div>

        {/* SDK & Errors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">SDK Integration</h3>
                <p className="text-gray-400 text-sm">
                    The <span className="text-cyan-400 font-mono">@capsulr/sdk</span> provides a high-level abstraction layer over the raw Solana JSON-RPC API.
                </p>
                <CodeBlock code={`import { CapsulrSDK } from "@capsulr/sdk";
const sdk = new CapsulrSDK(connection, wallet);
// Fetch all capsules for a user
const capsules = await sdk.fetchAllUserCapsules(publicKey);`} language="typescript" />
            </div>

            <GlassCard className="border-red-500/10 bg-red-500/[0.02]">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                    <ShieldAlert size={16} className="text-red-400" />
                    Common Error Handling
                </h4>
                <div className="space-y-3 font-mono text-[10px]">
                    <div className="flex flex-col gap-1 pb-2 border-b border-white/5">
                        <span className="text-white/60 font-bold">0x1770 (UnlockTriggerNotMet)</span>
                        <span className="text-gray-500">Attempted call before block-height/oracle condition satisfied.</span>
                    </div>
                    <div className="flex flex-col gap-1 pb-2 border-b border-white/5">
                        <span className="text-white/60 font-bold">0x1771 (InvalidGuardianSignature)</span>
                        <span className="text-gray-500">Provided SSS fragment or guardian signature failed verification.</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-white/60 font-bold">0x1772 (CapsuleAlreadyOpened)</span>
                        <span className="text-gray-500">Target vault has already been drained and decommissioned.</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    </motion.section>
)

// --- Security & Audits Section ---

const Security = () => (
    <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
    >
        <SectionTitle subtitle="Cryptographic rigor and decentralized robustness at the core of temporal data.">
            Security Infrastructure
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="text-red-400" size={24} />
                    Multi-Layer Protection Architecture
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GlassCard className="border-cyan-500/10 h-full">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                            <Key size={18} className="text-cyan-400" />
                            Authenticated Encryption (AES-GCM)
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            Capsulr utilizes AES-256-GCM to ensure user payloads are never exposed in plaintext. The GCM mode provides built-in authentication, preventing &quot;bit-flipping&quot; attacks—ensuring that even slight tampering with encrypted packets on Arweave renders them invalid rather than corrupted.
                        </p>
                    </GlassCard>
                    <GlassCard className="border-blue-500/10 h-full">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
                            <Unlink size={18} className="text-blue-400" />
                            Threshold Key Fragmentation
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            Keys are fragmented into a 5-of-7 threshold configuration using Shamir&apos;s Secret Sharing (SSS). This ensures fault tolerance: key reconstruction is programmatically impossible until the smart contract verifies the specific on-chain trigger, regardless of node collusion.
                        </p>
                    </GlassCard>
                </div>


            </div>


        </div>
    </motion.section>
)

// --- Staking Section ---



// --- Ecosystem Section ---

const Ecosystem = () => (
    <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
    >
        <SectionTitle subtitle="Beyond the protocol: Building a transparent and collaborative future for temporal data.">
            Community & Developer Ecosystem
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Terminal className="text-cyan-400" size={24} />
                        Hackathon & Builder Focus
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Capsulr isn’t just a tool; it’s a movement born in the heart of the Solana developer community. We are active participants and sponsors in global Solana Hackathons (such as Renaissance and Hyperdrive), empowering builders to use our time-lock primitive to solve real-world problems.
                    </p>
                    <div className="space-y-3 mt-4">
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl border-l-[3px] border-l-cyan-400">
                            <h4 className="text-white font-bold text-sm mb-1">Hackathon Support</h4>
                            <p className="text-gray-500 text-xs">We offer specialized mentorship and technical resources for teams integrating Capsulr into their submissions.</p>
                        </div>
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl border-l-[3px] border-l-emerald-400">
                            <h4 className="text-white font-bold text-sm mb-1">Bounty Program</h4>
                            <p className="text-gray-500 text-xs">Regular bounties for developers who create unique triggers or integration modules for the protocol.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <GlassCard className="h-full border-cyan-500/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Globe size={20} className="text-cyan-400" />
                        The Guardian Network Hub
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "𝕏 (Twitter) — Protocol Alpha", desc: "Real-time announcements & strategic partnerships.", link: "Follow @CapsulrProtocol" },
                            { label: "Telegram — Guardian Collective", desc: "Core community support & developer discussions.", link: "Join the Collective" },
                            { label: "GitHub — Open Source Blueprint", desc: "Verify our cryptographic integrity.", link: "Explore Code" },
                            { label: "Pump.fun — Fair Launch Heritage", desc: "Roots embedded in community-driven liquidity.", link: "View Genesis" },
                        ].map((social, i) => (
                            <div key={i} className="flex flex-col gap-1 p-3 hover:bg-white/5 rounded-lg transition-colors group cursor-pointer">
                                <span className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{social.label}</span>
                                <span className="text-gray-500 text-xs">{social.desc}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>

        <div className="space-y-12">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BarChart3 className="text-cyan-400" size={24} />
                    Growth & Builder Support
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                    Our mission is to expand the Capsulr footprint through aggressive market presence and direct developer engagement. We don&apos;t just build; we scale.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                        <h4 className="text-white font-bold text-sm mb-2">Strategic Token Promotion</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">Aggressive allocation of resources toward global marketing campaigns, KOL partnerships, and exchange visibility to maximize $CAPS awareness and liquidity.</p>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                        <h4 className="text-white font-bold text-sm mb-2">Hackathon Acceleration</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">Active participation and sponsorship of global Solana ecosystem hackathons. We provide direct technical support and grant incentives.</p>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                        <h4 className="text-white font-bold text-sm mb-2">Continuous Evolution</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">A commitment to high-frequency development cycles. We ship new features, oracle integrations, and performance updates weekly.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-xl font-bold text-white">Strategic Partnership Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Tier 1: Community",
                            focus: "Local Awareness & Memes",
                            target: "Community leaders and creators driving organic token interest.",
                            color: "border-cyan-500/20"
                        },
                        {
                            title: "Tier 2: Dev & Integration",
                            focus: "Live MVPs & dApps",
                            target: "Teams building 'Powered by Capsulr' applications with functional UIs.",
                            color: "border-blue-500/20"
                        },
                        {
                            title: "Tier 3: Core Infrastructure",
                            focus: "Infrastructure Critical",
                            target: "Tier-1 Solana protocols and infrastructure teams building cross-chain bridges.",
                            color: "border-purple-500/20"
                        },
                    ].map((tier, i) => (
                        <GlassCard key={i} className={`${tier.color} p-6 h-full flex flex-col justify-between`}>
                            <div>
                                <h4 className="text-white font-bold mb-2">{tier.title}</h4>
                                <p className="text-cyan-400/80 text-xs font-bold mb-2 uppercase tracking-wide">{tier.focus}</p>
                                <p className="text-gray-500 text-xs leading-relaxed">{tier.target}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    </motion.section>
)

// --- Governance Section ---



// --- Main Page Component ---

export default function DocsPage() {
    const [activeTab, setActiveTab] = useState("intro")

    const navigation = [
        { id: "intro", label: "Protocol Intro", icon: BookOpen },
        { id: "whitepaper", label: "Technology Stack", icon: Cpu },
        { id: "tokenomics", label: "Tokenomics", icon: Coins },
        { id: "roadmap", label: "Roadmap", icon: Map },
        { id: "api", label: "API & SDK", icon: Webhook },
        { id: "security", label: "Security & Audits", icon: ShieldCheck },

        { id: "ecosystem", label: "Ecosystem", icon: Globe },

    ]

    const renderContent = () => {
        switch (activeTab) {
            case "intro": return <Introduction />
            case "whitepaper": return <Whitepaper />
            case "tokenomics": return <Tokenomics />
            case "roadmap": return <Roadmap />
            case "api": return <API />
            case "security": return <Security />

            case "ecosystem": return <Ecosystem />

            default: return <Introduction />
        }
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans relative overflow-hidden">
            {/* Animated Background from Explore Capsules */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-cyan-900/20" />

                <motion.div
                    className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 30, 0],
                        scale: [1, 0.8, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="absolute inset-0">
                    {[...Array(120)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            initial={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random(),
                                scale: Math.random() * 0.5 + 0.5,
                            }}
                            animate={{
                                opacity: [0.1, 1, 0.1],
                                scale: [0.5, 1.2, 0.5],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5,
                            }}
                            style={{
                                width: Math.random() < 0.3 ? '3px' : '1px',
                                height: Math.random() < 0.3 ? '3px' : '1px',
                                boxShadow: Math.random() < 0.3 ? '0 0 6px rgba(255,255,255,0.9)' : 'none',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 pt-32 pb-32 relative z-10 transition-all duration-500">
                <div className="flex flex-col lg:flex-row gap-16 lg:px-8">

                    {/* Sidebar */}
                    <aside className="lg:w-80 flex-shrink-0">
                        <div className="sticky top-32 space-y-10">
                            <div className="space-y-3">
                                <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em] font-space-grotesk">Protocol Core</p>
                                <h1 className="text-4xl font-black font-space-grotesk tracking-tighter text-white">
                                    DOCS
                                </h1>
                                <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full" />
                            </div>

                            <nav className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                {navigation.map((item) => (
                                    <NavItem
                                        key={item.id}
                                        id={item.id}
                                        label={item.label}
                                        icon={item.icon}
                                        active={activeTab === item.id}
                                        onClick={() => {
                                            setActiveTab(item.id)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}
                                    />
                                ))}
                            </nav>

                            <GlassCard className="mt-12 group" hover={false}>
                                <div className="flex items-center gap-3 mb-4 text-cyan-400">
                                    <Terminal size={18} strokeWidth={1.5} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] font-space-grotesk">Build v1.2.4-stable</span>
                                </div>
                                <p className="text-xs text-gray-400 mb-6 leading-relaxed font-light">
                                    The latest protocol specifications are synchronized with Solana Mainnet-Beta.
                                </p>
                                <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all uppercase tracking-widest flex items-center justify-center gap-2 group">
                                    Protocol Status
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                                </button>
                            </GlassCard>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>

                        {/* Footer Navigation */}
                        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-6">
                                <div className="space-y-1">
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Protocol Version</p>
                                    <p className="text-white font-mono text-sm tracking-tighter">BUILD_HASH_0X22D3EE</p>
                                </div>
                                <div className="h-8 w-[1px] bg-white/10" />
                                <div className="space-y-1">
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Oracle Status</p>
                                    <p className="text-emerald-400 font-mono text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_5px_#34d399]" />
                                        HEALTHY
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all text-xs font-bold text-gray-300">
                                    <ExternalLink size={14} strokeWidth={1.5} />
                                    GITHUB OSS
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all text-xs font-bold text-cyan-400">
                                    <ArrowRight size={14} strokeWidth={1.5} />
                                    CREATE CAPSULE
                                </button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.3);
        }
      `}</style>
        </div>
    )
}
