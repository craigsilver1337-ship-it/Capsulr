'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPublicClient, http } from 'viem';
import { monadTestnet } from 'wagmi/chains';
import contractABI from '@/lib/contractutils.json';
import contractAddress from '@/lib/contractAddress.json';
import {
  Unlock,
  Vote,
  Sparkles,
  Gift,
  Users,
  Heart,
  MessageCircle,
  Share,
  Trophy,
  Zap,
  Hash,
  User,
  ChevronDown,
  Filter,
} from 'lucide-react';

interface Capsule {
  id: bigint;
  creator: string;
  recipient: string;
  unlockTime: bigint;
  encryptedURI: string;
  lockType: number;
  visibility: number;
  isOpened: boolean;
}

interface Post {
  id: number;
  type: 'mint' | 'unlock' | 'vote' | 'gift' | 'community' | 'achievement' | 'prediction';
  title: string;
  content: string;
  user: {
    address: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  blockNumber?: number;
  capsuleId?: number;
  capsuleTitle?: string;
  transactionHash?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags?: string[];
  metadata?: {
    amount?: string;
    recipient?: string;
    votes?: number;
    totalVotes?: number;
    rarity?: 'common' | 'rare' | 'legendary' | 'mythic';
    rewards?: string[];
    eventType?: string;
    platform?: 'Jupiter' | 'Magic Eden' | 'Tensor' | 'Realms';
  };
}

const postTypeConfig = {
  mint: {
    icon: Sparkles,
    color: 'from-purple-500 to-cyan-500',
    bgColor: 'bg-purple-500/10 border-purple-500/20',
    textColor: 'text-purple-400',
    borderColor: 'group-hover:border-purple-500/50',
    cardBg: 'from-purple-900/20 via-gray-900/40 to-gray-900/40' // Custom gradient
  },
  unlock: {
    icon: Unlock,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-500/10 border-green-500/20',
    textColor: 'text-green-400',
    borderColor: 'group-hover:border-green-500/50',
    cardBg: 'from-green-900/20 via-gray-900/40 to-gray-900/40'
  },
  vote: {
    icon: Vote,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    textColor: 'text-blue-400',
    borderColor: 'group-hover:border-blue-500/50',
    cardBg: 'from-blue-900/20 via-gray-900/40 to-gray-900/40'
  },
  gift: {
    icon: Gift,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10 border-pink-500/20',
    textColor: 'text-pink-400',
    borderColor: 'group-hover:border-pink-500/50',
    cardBg: 'from-pink-900/20 via-gray-900/40 to-gray-900/40'
  },
  community: {
    icon: Users,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10 border-orange-500/20',
    textColor: 'text-orange-400',
    borderColor: 'group-hover:border-orange-500/50',
    cardBg: 'from-orange-900/20 via-gray-900/40 to-gray-900/40'
  },
  achievement: {
    icon: Trophy,
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-yellow-500/10 border-yellow-500/20',
    textColor: 'text-yellow-400',
    borderColor: 'group-hover:border-yellow-500/50',
    cardBg: 'from-yellow-900/20 via-gray-900/40 to-gray-900/40'
  },
  prediction: {
    icon: Zap,
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-500/10 border-cyan-500/20',
    textColor: 'text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/50',
    cardBg: 'from-cyan-900/20 via-gray-900/40 to-gray-900/40'
  }
};

const borderGradients = {
  mint: 'from-purple-500 via-cyan-500 to-purple-500',
  unlock: 'from-green-400 via-emerald-500 to-green-400',
  vote: 'from-blue-500 via-indigo-500 to-blue-500',
  gift: 'from-pink-500 via-rose-500 to-pink-500',
  community: 'from-orange-500 via-red-500 to-orange-500',
  achievement: 'from-yellow-400 via-amber-500 to-yellow-400',
  prediction: 'from-cyan-400 via-blue-500 to-cyan-400'
};

// Utility function to format addresses (Solana style)
const formatAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

// Function to fetch all capsules from the contract
const fetchAllCapsules = async (): Promise<Capsule[]> => {
  try {
    const client = createPublicClient({
      chain: monadTestnet,
      transport: http(),
    });

    const result = await client.readContract({
      address: contractAddress as `0x${string}`,
      abi: contractABI,
      functionName: 'getAllCapsules',
    });
    return result as Capsule[];
  } catch (error) {
    console.error('Error fetching capsules:', error);
    return [];
  }
};

// Function to transform capsules into feed posts
const transformCapsulesIntoPosts = (capsules: Capsule[]): Post[] => {
  return capsules.map((capsule, index) => {
    const now = Date.now();
    const unlockTime = Number(capsule.unlockTime) * 1000; // Convert to milliseconds
    const isUnlocked = now >= unlockTime || capsule.isOpened;
    const timeUntilUnlock = unlockTime - now;

    // Determine post type based on capsule state
    let postType: Post['type'] = 'mint';
    let title = '';
    let content = '';

    if (isUnlocked && capsule.isOpened) {
      postType = 'unlock';
      title = 'Time Capsule Revealed!';
      content = `Capsule #${capsule.id.toString()} has been unlocked and opened, revealing its hidden contents.`;
    } else if (isUnlocked && !capsule.isOpened) {
      postType = 'unlock';
      title = 'Time Capsule Ready to Open!';
      content = `Capsule #${capsule.id.toString()} is now unlocked and ready to be opened.`;
    } else {
      postType = 'mint';
      title = 'New Time Capsule Created';
      content = `A new time capsule #${capsule.id.toString()} has been minted and is waiting to be unlocked.`;
    }

    // Check if it's a gift (creator != recipient)
    if (capsule.creator.toLowerCase() !== capsule.recipient.toLowerCase()) {
      postType = 'gift';
      title = 'Time Capsule Gifted';
      content = `A time capsule #${capsule.id.toString()} has been gifted and is waiting to be unlocked.`;
    }

    const formatTimeRemaining = (ms: number): string => {
      if (ms <= 0) return 'Unlocked';
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (days > 0) return `${days}d ${hours}h remaining`;
      if (hours > 0) return `${hours}h remaining`;
      return 'Less than 1h remaining';
    };

    return {
      id: Number(capsule.id),
      type: postType,
      title,
      content,
      user: {
        address: capsule.creator,
        name: `${formatAddress(capsule.creator)}`,
      },
      timestamp: formatTimeRemaining(timeUntilUnlock),
      capsuleId: Number(capsule.id),
      capsuleTitle: `Capsule #${capsule.id.toString()}`,
      likes: Math.floor(Math.random() * 50), // Random likes for demo
      comments: Math.floor(Math.random() * 10),
      shares: Math.floor(Math.random() * 5),
      isLiked: false,
      tags: [
        capsule.lockType === 0 ? 'time-locked' : 'block-locked',
        capsule.visibility === 0 ? 'private' : 'public',
        isUnlocked ? 'unlocked' : 'locked'
      ],
      metadata: {
        rarity: 'common' as const,
        recipient: capsule.recipient !== capsule.creator ? formatAddress(capsule.recipient) : undefined,
      }
    };
  });
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'mint' | 'unlock' | 'vote' | 'gift'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch real capsules and mock data
  useEffect(() => {
    const loadFeedData = async () => {
      try {
        // Fetch real capsules from contract
        const capsules = await fetchAllCapsules();
        const capsulePosts = transformCapsulesIntoPosts(capsules);

        // Mock posts for demo purposes (Solana Style)
        const mockPosts: Post[] = [
          {
            id: 1,
            type: 'mint',
            title: 'Saga Genesis cNFT Minted',
            content: 'A mythic "Solana Saga" compressed NFT was just minted on the mainnet! This capsule grants exclusive access to the dApp store rewards.',
            user: { address: 'G7p3...9Xy2', name: 'SolanaWhale.sol' },
            timestamp: '2 minutes ago',
            blockNumber: 245678123,
            capsuleId: 888,
            capsuleTitle: 'Saga Genesis #402',
            transactionHash: '5xC2...9Lp1',
            likes: 142,
            comments: 18,
            shares: 45,
            isLiked: false,
            tags: ['compressed-nft', 'saga', 'mobile'],
            metadata: {
              rarity: 'mythic',
              rewards: ['Saga DAO Access', '20M BONK', 'Claynosaurz WL']
            }
          },
          {
            id: 2,
            type: 'unlock',
            title: 'Jupiter Airdrop Capsule Unlocked',
            content: 'The "JUPuary" vesting capsule has been unlocked! 5,000 JUP tokens have been released to the community vault.',
            user: { address: 'Jup...iter', name: 'Meow.sol' },
            timestamp: '15 minutes ago',
            blockNumber: 245677900,
            capsuleId: 420,
            capsuleTitle: 'JUPuary Vesting',
            transactionHash: '3mK9...8Jq2',
            likes: 890,
            comments: 124,
            shares: 312,
            isLiked: true,
            tags: ['defi', 'airdrop', 'jupiter'],
            metadata: {
              rarity: 'legendary',
              platform: 'Jupiter',
              rewards: ['5000 JUP', 'Governance Power']
            }
          },
          {
            id: 3,
            type: 'vote',
            title: 'Realms Governance: Eco-Fund',
            content: 'Voting is live on Realms for the new Ecosystem Fund allocation. 67% quorum reached. Unlocking this capsule will release the initial funding.',
            user: { address: 'Dao...Vote', name: 'GovernanceBot' },
            timestamp: '1 hour ago',
            capsuleId: 101,
            capsuleTitle: 'Eco-Fund Proposal #44',
            likes: 67,
            comments: 12,
            shares: 22,
            isLiked: false,
            tags: ['governance', 'realms', 'proposal'],
            metadata: {
              votes: 45000,
              totalVotes: 60000,
              rarity: 'rare',
              platform: 'Realms'
            }
          },
          {
            id: 4,
            type: 'gift',
            title: 'Valentine\'s SOL Gift',
            content: '@Alice.sol gifted a "Forever Locked" capsule to @Bob.sol containing 10 SOL and a handwritten note on-chain.',
            user: { address: 'Ali...ce22', name: 'Alice.sol' },
            timestamp: '2 hours ago',
            capsuleId: 203,
            capsuleTitle: 'To My Valentine',
            likes: 356,
            comments: 42,
            shares: 67,
            isLiked: true,
            tags: ['gift', 'love', 'solana'],
            metadata: {
              recipient: 'Bob.sol',
              rarity: 'common',
              amount: '10 SOL'
            }
          },
          {
            id: 5,
            type: 'achievement',
            title: 'Mad Lads Holder Snapshot',
            content: 'Snapshot taken! Holders of "Mad Lads" have been airdropped a special "Backpack" capsule containing early access codes.',
            user: { address: 'Mad...Lads', name: 'Armani.sol' },
            timestamp: '4 hours ago',
            likes: 1024,
            comments: 156,
            shares: 230,
            isLiked: false,
            tags: ['nft', 'snapshot', 'backpack'],
            metadata: {
              rewards: ['Backpack Access', 'xNFT Drop']
            }
          },
          {
            id: 6,
            type: 'prediction',
            title: 'SOL Price Prediction Verified',
            content: 'Oracle verified: The capsule "SOL to $200" created in 2023 has been validated! The creator wins the prediction pool.',
            user: { address: 'Ora...cle1', name: 'PythOracle' },
            timestamp: '6 hours ago',
            capsuleId: 777,
            capsuleTitle: 'SOL @ $200 Prediction',
            likes: 445,
            comments: 88,
            shares: 65,
            isLiked: false,
            tags: ['prediction', 'pyth', 'oracle'],
            metadata: {
              rarity: 'legendary',
              rewards: ['Prediction Pool Prize', 'Seer Badge']
            }
          },
          {
            id: 7,
            type: 'community',
            title: 'Superteam UK Hackathon',
            content: 'Submissions are open for the Superteam UK "Time Capsule" track. Build on Solana and win from the $50k prize pool.',
            user: { address: 'Sup...Team', name: 'SuperteamUK' },
            timestamp: '8 hours ago',
            likes: 189,
            comments: 34,
            shares: 56,
            isLiked: false,
            tags: ['hackathon', 'superteam', 'build'],
            metadata: {
              rewards: ['$50k Prize Pool', 'Job Opportunities']
            }
          }
        ];

        // Combine real capsule posts with mock posts
        const allPosts = [...capsulePosts, ...mockPosts];

        setTimeout(() => {
          setPosts(allPosts);
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Error loading feed data:', error);
        // Fallback to mock data only
        const mockPosts: Post[] = [
          {
            id: 1,
            type: 'mint',
            title: 'Error Loading Real Data',
            content: 'Unable to fetch capsules from blockchain. Showing demo data.',
            user: { address: '0x0000...0000', name: 'System' },
            timestamp: 'Just now',
            likes: 0,
            comments: 0,
            shares: 0,
            isLiked: false,
            tags: ['error', 'demo']
          }
        ];

        setTimeout(() => {
          setPosts(mockPosts);
          setIsLoading(false);
        }, 1000);
      }
    };

    loadFeedData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newPost: Post = {
          id: Date.now(),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: ['mint', 'unlock', 'vote', 'gift'][Math.floor(Math.random() * 4)] as any,
          title: 'New Activity Detected',
          content: 'Real-time blockchain event just occurred...',
          user: { address: '0x' + Math.random().toString(16).substr(2, 8) + '...', name: 'User.eth' },
          timestamp: 'Just now',
          likes: 0,
          comments: 0,
          shares: 0,
          isLiked: false,
          tags: ['live']
        };
        setPosts(prev => [newPost, ...prev]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredPosts = posts.filter(post =>
    selectedFilter === 'all' || post.type === selectedFilter
  );

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

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

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-500 bg-clip-text text-transparent mb-3"
            >
              Community Feed
            </motion.h1>
            <p className="text-gray-400 text-lg">Real-time blockchain events and community activities</p>
          </div>

          {/* Filter Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900/40 backdrop-blur-md rounded-xl border border-white/10 text-cyan-400 hover:text-white hover:border-cyan-500/50 transition-all shadow-lg shadow-black/20"
          >
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter Activity</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="flex flex-wrap gap-3 p-6 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                {['all', 'mint', 'unlock', 'vote', 'gift'].map((filter) => (
                  <button
                    key={filter}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setSelectedFilter(filter as any)}
                    className={`px-6 py-2.5 rounded-xl capitalize font-medium transition-all duration-300 ${selectedFilter === filter
                      ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-transparent hover:border-white/10'
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-800/50 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-800/50 rounded w-32 animate-pulse" />
                      <div className="h-3 bg-gray-800/50 rounded w-24 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-24 bg-gray-800/30 rounded-xl animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Posts */
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => {
                const config = postTypeConfig[post.type];
                const IconComponent = config.icon;
                // @ts-ignore
                const borderGradient = borderGradients[post.type] || 'from-gray-500 via-white to-gray-500';

                return (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ x: -50, opacity: 0, scale: 0.95 }}
                    whileInView={{ x: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 50, damping: 20 }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6)"
                    }}
                    className={`relative rounded-3xl backdrop-blur-xl border border-white/5 group isolate bg-gradient-to-br ${config.cardBg}`}
                  >
                    {/* Living Border Gradient Animation */}
                    <div
                      className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}
                      style={{ backgroundSize: '200% 200%', animation: 'shimmer 2s linear infinite' }}
                    />

                    {/* Inner Content Background (masks the border div which is behind) */}
                    <div className="absolute inset-0 bg-gray-900/90 rounded-3xl -z-10" />

                    {/* Ambient Glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${config.color} rounded-3xl -z-10`} />

                    <div className="relative p-8 pl-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            className={`p-3 rounded-2xl ${config.bgColor} backdrop-blur-md shadow-lg ring-1 ring-white/10`}
                          >
                            <IconComponent className={`w-6 h-6 ${config.textColor}`} />
                          </motion.div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="text-base font-bold text-gray-200 group-hover:text-white transition-colors">{post.user.name}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800/50 text-gray-500 border border-white/5 font-mono">
                                {post.user.address.slice(0, 4)}...{post.user.address.slice(-4)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium tracking-wide">
                              <span>{post.timestamp}</span>
                              {post.blockNumber && (
                                <div className="flex items-center gap-1 opacity-75">
                                  <Hash className="w-3 h-3" />
                                  <span>Slot {post.blockNumber.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Badges Container */}
                        <div className="flex items-center gap-3">
                          {/* Live Badge */}
                          {post.timestamp === 'Just now' && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-900/80 border border-green-500/50 text-green-400 rounded-full text-[10px] font-bold tracking-wider shadow-[0_0_10px_rgba(34,197,94,0.4)] backdrop-blur-sm">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              LIVE
                            </div>
                          )}

                          {/* Post Type Badge */}
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border border-white/5 ${config.bgColor} ${config.textColor} shadow-sm`}
                          >
                            {post.type}
                          </motion.span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mb-6 pl-4 border-l-2 border-gray-800 group-hover:border-cyan-500/50 transition-colors duration-300">
                        <h2 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">{post.title}</h2>
                        <p className="text-gray-300 leading-relaxed text-lg font-light">{post.content}</p>
                      </div>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.15)", color: "#22d3ee" }}
                              className="px-3 py-1 text-xs font-semibold bg-gray-800/40 text-gray-400 rounded-lg border border-white/5 cursor-default transition-colors"
                            >
                              #{tag}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      {/* Metadata Card */}
                      {post.metadata && (
                        <div className="mb-6 p-5 rounded-2xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
                          {post.capsuleTitle && (
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm text-gray-300 font-medium">Capsule: <span className="text-cyan-400 group-hover:underline decoration-cyan-500/50 underline-offset-4">{post.capsuleTitle}</span></span>
                            </div>
                          )}
                          {post.metadata.votes !== undefined && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400 flex items-center gap-1 font-medium"><Vote className="w-3 h-3" /> Community Consensus</span>
                                <span className="text-cyan-400 font-mono font-bold">{Math.round((post.metadata.votes / post.metadata.totalVotes!) * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden ring-1 ring-white/5">
                                <motion.div
                                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full relative overflow-hidden"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(post.metadata.votes! / post.metadata.totalVotes!) * 100}%` }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                >
                                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                </motion.div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-6">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 transition-colors group/like ml-1`}
                          >
                            <div className={`relative`}>
                              <Heart className={`w-6 h-6 transition-all duration-300 ${post.isLiked ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-gray-400 group-hover/like:text-red-400'}`} />
                              {post.isLiked && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 1 }}
                                  animate={{ scale: 2, opacity: 0 }}
                                  transition={{ duration: 0.5 }}
                                  className="absolute inset-0 bg-red-500 rounded-full -z-10"
                                />
                              )}
                            </div>
                            <span className={`text-sm font-medium ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}>{post.likes}</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1, color: '#38bdf8' }}
                            className="flex items-center gap-2 text-gray-400 transition-colors"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1, color: '#4ade80' }}
                            className="flex items-center gap-2 text-gray-400 transition-colors"
                          >
                            <Share className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.shares}</span>
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className={`pl-5 pr-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${config.bgColor} ${config.textColor} hover:brightness-110 shadow-lg shadow-black/20 ring-1 ring-white/5`}
                        >
                          {post.type === 'vote' ? 'Cast Your Vote' :
                            post.type === 'unlock' ? 'Reveal Content' :
                              post.type === 'mint' ? 'View Details' : 'Interact'}
                          <span className="text-lg leading-none mb-0.5">→</span>
                        </motion.button>
                      </div>
                    </div>


                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Load More */}
        {!isLoading && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 text-gray-300 rounded-xl hover:text-white hover:border-cyan-500/30 transition-all duration-300 shadow-xl font-medium"
            >
              Load More Activity
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredPosts.length === 0 && (
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
                <Users className="w-12 h-12 text-cyan-500/70" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">No Activity Found</h3>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
              No community posts match your current filter. Try selecting a different category or check back later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}