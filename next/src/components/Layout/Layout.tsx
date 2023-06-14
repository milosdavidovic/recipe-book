import React, { PropsWithChildren, useRef } from "react";
import classes from "./Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { useScroll, motion, useTransform } from "framer-motion";

const Layout = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: ref,
  });

  const size = useTransform(
    scrollY,
    // Map x from these values:
    [0, 500],
    // Into these values:
    [100, 60]
  );

  const scale = useTransform(
    scrollY,
    // Map x from these values:
    [0, 500],
    // Into these values:
    [1, 0.75]
  );

  return (
    <div className={classes.container}>
      <motion.header className={classes.header} style={{ opacity: scale }}>
        <motion.div className={classes.logo}>
          <Link href="/">
            <motion.div
              style={{ width: size, height: size, position: "relative" }}
            >
              <Image
                alt="logo"
                fill
                style={{ objectFit: "cover" }}
                src="/logo.png"
              />
            </motion.div>
          </Link>
          <motion.span style={{ scale }}>Ultimate Chef</motion.span>
        </motion.div>
        <nav className={classes.nav}>
          <Link href="/">Home</Link>
          <Link href="/posts">Recipes</Link>
        </nav>
      </motion.header>

      <div style={{ overflowY: "auto", height: "100vh" }} ref={ref}>
        <main className={classes.main}>{children}</main>
        <footer className={classes.footer}>
          &copy; 2023 Ultimate Chef. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
