'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Clock, Lock, Unlock, Eye, MessageSquare, Zap, Target, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useGetOwnedCapsules,
  useGetCapsule,
  useUnlockCapsule,
  useGiftCapsule,
  useTransactionReceipt,
  formatCapsuleData,
  isUnlockable,
  getTimeUntilUnlock,
  type Capsule,
} from '@/hooks/useTimeCapsule';

interface CapsuleDisplayProps {
  capsule: Capsule;
  onUnlock: (id: bigint) => void;
  onGift: (id: bigint, recipient: string) => void;
  onViewContent: (capsule: Capsule) => void;
  isUnlocking?: boolean;
}

const CapsuleDisplay: React.FC<CapsuleDisplayProps> = ({
  capsule,
  onUnlock,
  onGift,
  onViewContent,
  isUnlocking = false
}) => {
  const [giftRecipient, setGiftRecipient] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(false);

  const getTypeIcon = (type: number) => {
    switch (type) {
      case 0: return MessageSquare;
      case 1: return Target;
      case 2: return Image;
      case 3: return Lock;
      default: return MessageSquare;
    }
  };

  const getTypeLabel = (type: number) => {
    switch (type) {
      case 0: return 'Message';
      case 1: return 'Prediction';
      case 2: return 'Art';
      case 3: return 'Secret';
      default: return 'Unknown';
    }
  };

  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return 'Ready to unlock!';

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const TypeIcon = getTypeIcon(capsule.lockType);
  const canUnlock = isUnlockable(capsule);
  const timeRemaining = getTimeUntilUnlock(capsule);

  const handleGift = () => {
    if (giftRecipient.trim()) {
      onGift(capsule.id, giftRecipient);
      setGiftRecipient('');
      setShowGiftInput(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${capsule.isOpened ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
            <TypeIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">
              Capsule #{capsule.id.toString()}
            </h3>
            <p className="text-gray-400 text-sm">{getTypeLabel(capsule.lockType)}</p>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${capsule.isOpened ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
          {capsule.isOpened ? (
            <Unlock className="w-5 h-5 text-green-400" />
          ) : (
            <Lock className="w-5 h-5 text-red-400" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-4">
        <div>
          <p className="text-sm text-gray-400">Creator</p>
          <p className="text-white font-mono text-sm">{capsule.creator}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Recipient</p>
          <p className="text-white font-mono text-sm">{capsule.recipient}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Status</p>
          <p className={`text-sm font-medium ${capsule.isOpened ? 'text-green-400' : 'text-red-400'
            }`}>
            {capsule.isOpened ? 'Unlocked' : 'Locked'}
          </p>
        </div>
        {!capsule.isOpened && (
          <div>
            <p className="text-sm text-gray-400">Time Remaining</p>
            <p className="text-cyan-400 font-medium">
              {formatTimeRemaining(timeRemaining)}
            </p>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-400">Visibility</p>
          <p className="text-white text-sm">
            {capsule.visibility === 0 ? 'Private' : 'Public'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {!capsule.isOpened && canUnlock && (
          <button
            onClick={() => onUnlock(capsule.id)}
            disabled={isUnlocking}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {isUnlocking ? 'Unlocking...' : 'Unlock Capsule'}
          </button>
        )}

        {capsule.isOpened && (
          <button
            onClick={() => onViewContent(capsule)}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4 inline mr-2" />
            View Content
          </button>
        )}

        <div className="flex gap-2">
          {!showGiftInput ? (
            <button
              onClick={() => setShowGiftInput(true)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Gift Capsule
            </button>
          ) : (
            <>
              <input
                type="text"
                value={giftRecipient}
                onChange={(e) => setGiftRecipient(e.target.value)}
                placeholder="Recipient address"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
              />
              <button
                onClick={handleGift}
                disabled={!giftRecipient.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setShowGiftInput(false);
                  setGiftRecipient('');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// MediaRenderer component that fetches and renders media
interface MediaRendererProps {
  mediaUri: string;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({ mediaUri }) => {
  const [mediaData, setMediaData] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'unknown'>('unknown');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, try to determine the media type from URL
        const isImage = mediaUri.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        const isVideo = mediaUri.match(/\.(mp4|webm|avi|mov)$/i);

        if (isImage) {
          setMediaType('image');
        } else if (isVideo) {
          setMediaType('video');
        } else {
          // Try to fetch and determine from content-type
          const response = await fetch(mediaUri, { method: 'HEAD' });
          const contentType = response.headers.get('content-type');

          if (contentType?.startsWith('image/')) {
            setMediaType('image');
          } else if (contentType?.startsWith('video/')) {
            setMediaType('video');
          } else {
            setMediaType('unknown');
          }
        }

        // For images, fetch as blob and create object URL
        if (mediaType === 'image' || isImage) {
          const response = await fetch(mediaUri);
          if (!response.ok) throw new Error('Failed to fetch media');

          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setMediaData(objectUrl);
        } else {
          // For videos and unknown types, use the original URL
          setMediaData(mediaUri);
        }
      } catch (err) {
        console.error('Error fetching media:', err);
        setError(err instanceof Error ? err.message : 'Failed to load media');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();

    // Cleanup object URL on unmount
    return () => {
      if (mediaData && mediaData.startsWith('blob:')) {
        URL.revokeObjectURL(mediaData);
      }
    };
  }, [mediaUri]);

  if (loading) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-white mb-2">Media</h4>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="ml-3 text-gray-400">Loading media...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-white mb-2">Media</h4>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-red-400 text-sm mb-2">Failed to load media: {error}</div>
          <a
            href={mediaUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline break-all"
          >
            Open original link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-2">Media</h4>
      <div className="bg-gray-800/50 rounded-lg p-4">
        {mediaType === 'image' && mediaData ? (
          <img
            src={mediaData}
            alt="Capsule media"
            className="max-w-full h-auto rounded-lg"
            onError={() => setError('Failed to display image')}
          />
        ) : mediaType === 'video' && mediaData ? (
          <video
            src={mediaData}
            controls
            className="max-w-full h-auto rounded-lg"
            onError={() => setError('Failed to display video')}
          />
        ) : (
          <a
            href={mediaUri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline break-all"
          >
            {mediaUri}
          </a>
        )}
      </div>
    </div>
  );
};

const CapsuleManager: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [selectedCapsules, setSelectedCapsules] = useState<bigint[]>([]);
  const [viewingCapsule, setViewingCapsule] = useState<Capsule | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6); // Show 6 capsules per page

  // Contract hooks
  const { data: ownedCapsuleIds, isLoading: isLoadingCapsules } = useGetOwnedCapsules(address || '');
  const { unlockCapsule, hash: unlockHash, isPending: isUnlocking } = useUnlockCapsule();
  const { giftCapsule, hash: giftHash, isPending: isGifting } = useGiftCapsule();

  // Transaction receipts
  const { isLoading: isUnlockLoading, isSuccess: isUnlockSuccess } = useTransactionReceipt(unlockHash);
  const { isLoading: isGiftLoading, isSuccess: isGiftSuccess } = useTransactionReceipt(giftHash);

  // Get capsule data for up to 20 capsules
  const capsuleIds = Array.isArray(ownedCapsuleIds) ? ownedCapsuleIds.slice(0, 20) : [];

  // Call hooks for each capsule at the top level (fixed number of hooks)
  const capsule0 = useGetCapsule(capsuleIds[0] || BigInt(0));
  const capsule1 = useGetCapsule(capsuleIds[1] || BigInt(0));
  const capsule2 = useGetCapsule(capsuleIds[2] || BigInt(0));
  const capsule3 = useGetCapsule(capsuleIds[3] || BigInt(0));
  const capsule4 = useGetCapsule(capsuleIds[4] || BigInt(0));
  const capsule5 = useGetCapsule(capsuleIds[5] || BigInt(0));
  const capsule6 = useGetCapsule(capsuleIds[6] || BigInt(0));
  const capsule7 = useGetCapsule(capsuleIds[7] || BigInt(0));
  const capsule8 = useGetCapsule(capsuleIds[8] || BigInt(0));
  const capsule9 = useGetCapsule(capsuleIds[9] || BigInt(0));
  const capsule10 = useGetCapsule(capsuleIds[10] || BigInt(0));
  const capsule11 = useGetCapsule(capsuleIds[11] || BigInt(0));
  const capsule12 = useGetCapsule(capsuleIds[12] || BigInt(0));
  const capsule13 = useGetCapsule(capsuleIds[13] || BigInt(0));
  const capsule14 = useGetCapsule(capsuleIds[14] || BigInt(0));
  const capsule15 = useGetCapsule(capsuleIds[15] || BigInt(0));
  const capsule16 = useGetCapsule(capsuleIds[16] || BigInt(0));
  const capsule17 = useGetCapsule(capsuleIds[17] || BigInt(0));
  const capsule18 = useGetCapsule(capsuleIds[18] || BigInt(0));
  const capsule19 = useGetCapsule(capsuleIds[19] || BigInt(0));

  // Collect all capsule data
  const allCapsuleData = [
    { id: capsuleIds[0], data: capsule0.data },
    { id: capsuleIds[1], data: capsule1.data },
    { id: capsuleIds[2], data: capsule2.data },
    { id: capsuleIds[3], data: capsule3.data },
    { id: capsuleIds[4], data: capsule4.data },
    { id: capsuleIds[5], data: capsule5.data },
    { id: capsuleIds[6], data: capsule6.data },
    { id: capsuleIds[7], data: capsule7.data },
    { id: capsuleIds[8], data: capsule8.data },
    { id: capsuleIds[9], data: capsule9.data },
    { id: capsuleIds[10], data: capsule10.data },
    { id: capsuleIds[11], data: capsule11.data },
    { id: capsuleIds[12], data: capsule12.data },
    { id: capsuleIds[13], data: capsule13.data },
    { id: capsuleIds[14], data: capsule14.data },
    { id: capsuleIds[15], data: capsule15.data },
    { id: capsuleIds[16], data: capsule16.data },
    { id: capsuleIds[17], data: capsule17.data },
    { id: capsuleIds[18], data: capsule18.data },
    { id: capsuleIds[19], data: capsule19.data },
  ].filter(item => item.id && item.data);

  const capsules = allCapsuleData
    .map(({ data }) => formatCapsuleData(data))
    .filter((capsule): capsule is Capsule => capsule !== null)
    .sort((a, b) => {
      // Sort by unlock time (most recent first)
      return Number(b.unlockTime) - Number(a.unlockTime);
    });

  // Pagination logic
  const totalPages = Math.ceil(capsules.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCapsules = capsules.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        prevPage();
      } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        nextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  const handleUnlock = (capsuleId: bigint) => {
    unlockCapsule(capsuleId);
  };

  const handleGift = (capsuleId: bigint, recipient: string) => {
    giftCapsule(capsuleId, recipient);
  };

  const handleViewContent = (capsule: Capsule) => {
    setViewingCapsule(capsule);
    setShowContentModal(true);
  };

  const parseEncryptedURI = (encryptedURI: string) => {
    try {
      if (encryptedURI.startsWith('data:application/json;base64,')) {
        const base64Data = encryptedURI.replace('data:application/json;base64,', '');
        try {
          // Try Unicode-safe decoding first
          const binaryString = atob(base64Data);
          const utf8Bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            utf8Bytes[i] = binaryString.charCodeAt(i);
          }
          const jsonString = new TextDecoder().decode(utf8Bytes);
          return JSON.parse(jsonString);
        } catch (unicodeError) {
          // Fallback to regular atob for older capsules
          const jsonString = atob(base64Data);
          return JSON.parse(jsonString);
        }
      } else if (encryptedURI.startsWith('data:application/json,')) {
        const jsonString = decodeURIComponent(encryptedURI.replace('data:application/json,', ''));
        return JSON.parse(jsonString);
      }
      return { message: 'Unable to decode content', title: 'Unknown' };
    } catch (error) {
      console.error('Error parsing encrypted URI:', error);
      return { message: 'Error decoding content', title: 'Error' };
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
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
                  boxShadow: Math.random() < 0.3 ? '0 0 6px rgba(255,255,255,0.9)' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent mb-8">
            Connect Your Wallet
          </h1>
          <p className="text-gray-400 mb-8">Connect your wallet to manage your time capsules</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 text-white relative overflow-hidden">
      {/* Animated Background */}
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
                boxShadow: Math.random() < 0.3 ? '0 0 6px rgba(255,255,255,0.9)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-500 bg-clip-text text-transparent mb-6 tracking-tight">
            My Time Capsules
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Manage your digital legacy. View, unlock, and share your on-chain time capsules from a single dashboard.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Total Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/20 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Icon */}
            <Target strokeWidth={1} className="absolute -right-4 -bottom-4 w-32 h-32 text-cyan-500/10 rotate-[-10deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 opacity-20" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-cyan-400/80 transition-colors">Total Capsules</h3>
                <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-cyan-200 tracking-tight">
                {Array.isArray(ownedCapsuleIds) ? ownedCapsuleIds.length : 0}
              </p>
            </div>
          </motion.div>

          {/* Unlocked Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/20 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Icon */}
            <Unlock strokeWidth={1} className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500/10 rotate-[-10deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 opacity-20" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-emerald-400/80 transition-colors">Unlocked</h3>
                <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                  <Unlock className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-emerald-200 tracking-tight">
                {capsules.filter(c => c.isOpened).length}
              </p>
            </div>
          </motion.div>

          {/* Locked Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-red-500/20 hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.15)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Icon */}
            <Lock strokeWidth={1} className="absolute -right-4 -bottom-4 w-32 h-32 text-red-500/10 rotate-[-10deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 opacity-20" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-red-400/80 transition-colors">Locked</h3>
                <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20 group-hover:border-red-500/50 transition-colors">
                  <Lock className="w-5 h-5 text-red-400" />
                </div>
              </div>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-red-200 tracking-tight">
                {capsules.filter(c => !c.isOpened).length}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Transaction Status */}
        {(isUnlockSuccess || isGiftSuccess) && (
          <div className="mb-6">
            {isUnlockSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-green-400">✅ Capsule unlocked successfully!</p>
                {unlockHash && (
                  <a
                    href={`https://testnet.monadexplorer.com/tx/${unlockHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-200 text-sm"
                  >
                    View transaction →
                  </a>
                )}
              </div>
            )}
            {isGiftSuccess && (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                <p className="text-purple-400">✅ Capsule gifted successfully!</p>
                {giftHash && (
                  <a
                    href={`https://testnet.monadexplorer.com/tx/${giftHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 text-sm"
                  >
                    View transaction →
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoadingCapsules && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4 animate-spin" />
            <p className="text-gray-400">Loading your capsules...</p>
          </div>
        )}

        {/* Results Summary */}
        {capsules.length > 0 && (
          <div className="text-center mb-6">
            <p className="text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, capsules.length)} of {capsules.length} capsules
              {totalPages > 1 && ` • Page ${currentPage + 1} of ${totalPages}`}
            </p>
          </div>
        )}

        {/* Capsules Grid */}
        {capsules.length > 0 ? (
          <div className="relative">
            {/* Carousel Navigation */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentPage ? 'bg-cyan-400' : 'bg-gray-600'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentCapsules.map((capsule, index) => (
                <CapsuleDisplay
                  key={capsule.id.toString()}
                  capsule={capsule}
                  onUnlock={handleUnlock}
                  onGift={handleGift}
                  onViewContent={handleViewContent}
                  isUnlocking={isUnlocking || isUnlockLoading}
                />
              ))}
            </motion.div>
          </div>
        ) : !isLoadingCapsules ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 relative z-10"
          >
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-gray-700 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-gray-800 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-full shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]">
                <Clock className="w-12 h-12 text-cyan-500/70" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Your Journey Begins Now</h3>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
              You haven't preserved any memories on the blockchain yet. Create your first time capsule today.
            </p>

            <motion.button
              onClick={() => window.location.href = '/create'}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              Create Your First Capsule
            </motion.button>
          </motion.div>
        ) : null}

        {/* Content Viewing Modal */}
        <AnimatePresence>
          {showContentModal && viewingCapsule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowContentModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-cyan-400">
                    Capsule #{viewingCapsule.id.toString()} Content
                  </h3>
                  <button
                    onClick={() => setShowContentModal(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {(() => {
                  const content = parseEncryptedURI(viewingCapsule.encryptedURI);
                  return (
                    <div className="space-y-6">
                      {content.title && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Title</h4>
                          <p className="text-gray-300">{content.title}</p>
                        </div>
                      )}

                      {content.message && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Message</h4>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <p className="text-gray-300 whitespace-pre-wrap">{content.message}</p>
                          </div>
                        </div>
                      )}

                      {/* Media Content */}
                      {content.mediaUri && (
                        <MediaRenderer mediaUri={content.mediaUri} />
                      )}

                      {content.type && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Type</h4>
                          <p className="text-gray-300 capitalize">{content.type}</p>
                        </div>
                      )}

                      {content.attachments && content.attachments.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Attachments</h4>
                          <div className="space-y-2">
                            {content.attachments.map((attachment: any, index: number) => (
                              <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                                <p className="text-gray-300 text-sm">
                                  📎 {attachment.name} ({attachment.type})
                                </p>
                                {attachment.size && (
                                  <p className="text-gray-500 text-xs">
                                    Size: {(attachment.size / 1024).toFixed(1)} KB
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {content.createdAt && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Created</h4>
                          <p className="text-gray-300">
                            {new Date(content.createdAt).toLocaleString()}
                          </p>
                        </div>
                      )}

                      {content.creator && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Creator</h4>
                          <p className="text-gray-300 font-mono text-sm">{content.creator}</p>
                        </div>
                      )}

                      {content.network && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">Network</h4>
                          <p className="text-gray-300 capitalize">{content.network}</p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-700">
                        <div className="flex items-center space-x-2 text-green-400">
                          <Unlock className="w-5 h-5" />
                          <span className="font-semibold">Capsule Unlocked!</span>
                        </div>
                        <p className="text-sm text-green-300 mt-1">
                          This content has been permanently revealed on the blockchain.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CapsuleManager; 