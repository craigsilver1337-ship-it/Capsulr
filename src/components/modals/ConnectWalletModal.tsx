"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WalletButton } from "@rainbow-me/rainbowkit";
import { X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ConnectWalletModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    trigger?: React.ReactNode;
}

const WalletOption = ({ wallet, name, icon }: { wallet: string, name: string, icon: string }) => (
    <WalletButton.Custom wallet={wallet}>
        {({ ready, connect, connector }) => {
            return (
                <button
                    disabled={!ready}
                    onClick={connect}
                    className="group relative w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-xl transition-all duration-300 flex items-center justify-between overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:via-cyan-500/5 group-hover:to-cyan-500/10 transition-all duration-500" />

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <img src={icon} alt={name} className="w-full h-full object-contain" />
                        </div>
                        <div className="text-left">
                            <div className="text-white font-bold group-hover:text-cyan-400 transition-colors">{name}</div>
                            <div className="text-xs text-gray-400 group-hover:text-gray-300">Connect with {name}</div>
                        </div>
                    </div>

                    <div className="relative z-10 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all">
                        <ArrowRight className="w-4 h-4 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                        <div className="absolute w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:opacity-0 transition-opacity" />
                    </div>
                </button>
            );
        }}
    </WalletButton.Custom>
);

export const ConnectWalletModal = ({ isOpen, onOpenChange, trigger }: ConnectWalletModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="border-none bg-transparent shadow-none max-w-lg p-0 overflow-hidden">
                <div className="relative bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 overflow-hidden shadow-[0_0_50px_-10px_rgba(34,211,238,0.15)]">
                    {/* Ambient Background Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20" />

                    <DialogHeader className="mb-8 relative z-10">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
                                Connect Wallet
                            </DialogTitle>
                            {/* Close button is handled by DialogPrimitive usually, but we can add a custom one if needed */}
                        </div>
                        <p className="text-gray-400 mt-2">Choose a wallet to connect to Capsulr</p>
                    </DialogHeader>

                    <div className="space-y-3 relative z-10">
                        <WalletOption
                            wallet="metaMask"
                            name="MetaMask"
                            icon="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                        />
                        <WalletOption
                            wallet="rainbow"
                            name="Rainbow"
                            icon="https://avatars.githubusercontent.com/u/48327834?s=200&v=4"
                        />
                        <WalletOption
                            wallet="coinbase"
                            name="Coinbase Wallet"
                            icon="https://avatars.githubusercontent.com/u/18060234?s=200&v=4"
                        />
                        <WalletOption
                            wallet="phantom"
                            name="Phantom"
                            icon="https://upload.wikimedia.org/wikipedia/en/b/b9/Phantom_logo.png"
                        />
                        <WalletOption
                            wallet="walletConnect"
                            name="WalletConnect"
                            icon="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg"
                        />
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
                        <p className="text-xs text-gray-500">
                            By connecting your wallet, you agree to our{' '}
                            <span className="text-cyan-500/70 hover:text-cyan-400 cursor-pointer transition-colors">Terms of Service</span>
                            {' '}and{' '}
                            <span className="text-cyan-500/70 hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</span>.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
