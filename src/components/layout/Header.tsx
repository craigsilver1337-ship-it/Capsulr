"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Menu,
  X,
  Hourglass,
  Users,
  Lock,
  ChevronDown,
  LogOut,
  Copy,
  FileText
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAccount, useDisconnect } from "wagmi"
import { ConnectBtn } from "../connectButton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full bg-black/30 backdrop-blur-3xl border border-white/10 shadow-[0_4px_30px_-10px_rgba(34,211,238,0.2)] flex items-center justify-between px-4 py-3"
      >
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="hover:rotate-180 transition-transform duration-300">
            <Hourglass className="h-8 w-8 text-cyan-400" />
          </div>
          <span className="font-space-grotesk text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600 hidden sm:inline-block">
            Capsulr
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 flex-1 px-4">
          <NavLink href="/my-capsule">Explore Capsules</NavLink>
          <NavLink href="/gifted-capsule">Gifted Capsules</NavLink>
          <NavLink href="/feed">Community</NavLink>
          <NavLink href="/docs">Docs</NavLink>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Wallet Connection - Visible on Mobile but Compact */}
          {isConnected && address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-cyan-500/50 hover:border-cyan-500 text-white flex items-center gap-2 whitespace-nowrap rounded-full px-3 sm:px-4 h-9 sm:h-10 text-xs sm:text-sm"
                >
                  <span className="font-mono">{formatAddress(address)}</span>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700">
                <DropdownMenuItem
                  onClick={() => copyToClipboard(address)}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Address
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  onClick={() => disconnect()}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="whitespace-nowrap scale-90 sm:scale-100 origin-right">
              <ConnectBtn />
            </div>
          )}

          {/* Create Button - Desktop Only */}
          <Button
            className="hidden lg:flex bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white whitespace-nowrap rounded-full px-6"
            onClick={() => router.push("/create")}
          >
            Create Capsule
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-300 hover:text-white ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile menu - Full screen overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col pt-24 lg:hidden">
          <div className="container mx-auto px-6 flex flex-col gap-6">
            <MobileNavLink href="/my-capsule" icon={<Clock className="w-5 h-5 text-cyan-400" />} onClick={() => setMobileMenuOpen(false)}>Explore Capsules</MobileNavLink>
            <MobileNavLink href="/gifted-capsule" icon={<Lock className="w-5 h-5 text-cyan-400" />} onClick={() => setMobileMenuOpen(false)}>Gifted Capsules</MobileNavLink>
            <MobileNavLink href="/feed" icon={<Users className="w-5 h-5 text-cyan-400" />} onClick={() => setMobileMenuOpen(false)}>Community</MobileNavLink>
            <MobileNavLink href="/docs" icon={<FileText className="w-5 h-5 text-cyan-400" />} onClick={() => setMobileMenuOpen(false)}>Docs</MobileNavLink>

            <div className="h-px bg-white/10 my-2" />

            <div className="flex flex-col gap-4">
              {isConnected && address ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-gray-400 text-sm">Connected as:</span>
                    <span className="font-mono text-cyan-400 font-medium">{formatAddress(address)}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/50 hover:border-red-500 text-red-400 hover:text-red-300 hover:bg-red-950/30 h-12 rounded-xl"
                    onClick={() => disconnect()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect Wallet
                  </Button>
                </div>
              ) : (
                <div className="w-full [&>button]:w-full [&>button]:justify-center [&>button]:h-12 [&>button]:rounded-xl">
                  <ConnectBtn />
                </div>
              )}
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white h-12 rounded-xl text-lg font-medium shadow-[0_0_20px_-5px_rgba(34,211,238,0.5)]"
                onClick={() => {
                  router.push("/create")
                  setMobileMenuOpen(false)
                }}
              >
                Create Capsule
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-white transition-colors relative group py-2 whitespace-nowrap"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 group-hover:w-full transition-all duration-300 ease-out"></span>
  </Link>
)

interface MobileNavLinkProps {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  onClick?: () => void
}

const MobileNavLink = ({ href, children, icon, onClick }: MobileNavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center gap-4 text-xl font-medium text-gray-200 hover:text-white p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
  >
    {icon}
    {children}
  </Link>
)

export default Header