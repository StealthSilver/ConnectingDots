"use client";

import Link from "next/link";

import { AuthCtaLink } from "@/components/auth-cta-link";
import { heroPairedCtaClass } from "@/lib/pill-chrome";
import { cn } from "@/lib/utils";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

export function Hero01CtaButtons() {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <AuthCtaLink
        signedOutLabel="Sign up now"
        containerClassName="w-full sm:w-fit"
        className={cn(navChakra, "flex w-full justify-center px-6 sm:w-auto sm:px-7")}
      />

      <Link
        href="#about"
        className={cn(
          heroPairedCtaClass,
          navChakra,
          "w-full cursor-pointer justify-center tracking-tight sm:w-auto",
        )}
      >
        Learn more
      </Link>
    </div>
  );
}
