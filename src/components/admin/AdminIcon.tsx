type IconName =
  | "dashboard"
  | "users"
  | "services"
  | "orders"
  | "payments"
  | "wallet"
  | "academy"
  | "nin"
  | "reports"
  | "cms"
  | "settings"
  | "logout"
  | "chevron"
  | "activity"
  | "arrow";

interface AdminIconProps {
  name: IconName;
  className?: string;
}

export default function AdminIcon({
  name,
  className = "h-5 w-5",
}: AdminIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    case "users":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case "services":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
          <path d="M10 12v2h4v-2" />
        </svg>
      );

    case "orders":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      );

    case "payments":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <path d="M6 15h4" />
        </svg>
      );

    case "wallet":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6" />
          <path d="M16 14h.01" />
        </svg>
      );

    case "academy":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="m2 9 10-5 10 5-10 5L2 9Z" />
          <path d="M6 11v5c0 2 3 4 6 4s6-2 6-4v-5" />
          <path d="M22 9v6" />
        </svg>
      );

    case "nin":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8" cy="10" r="2" />
          <path d="M13 9h5M13 13h5M6 16h12" />
        </svg>
      );

    case "reports":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20H2" />
        </svg>
      );

    case "cms":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <path d="M7 14h4M7 17h7" />
        </svg>
      );

    case "settings":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V22h-2.4v-.2a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.46 17a1.7 1.7 0 0 0-1.56-1.03H6.7v-2.4h.2a1.7 1.7 0 0 0 1.56-1.03 1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V7.5h2.4v.2a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06A1.7 1.7 0 0 0 19.4 13a1.7 1.7 0 0 0 1.56 1.03h.2v2.4h-.2A1.7 1.7 0 0 0 19.4 15Z" />
        </svg>
      );

    case "logout":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
        </svg>
      );

    case "chevron":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );

    case "activity":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M3 12h4l2-7 4 14 2-7h6" />
        </svg>
      );

    case "arrow":
      return (
        <svg viewBox="0 0 24 24" className={className} {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    default:
      return null;
  }
}