import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GeneratorPage from "./pages/GeneratorPage";
import ProfilePage from "./pages/ProfilePage";
import { parseQRData, hasQRData } from "./utils/qr";
import type { Profile, PageType } from "./types";

export default function App() {
  const [page, setPage] = useState<PageType>("generator");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (hasQRData()) {
      setProfile(parseQRData());
      setPage("profile");
    }
  }, []);

  const slideVariants = {
    enterFromRight: { opacity: 0, x: 40 },
    enterFromLeft: { opacity: 0, x: -40 },
    center: { opacity: 1, x: 0 },
    exitToLeft: { opacity: 0, x: -40 },
    exitToRight: { opacity: 0, x: 40 },
  };

  return (
    <AnimatePresence mode="wait">
      {page === "generator" ? (
        <motion.div
          key="generator"
          initial="enterFromLeft"
          animate="center"
          exit="exitToLeft"
          variants={slideVariants}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <GeneratorPage
            onPreview={(data) => {
              setProfile(data);
              setPage("profile");
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="profile"
          initial="enterFromRight"
          animate="center"
          exit="exitToRight"
          variants={slideVariants}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <ProfilePage
            profile={profile!}
            onEdit={() => setPage("generator")}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}