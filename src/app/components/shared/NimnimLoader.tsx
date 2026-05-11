import { motion } from 'motion/react';
import { Cloud } from 'lucide-react';

interface NimnimLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function NimnimLoader({ message = 'Nimnim is working...', size = 'md' }: NimnimLoaderProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <motion.div
        className={`${sizeClasses[size]} bg-secondary rounded-3xl flex items-center justify-center shadow-lg relative`}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Cloud className={`${iconSizes[size]} text-white`} />

        {/* Floating particles */}
        <motion.div
          className="absolute w-3 h-3 bg-primary rounded-full"
          style={{ top: '20%', right: '-10%' }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-accent rounded-full"
          style={{ bottom: '30%', left: '-5%' }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute w-2.5 h-2.5 bg-muted rounded-full"
          style={{ top: '60%', right: '5%' }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <motion.p
          className="text-lg font-medium text-foreground mb-1"
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {message}
        </motion.p>
        <p className="text-sm text-muted-foreground">This will only take a moment</p>
      </motion.div>

      {/* Loading dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
