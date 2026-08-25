export const PRODUCT_TYPE_OPTIONS = [
  { value: "WEBSITE", label: "Website (e.g. portfolio, business site)" },
  { value: "SAAS_APPLICATION", label: "SaaS application" },
  { value: "APPLICATION", label: "Custom application" },
  { value: "THREE_D_WEBSITE", label: "3D website (Three.js)" },
  { value: "AUTOMATION", label: "Automation for my company (n8n)" },
  { value: "AI_AGENT_APP", label: "App powered by an AI agent" },
] as const;

export const BRAND_ASSETS_OPTIONS = [
  { value: "HAVE_ALL", label: "Yes, we have a logo, design system, and theme" },
  { value: "PARTIAL", label: "We have some of it, and would like Mina's help" },
  { value: "NEED_ALL", label: "We need Mina to create all of it" },
  {
    value: "PENDING_FROM_OTHER_PARTY",
    label: "Not yet — we're getting it from another party and will share it with you",
  },
] as const;

export const YES_NO_OPTIONS = [
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
] as const;

export const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "IN_DISCUSSION", label: "In discussion" },
  { value: "PROPOSAL_SENT", label: "Proposal sent" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
  { value: "ARCHIVED", label: "Archived" },
] as const;

export const BUDGET_OPTIONS = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "No fixed timeline",
] as const;

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export const productTypeLabel = (value: string) => labelFor(PRODUCT_TYPE_OPTIONS, value);
export const brandAssetsLabel = (value: string) => labelFor(BRAND_ASSETS_OPTIONS, value);
export const yesNoLabel = (value: string) => labelFor(YES_NO_OPTIONS, value);
export const statusLabel = (value: string) => labelFor(STATUS_OPTIONS, value);
