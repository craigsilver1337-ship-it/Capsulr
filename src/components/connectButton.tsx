"use client";
import { useEffect, useRef, useState } from "react";
import {
  WalletButton,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";

export const ConnectBtn = () => {
  const { isConnecting, isConnected, chain } = useAccount();

  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();
  const isMounted = useRef(false);
  const [showWallets, setShowWallets] = useState(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  // Close popup when clicking outside (optional but good UX)
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowWallets(false);
      }
    };
    if (showWallets) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWallets]);

  if (!isConnected) {
    return (
      <div className="relative" ref={popupRef}>
        <button
          onClick={() => setShowWallets(!showWallets)}
          disabled={isConnecting}
          className="
            relative overflow-hidden
            px-5 py-2.5  
            bg-black border border-cyan-400/50
            text-white text-sm font-medium
            rounded-xl
            transition-all duration-300 ease-out
            hover:bg-cyan-500 hover:text-black hover:border-cyan-400
            hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:bg-black disabled:hover:text-white
            group
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            {isConnecting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </>
            ) : (
              "Connect Wallet"
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>

        <AnimatePresence>
          {showWallets && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-14 right-0 w-72 z-50 origin-top-right"
            >
              <div className="flex flex-col gap-3 p-5 bg-black/95 border border-cyan-500/30 rounded-2xl backdrop-blur-2xl shadow-[0_10px_40px_-10px_rgba(34,211,238,0.2)]">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-white bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent font-bold text-sm tracking-widest uppercase">Select Wallet</h3>
                  <button
                    onClick={() => setShowWallets(false)}
                    className="text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {/* MetaMask */}
                  <WalletButton.Custom wallet="metaMask">
                    {({ ready, connect }) => (
                      <button
                        type="button"
                        disabled={!ready || isConnecting}
                        onClick={connect}
                        className="
                          group relative w-full px-4 py-3.5
                          bg-white/5 border border-white/5
                          text-gray-200 font-medium text-sm
                          rounded-xl
                          transition-all duration-300
                          hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-white
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-start gap-4
                        "
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">🦊</span>
                        <div className="flex flex-col items-start leading-none gap-1">
                          <span className="group-hover:text-cyan-300 transition-colors">MetaMask</span>
                        </div>
                        {isConnecting && <div className="ml-auto w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />}
                      </button>
                    )}
                  </WalletButton.Custom>

                  {/* Coinbase Wallet */}
                  <WalletButton.Custom wallet="coinbase">
                    {({ ready, connect }) => (
                      <button
                        type="button"
                        disabled={!ready || isConnecting}
                        onClick={connect}
                        className="
                          group relative w-full px-4 py-3.5
                          bg-white/5 border border-white/5
                          text-gray-200 font-medium text-sm
                          rounded-xl
                          transition-all duration-300
                          hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-start gap-4
                        "
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">🔵</span>
                        <div className="flex flex-col items-start leading-none gap-1">
                          <span className="group-hover:text-blue-300 transition-colors">Coinbase</span>
                        </div>
                        {isConnecting && <div className="ml-auto w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                      </button>
                    )}
                  </WalletButton.Custom>

                  {/* Phantom Wallet */}
                  <WalletButton.Custom wallet="phantom">
                    {({ ready, connect }) => (
                      <button
                        type="button"
                        disabled={!ready || isConnecting}
                        onClick={connect}
                        className="
                          group relative w-full px-4 py-3.5
                          bg-white/5 border border-white/5
                          text-gray-200 font-medium text-sm
                          rounded-xl
                          transition-all duration-300
                          hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-start gap-4
                        "
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">👻</span>
                        <div className="flex flex-col items-start leading-none gap-1">
                          <span className="group-hover:text-purple-300 transition-colors">Phantom</span>
                        </div>
                        {isConnecting && <div className="ml-auto w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />}
                      </button>
                    )}
                  </WalletButton.Custom>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (isConnected && !chain) {
    return (
      <button
        className="
          px-4 py-2 
          bg-red-600 border-2 border-red-400 
          text-white text-sm 
          rounded-lg 
          transition-all duration-300
          hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]
        "
        onClick={openChainModal}
      >
        Wrong network
      </button>
    );
  }

  return (
    <div className="max-w-5xl w-full flex items-center justify-between gap-4">
      <div className="flex gap-3">
        <button
          className="
            px-4 py-2 
            bg-gradient-to-r from-red-900 to-red-800 
            border-1 border-red-400/60 
            text-white text-sm  
            rounded-lg 
            transition-all duration-300 ease-out
            hover:border-red-400 
            hover:shadow-[0_0_20px_rgba(248,113,113,0.4)]
            hover:from-red-800 hover:to-red-900
            active:scale-95
          "
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};