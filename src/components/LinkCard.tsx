import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PLATFORMS } from "../constants/platforms";
import TiltCard from "./TiltCard";

interface LinkCardProps {
  platform: string;
  url: string;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

export default function LinkCard({ platform, url, index }: LinkCardProps) {
  const p = PLATFORMS[platform];
  if (!p) return null;

  const { Icon } = p;
  const displayURL = url.replace(/^https?:\/\//, "");

  return (
    <motion.div variants={itemVariants}>
      <TiltCard className="w-full" intensity={5}>
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] transition-colors group overflow-hidden"
        >
          {/* Platform icon bubble */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.12 }}
            transition={{ duration: 0.4 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0 shadow-lg ${p.glow}`}
          >
            <Icon
              size={22}
              className={p.dark ? "text-black" : "text-white"}
            />
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p
              className="font-bold text-white text-sm"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {p.name}
            </p>
            <p className="text-slate-500 text-xs truncate mt-0.5">
              {displayURL}
            </p>
          </div>

          {/* Arrow */}
          <motion.div
            whileHover={{ x: 3, y: -3 }}
            className="text-slate-600 group-hover:text-violet-400 transition-colors flex-shrink-0"
          >
            <ArrowUpRight size={18} />
          </motion.div>

          {/* Shine sweep on hover */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ x: "200%", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)",
            }}
          />
        </motion.a>
      </TiltCard>
    </motion.div>
  );
}