import { Globe } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaSnapchat,
} from "react-icons/fa6";
import type { Platform } from "../types";

export const PLATFORMS: Record<string, Platform> = {
  instagram: {
    name: "Instagram",
    Icon: FaInstagram,
    gradient: "from-yellow-400 via-pink-500 to-purple-600",
    glow: "shadow-pink-500/40",
    ring: "ring-pink-500/30",
    label: "#E1306C",
  },
  facebook: {
    name: "Facebook",
    Icon: FaFacebook,
    gradient: "from-blue-500 to-blue-700",
    glow: "shadow-blue-500/40",
    ring: "ring-blue-500/30",
    label: "#1877F2",
  },
  twitter: {
    name: "Twitter / X",
    Icon: FaXTwitter,
    gradient: "from-neutral-700 to-neutral-900",
    glow: "shadow-neutral-400/30",
    ring: "ring-neutral-400/20",
    label: "#e2e8f0",
  },
  tiktok: {
    name: "TikTok",
    Icon: FaTiktok,
    gradient: "from-cyan-400 via-black to-rose-500",
    glow: "shadow-rose-500/40",
    ring: "ring-rose-500/30",
    label: "#ff0050",
  },
  youtube: {
    name: "YouTube",
    Icon: FaYoutube,
    gradient: "from-red-500 to-red-700",
    glow: "shadow-red-500/40",
    ring: "ring-red-500/30",
    label: "#FF0000",
  },
  linkedin: {
    name: "LinkedIn",
    Icon: FaLinkedin,
    gradient: "from-sky-500 to-sky-800",
    glow: "shadow-sky-500/40",
    ring: "ring-sky-500/30",
    label: "#0A66C2",
  },
  snapchat: {
    name: "Snapchat",
    Icon: FaSnapchat,
    gradient: "from-yellow-300 to-yellow-400",
    glow: "shadow-yellow-400/40",
    ring: "ring-yellow-400/30",
    label: "#FFFC00",
    dark: true,
  },
  website: {
    name: "Site Web",
    Icon: Globe,
    gradient: "from-violet-500 to-indigo-700",
    glow: "shadow-violet-500/40",
    ring: "ring-violet-500/30",
    label: "#8b5cf6",
  },
};

export const PLATFORM_KEYS = Object.keys(PLATFORMS);