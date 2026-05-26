"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeDollarSign, MousePointerClick, Smartphone, Sparkles } from "lucide-react";

const nodes = [
  { label: "Click", icon: MousePointerClick, color: "text-primary", detail: "creator link" },
  { label: "Install", icon: Smartphone, color: "text-success", detail: "first open" },
  { label: "Revenue", icon: Sparkles, color: "text-warning", detail: "subscription" },
  { label: "Payout", icon: BadgeDollarSign, color: "text-warning", detail: "estimate" },
];

export function AttributionFlowVisual() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-[#d8cdf7] bg-[#fffdf8]/78 p-4 shadow-2xl">
      <div className="grid gap-3 sm:grid-cols-4">
        {nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="relative rounded-[8px] border border-[#e0d7f7] bg-[#f7f2ff] p-4"
            >
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${node.color}`} />
                {index < nodes.length - 1 ? (
                  <ArrowRight className="hidden h-4 w-4 text-[#9a8abf] sm:block" />
                ) : null}
              </div>
              <p className="mt-5 text-sm font-semibold text-[#372a54]">{node.label}</p>
              <p className="mt-1 text-xs text-[#72668a]">{node.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
