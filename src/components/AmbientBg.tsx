import { motion } from "framer-motion";

const BLOBS = [
  {
    color: "#6d28d9",
    size: 600,
    style: { top: -200, right: -150 },
    duration: 8,
    delay: 0,
  },
  {
    color: "#0e7490",
    size: 500,
    style: { bottom: -100, left: -150 },
    duration: 10,
    delay: 2,
  },
  {
    color: "#9d174d",
    size: 400,
    style: { top: "40%", left: "35%" },
    duration: 12,
    delay: 4,
  },
];

export default function AmbientBg() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
            filter: "blur(80px)",
            ...blob.style,
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}