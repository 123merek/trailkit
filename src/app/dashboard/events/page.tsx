import { BadgeDollarSign, CircleDot, MousePointerClick, Smartphone, Store } from "lucide-react";
import { getEvents } from "@/lib/sample-data";
import { formatCurrency } from "@/lib/utils";

const iconMap = {
  click: MousePointerClick,
  store_open: Store,
  first_open: Smartphone,
  trial_started: CircleDot,
  subscription_started: BadgeDollarSign,
  renewal: BadgeDollarSign,
  purchase: BadgeDollarSign,
  payout_calculated: BadgeDollarSign,
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <main className="px-4 py-6 md:px-8">
      <div>
        <p className="text-sm font-semibold text-primary">Events</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Attribution event stream</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          A privacy-conscious stream of click, store_open, first_open, trial_started, subscription_started, renewal, purchase, and payout_calculated events.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-[8px] border border-white/10">
        {events.map((event) => {
          const Icon = iconMap[event.eventType];

          return (
            <div key={event.id} className="grid gap-4 border-b border-white/10 bg-white/[0.03] p-4 last:border-b-0 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-primary/25 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                  <p className="font-mono text-xs text-primary">{event.eventType}</p>
                  <p className="text-sm font-medium text-white">{event.smartLinkName}</p>
                  <p className="text-xs text-muted">{event.sourceName}</p>
                </div>
                <p className="mt-2 text-sm text-muted">{event.metadata}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs text-muted">{new Date(event.occurredAt).toLocaleString()}</p>
                {event.amount ? (
                  <p className="metric-tabular mt-1 text-sm font-semibold text-warning">
                    {formatCurrency(event.amount, event.currency)}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
