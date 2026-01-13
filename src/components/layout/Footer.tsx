"use client"

import { useState } from "react"
import Link from "next/link"
import { Hourglass, Twitter, Send, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import FAQModal from "@/components/modals/FAQModal"
import StatusModal from "@/components/modals/StatusModal"
import GuidesModal from "@/components/modals/GuidesModal"
import GovernanceModal from "@/components/modals/GovernanceModal"
import TermsModal from "@/components/modals/TermsModal"
import PrivacyModal from "@/components/modals/PrivacyModal"
import { motion } from "framer-motion"

const Footer = () => {
  const [isFAQOpen, setIsFAQOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isGuidesOpen, setIsGuidesOpen] = useState(false)
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  // 80s Neon Flicker Animation
  const neonGlow = {
    textShadow: [
      "0 0 2px #22d3ee, 0 0 4px #22d3ee, 0 0 6px #22d3ee, 0 0 10px #22d3ee, 0 0 45px #22d3ee",
      "0 0 2px #22d3ee, 0 0 4px #22d3ee, 0 0 6px #22d3ee, 0 0 10px #22d3ee, 0 0 25px #22d3ee",
      "0 0 2px #22d3ee, 0 0 4px #22d3ee, 0 0 6px #22d3ee, 0 0 10px #22d3ee, 0 0 45px #22d3ee",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }
  }

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Hourglass className="h-8 w-8 text-cyan-400" />
              <span className="font-space-grotesk text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">
                Capsulr
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              The On-Chain Time Capsule Network. Create, lock, and reveal digital time capsules on the blockchain.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter className="h-5 w-5" />} label="X (Twitter)" />
              <SocialIcon icon={<Send className="h-5 w-5" />} label="Telegram" />
              <SocialIcon icon={<Pill className="h-5 w-5" />} label="Pump.fun" />
            </div>
          </div>

          <div>
            <motion.h4
              animate={neonGlow}
              className="text-cyan-400 font-bold mb-6 text-lg tracking-widest font-space-grotesk uppercase"
            >
              Product
            </motion.h4>
            <ul className="space-y-2">
              <FooterLink href="/capsules">Capsules</FooterLink>
              <FooterLink href="/marketplace">Marketplace</FooterLink>
              <FooterLink href="/roadmap">Roadmap</FooterLink>
              <FooterLink href="/statistics">Statistics</FooterLink>
            </ul>
          </div>

          <div>
            <motion.h4
              animate={neonGlow}
              className="text-cyan-400 font-bold mb-6 text-lg tracking-widest font-space-grotesk uppercase"
            >
              Resources
            </motion.h4>
            <ul className="space-y-2">
              <FooterLink href="/documentation">Documentation</FooterLink>
              <li>
                <button
                  onClick={() => setIsGuidesOpen(true)}
                  className="text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors text-left"
                >
                  Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsStatusOpen(true)}
                  className="text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors text-left flex items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  API Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsFAQOpen(true)}
                  className="text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <motion.h4
              animate={neonGlow}
              className="text-cyan-400 font-bold mb-6 text-lg tracking-widest font-space-grotesk uppercase"
            >
              Legal & Gov
            </motion.h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsGovernanceOpen(true)}
                  className="text-gray-400 hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors text-left"
                >
                  Governance
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <div>© 2026 Capsulr. All rights reserved.</div>
        </div>
      </div>

      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
      <StatusModal isOpen={isStatusOpen} onClose={() => setIsStatusOpen(false)} />
      <GuidesModal isOpen={isGuidesOpen} onClose={() => setIsGuidesOpen(false)} />
      <GovernanceModal isOpen={isGovernanceOpen} onClose={() => setIsGovernanceOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
      {children}
    </Link>
  </li>
)

interface SocialIconProps {
  icon: React.ReactNode
  label?: string
}

const SocialIcon = ({ icon, label }: SocialIconProps) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-12 w-12 rounded-2xl bg-black border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
    title={label}
  >
    {icon}
  </Button>
)

export default Footer
