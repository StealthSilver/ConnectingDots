"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

/* Monochrome shell shadows (black / white only) */
const shellShadow =
  "0 0 0 1px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.12) inset";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? shellShadow : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden min-h-12 w-full max-w-7xl flex-row items-center justify-between self-start rounded-full border border-transparent bg-transparent px-3 py-2 lg:flex",
        visible && "border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 z-10 hidden flex-1 flex-row items-center justify-center gap-1 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative rounded-full px-4 py-2 text-black transition-colors dark:text-white"
          key={`link-${item.link}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hover"
              className="absolute inset-0 rounded-full bg-black/[0.06] dark:bg-white/10"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? shellShadow : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "0.5rem" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between border border-transparent bg-transparent py-2 lg:hidden",
        visible && "border-black/10 bg-white/80 dark:border-white/10 dark:bg-black/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between gap-2 px-1",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className={cn(
            "absolute inset-x-0 top-[3.5rem] z-50 flex w-full flex-col items-stretch justify-start gap-1 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-black",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black transition hover:bg-black/5 focus-visible:outline focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white/30"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
    </button>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & Record<string, unknown>) => {
  const baseStyles =
    "relative z-30 inline-flex min-h-10 min-w-[5.5rem] cursor-pointer items-center justify-center rounded-full border border-transparent bg-transparent px-5 py-2.5 text-center text-base font-semibold leading-snug tracking-tight transition will-change-transform hover:-translate-y-px focus-visible:outline focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-white/30 dark:focus-visible:ring-offset-black";

  const variantStyles = {
    primary: cn(
      "border-black/20 bg-white !text-black shadow-sm dark:border-white/25 dark:bg-white dark:!text-black",
    ),
    secondary: "border border-black/20 bg-transparent text-black dark:border-white/20 dark:text-white",
    dark: "border border-black bg-black text-white shadow-sm dark:border-white dark:bg-white dark:text-black",
    gradient:
      "border border-black bg-black text-white shadow-sm dark:border-white dark:bg-white dark:text-black",
  } as const;

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <span className="pointer-events-none relative z-[1] text-inherit">
        {children}
      </span>
    </Tag>
  );
};
