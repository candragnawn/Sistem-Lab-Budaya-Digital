"use client";

import { motion, HTMLMotionProps } from 'framer-motion';

export function PageTransition(props: HTMLMotionProps<"main">) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      {props.children}
    </motion.main>
  );
}
