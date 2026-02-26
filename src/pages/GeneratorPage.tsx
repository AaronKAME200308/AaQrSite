import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  User,
  Pencil,
} from "lucide-react";
import AmbientBg from "../components/AmbientBg";
import { PLATFORMS } from "../constants/platforms";
import { buildProfileURL, parseQRData } from "../utils/qr";
import type { Profile, FormData } from "../types";

interface GeneratorPageProps {
  onPreview: (data: Profile) => void;
}

const EMPTY_FORM: FormData = {
  name: "",
  bio: "",
  instagram: "",
  facebook: "",
  twitter: "",
  tiktok: "",
  youtube: "",
  linkedin: "",
  snapchat: "",
  website: "",
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function GeneratorPage({ onPreview }: GeneratorPageProps) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [step, setStep] = useState<0 | 1>(0);
  const [copied, setCopied] = useState(false);

  const generatedURL = buildProfileURL(form);

  const set = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const copyURL = async () => {
    await navigator.clipboard.writeText(generatedURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePreview = () => {
    window.history.replaceState({}, "", "?" + generatedURL.split("?")[1]);
    onPreview(parseQRData());
  };

  const infoFields = [
    {
      key: "name" as keyof FormData,
      label: "Nom affiché",
      placeholder: "Ex : Marie Dupont",
      Icon: User,
    },
    {
      key: "bio" as keyof FormData,
      label: "Bio / Tagline",
      placeholder: "Ex : Photographe & créatrice ✨",
      Icon: Pencil,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060610] text-white relative">
      <AmbientBg />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-16">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30 mb-5"
          >
            <Zap size={28} className="text-white" />
          </motion.div>

          <h1
            className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-violet-200 to-fuchsia-300 bg-clip-text text-transparent mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Linkr
          </h1>
          <p className="text-slate-500 text-sm">
            Créez votre page de liens · Partagez via QR code
          </p>
        </motion.div>

        {/* ── Step tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl backdrop-blur"
        >
          {(["Identité", "Réseaux sociaux"] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setStep(i as 0 | 1)}
              className="flex-1 relative py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {step === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg shadow shadow-violet-500/30"
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  step === i ? "text-white" : "text-slate-500"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Form content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: step === 0 ? -20 : 20 }}
            className="space-y-3"
          >
            {step === 0
              ? /* Identity fields */
                infoFields.map(({ key, label, placeholder, Icon }) => (
                  <motion.div key={key} variants={itemVariants}>
                    <label
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      <Icon size={11} className="text-violet-400" />
                      {label}
                    </label>
                    <input
                      value={form[key]}
                      onChange={(e) => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all"
                    />
                  </motion.div>
                ))
              : /* Social fields */
                Object.entries(PLATFORMS).map(([key, p]) => {
                  const { Icon } = p;
                  const filled = !!(form as Record<string, string>)[key]?.trim();
                  return (
                    <motion.div
                      key={key}
                      variants={itemVariants}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        filled
                          ? "border-violet-500/40 bg-violet-500/5"
                          : "border-white/5 bg-white/[0.02]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0 shadow-md ${p.glow}`}
                      >
                        <Icon
                          size={18}
                          className={p.dark ? "text-black" : "text-white"}
                        />
                      </div>

                      <input
                        value={(form as Record<string, string>)[key] || ""}
                        onChange={(e) =>
                          set(key as keyof FormData, e.target.value)
                        }
                        placeholder={`URL ${p.name}`}
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
                      />

                      <AnimatePresence>
                        {filled && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            <Check size={14} className="text-violet-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-3"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(139,92,246,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePreview}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <Sparkles size={18} />
            Voir mon profil
            <ChevronRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyURL}
            className="w-full py-3 rounded-2xl border border-white/10 bg-white/5 font-semibold text-slate-300 flex items-center justify-center gap-2 text-sm backdrop-blur hover:bg-white/10 transition-all"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="flex items-center gap-2 text-emerald-400"
                >
                  <Check size={15} /> URL copiée !
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="flex items-center gap-2"
                >
                  <Copy size={15} /> Copier le lien QR
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* ── Generated URL preview ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5"
        >
          <p className="text-[10px] font-mono text-slate-600 break-all leading-relaxed">
            {generatedURL}
          </p>
        </motion.div>
      </div>
    </div>
  );
}