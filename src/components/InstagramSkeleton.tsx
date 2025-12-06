import { motion } from 'framer-motion';

interface InstagramSkeletonProps {
  height: number;
}

export default function InstagramSkeleton({ height }: InstagramSkeletonProps) {
  return (
    <div
      className="w-full bg-dark-100 rounded-2xl overflow-hidden animate-pulse"
      style={{ height: `${height}px` }}
    >
      {/* Header skeleton */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10" />
        <div className="flex-1">
          <div className="h-4 w-32 bg-white/10 rounded mb-2" />
          <div className="h-3 w-24 bg-white/10 rounded" />
        </div>
      </div>

      {/* Content skeleton - grid of posts */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="aspect-square bg-white/10 rounded"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center py-8">
        <motion.div
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
