import { motion } from "framer-motion";

interface AvatarProps {
  name: string;
  size?: number;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({ name, size = 96 }: AvatarProps) {
  const initials = name ? getInitials(name) : "?";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Rotating gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
          padding: 2.5,
          borderRadius: "50%",
        }}
      />

      {/* Inner circle */}
      <div
        className="absolute inset-[2.5px] rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center border-[3px] border-[#060610]"
        style={{
          fontSize: size * 0.3,
          fontWeight: 800,
          fontFamily: "'Syne', sans-serif",
          color: "#fff",
          letterSpacing: "-0.5px",
        }}
      >
        {initials}
      </div>

      {/* Online indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
        className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#060610] shadow-lg shadow-emerald-400/50"
      />
    </div>
  );
}