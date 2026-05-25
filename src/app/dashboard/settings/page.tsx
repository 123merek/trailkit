import { KeyRound, Link2, Smartphone, Webhook } from "lucide-react";
import { demoApp } from "@/lib/sample-data";
import { CopyButton } from "@/components/shared/CopyButton";
import { CustomDomainPanel } from "@/components/dashboard/CustomDomainPanel";
import { listCustomDomains } from "@/lib/data";

export default async function SettingsPage() {
  const domains = (await listCustomDomains()).map((domain) => ({
    id: domain.id,
    hostname: domain.hostname,
    status: domain.status,
    verification: domain.verification,
  }));
  const fields = [
    { label: "App name", value: demoApp.name, icon: Smartphone },
    { label: "iOS App Store URL", value: demoApp.iosUrl, icon: Link2 },
    { label: "Google Play URL", value: demoApp.androidUrl, icon: Link2 },
    { label: "Fallback URL", value: demoApp.fallbackUrl, icon: Link2 },
    { label: "Custom domain placeholder", value: demoApp.customDomain, icon: Link2 },
    { label: "RevenueCat webhook URL placeholder", value: demoApp.revenueWebhookUrl, icon: Webhook },
    { label: "API key placeholder", value: demoApp.apiKey, icon: KeyRound },
    { label: "SDK status placeholder", value: demoApp.sdkStatus, icon: Smartphone },
  ];

  return (
    <main className="px-4 py-6 md:px-8">
      <div>
        <p className="text-sm font-semibold text-primary">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">App and integration setup</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          MVP workspace settings for store URLs, custom domains, revenue webhooks, API keys, and SDK readiness.
        </p>
      </div>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.label} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Icon className="h-4 w-4 text-primary" />
                    {field.label}
                  </div>
                  <p className="mt-3 break-all font-mono text-xs text-muted">{field.value}</p>
                </div>
                {field.value.includes("http") || field.value.startsWith("tk_") ? (
                  <CopyButton value={field.value} label="Copy" className="shrink-0" />
                ) : null}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-6 rounded-[8px] border border-warning/20 bg-warning/10 p-5">
        <h2 className="text-lg font-semibold text-white">MVP implementation notes</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Authentication, real API-key hashing, webhook signature verification, and SDK event persistence are intentionally placeholders in this prototype.
        </p>
      </section>

      <CustomDomainPanel initialDomains={domains} />
    </main>
  );
}
