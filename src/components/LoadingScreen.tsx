import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from '../config/theme';

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1800);
    const t2 = setTimeout(() => onComplete(),  2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="igo-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          {/* Soft radial background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 46%, rgba(26,66,49,0.055) 0%, rgba(197,160,63,0.03) 55%, #ffffff 100%)",
            }}
          />

          {/* ── Central stack ── */}
          <div className="relative z-10 flex flex-col items-center select-none">

            {/* ── Logo card + counter-rotating rings ── */}
            <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>

              {/* Outer pulse halo */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ width: 260, height: 260, border: "1px solid rgba(197,160,63,0.10)" }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Ring 1 — dark green, clockwise */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.svg
                  width="260" height="260"
                  viewBox="0 0 260 260"
                  style={{ position: "absolute", inset: 0, transformOrigin: "center" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="130" cy="130" r="114"
                    fill="none"
                    stroke={colors.green[800]}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="175 541"
                  />
                </motion.svg>
              </motion.div>

              {/* Ring 2 — gold, counter-clockwise */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <motion.svg
                  width="260" height="260"
                  viewBox="0 0 260 260"
                  style={{ position: "absolute", inset: 0, transformOrigin: "center" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="130" cy="130" r="96"
                    fill="none"
                    stroke={colors.gold[500]}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="110 493"
                  />
                </motion.svg>
              </motion.div>

              {/* ── Round logo card ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.55, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 148,
                  height: 148,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow:
                    "0 4px 24px rgba(26,66,49,0.10), 0 1px 6px rgba(26,66,49,0.07), 0 0 0 1px rgba(26,66,49,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 10,
                  overflow: "hidden",
                }}
              >
                {/* Logo — static, no rotation */}
                <img
                  src="/assets/compressed/logo-igo.webp"
                  alt="IGO Agritech Farms Corporate Brand Identity"
                  style={{
                    width: 148,
                    height: 148,
                    objectFit: "cover",
                    imageRendering: "auto",
                    borderRadius: "50%",
                  }}
                />
              </motion.div>
            </div>

            {/* ── Brand name ── */}
            <motion.div
              className="flex flex-col items-center text-center mt-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: 26,
                  letterSpacing: "0.04em",
                  color: colors.earth[900],
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                IGO Agritech
              </p>

              <motion.p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.48em",
                  color: colors.gold[500],
                  fontWeight: 700,
                  marginTop: 6,
                  textTransform: "uppercase",
                  opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                Farms
              </motion.p>
            </motion.div>

            {/* ── Progress bar ── */}
            <motion.div
              style={{
                marginTop: 28,
                width: 140,
                height: 2,
                borderRadius: 99,
                background: "rgba(0,0,0,0.07)",
                overflow: "hidden",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: 99,
                  background: `linear-gradient(90deg, ${colors.green[800]} 0%, ${colors.gold[500]} 100%)`,
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Loading label */}
            <motion.p
              style={{
                marginTop: 10,
                fontSize: 9,
                color: "rgba(0,0,0,0.22)",
                textTransform: "uppercase",
                letterSpacing: "0.45em",
                fontWeight: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Loading
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                …
              </motion.span>
            </motion.p>
          </div>

          {/* ── Bottom tagline ── */}
          <motion.p
            className="absolute bottom-8 text-center w-full"
            style={{
              fontSize: 9,
              color: "rgba(0,0,0,0.18)",
              textTransform: "uppercase",
              letterSpacing: "0.55em",
              fontWeight: 500,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
          >
            Precision · Sustainability · Excellence
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

