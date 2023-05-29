import React, { PropsWithChildren } from "react";
import classes from "./Layout.module.css";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link href="/">
            <Image alt="logo" width={80} height={80} src="/logo-1.png" />
          </Link>
          Ultimate Chef
        </div>
        <nav className={classes.nav}>
          <Link href="/">Home</Link>
          <Link href="/posts">Recipes</Link>
        </nav>
      </header>

      <div style={{ overflowY: "auto", height: "calc(100vh - 90px)" }}>
        <main className={classes.main}>{children}</main>
        <footer className={classes.footer}>
          &copy; 2023 Ultimate Chef. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
