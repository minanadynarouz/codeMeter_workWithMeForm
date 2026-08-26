"use client";
import { StructureFlowCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <StructureFlowCollection
        variant="orbital-sphere"
        speed={1.00}
        particleSize={0.015}
        particleOpacity={0.89}
        orbitOpacity={0.25}
        hue={0}
        scale={0.92}
        haloOpacity={0.21}
      />
    </div>
  );
}