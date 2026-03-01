import { motion } from "framer-motion";
import { Pencil, QrCode, Zap } from "lucide-react";
import AmbientBg from "../components/AmbientBg";
import Avatar from "../components/Avatar";
import LinkCard from "../components/LinkCard";
import type { Profile } from "../types";

interface ProfilePageProps {
  profile: Profile;
  onEdit: () => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.35,
    },
  },
};

export default function ProfilePage({ profile, onEdit }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-[#060610] text-white relative overflow-hidden">
      <AmbientBg />

      {/* ── Edit button ── */}
      {/* <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEdit}
        className="fixed top-5 right-5 z-50 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.07] border border-white/10 text-slate-400 text-xs font-semibold backdrop-blur hover:text-white hover:bg-white/[0.12] transition-all"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        <Pencil size={12} />
        Update
      </motion.button> */}

      <div className="relative z-10 max-w-md mx-auto px-4 py-16 flex flex-col items-center">

        {/* ── Avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mb-6"
        >
          <Avatar name={profile.name} size={96} />
        </motion.div>

        {/* ── Name ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent mb-2 text-center"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {profile.name || "Mon Profil"}
        </motion.h1>

        {/* ── Bio ── */}
        {profile.bio && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="text-slate-400 text-sm text-center max-w-xs mb-2 leading-relaxed"
          >
            {profile.bio}
          </motion.p>
        )}

        {/* ── Links count badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: "spring" }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-10"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <QrCode size={11} />
          {profile.links.length} Social{profile.links.length > 1 ? "x" : ""}
        </motion.div>

        {/* ── Link cards ── */}
        {profile.links.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-slate-600 py-16 flex flex-col items-center gap-3"
          >
            <QrCode size={48} className="opacity-20" />
            <p className="text-sm leading-relaxed">
              No network found.
              <br />
              Scan a valid QR code.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full space-y-3"
          >
            {profile.links.map(({ platform, url }, i) => (
              <LinkCard key={platform} platform={platform} url={url} index={i} />
            ))}
          </motion.div>
        )}

        {/* ── Footer ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-14 text-[11px] text-slate-700 flex items-center gap-1.5"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <Zap size={10} className="text-violet-800" />
          Linkr · Powered by QR code
        </motion.p>
      </div>
    </div>
  );
}