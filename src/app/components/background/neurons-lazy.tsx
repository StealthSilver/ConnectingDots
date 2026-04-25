"use client";

import dynamic from "next/dynamic";

const NeuronsImpl = dynamic(() => import("./neurons"), {
  ssr: false,
  loading: () => null,
});

export function Neurons() {
  return <NeuronsImpl />;
}
