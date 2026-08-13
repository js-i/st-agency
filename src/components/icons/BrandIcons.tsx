import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5 6v5.2c0 4.6 3 7.9 7 9.3 4-1.4 7-4.7 7-9.3V6l-7-2.5Z" />
      <path d="m9.2 12 1.9 1.9 3.7-3.9" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.2 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.2-3.5-8.5S9.7 5.8 12 3.5Z" />
    </svg>
  );
}

export function FamilyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.3" cy="7" r="2.3" />
      <circle cx="16.2" cy="7.8" r="1.9" />
      <path d="M3.5 19.5c0-3 2.2-5 4.8-5s4.8 2 4.8 5" />
      <path d="M13.6 14.9c1.9.2 3.5 1.9 3.5 4.4v.2h3.4" />
    </svg>
  );
}

export function DocumentsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.5h7.5L19 8v12.5H7z" />
      <path d="M14.2 3.5V8H19" />
      <path d="M9.7 12.5h6M9.7 15.5h6M9.7 18.5h3.6" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.6 9.4-1.5 4.4a1 1 0 0 1-.6.6l-4.4 1.5 1.5-4.4a1 1 0 0 1 .6-.6z" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.7 11.5 6.8 8l3 1.9" />
      <path d="M21.3 11.5 17.2 8l-2.5 1.6" />
      <path d="m9.8 9.9 3 2.4c.6.5.7 1.3.2 1.9-.5.6-1.3.6-1.9.2l-1.8-1.4" />
      <path d="m9.3 12.9 2.7 2.1c.6.5.7 1.3.2 1.9-.5.6-1.3.6-1.9.2l-1.8-1.4" />
      <path d="M2.7 11.5v5.3l3 1.9M21.3 11.5v5.3l-4.6 2.7-4.5-3.5" />
    </svg>
  );
}

export function PrivacyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5.5" y="11" width="13" height="9" rx="1.4" />
      <path d="M8.3 11V7.8a3.7 3.7 0 0 1 7.4 0V11" />
      <path d="M12 14.5v2.2" />
    </svg>
  );
}

export function MobilityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="12.5" r="8" />
      <path d="M15 6.5 21 9l-2 2-3.2-.9" />
      <path d="M3 12.5h16M11 4.5c1.8 1.9 2.7 4.9 2.7 8s-.9 6.1-2.7 8c-1.8-1.9-2.7-4.9-2.7-8s.9-6.1 2.7-8Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5a8.3 8.3 0 0 0-7.2 12.4L3.5 20.5l4.7-1.2A8.3 8.3 0 1 0 12 3.5Z" />
      <path d="M8.7 8.4c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.4-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.2.1.4.1.5-.1.2-.2.6-.7.8-1 .2-.2.3-.2.6-.1.2.1 1.5.7 1.8.9.3.1.4.2.5.3.1.2.1.9-.2 1.4-.3.6-1.6 1.2-2.2 1.2-.6 0-1.2 0-3.7-1.5-2.6-1.6-4.3-4.2-4.5-4.4-.1-.2-1-1.4-1-2.6 0-1.3.7-1.9.9-2.2Z" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 12.4 19.8 6c.7-.3 1.4.3 1.1 1.1l-2.7 12.8c-.2.9-1.1 1.2-1.8.7l-4-3-2 2c-.4.4-1 .2-1.1-.4l-.6-4" />
      <path d="m8.7 14.2 9.2-7.5-10.6 6.9" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M13 5.5 19.5 12 13 18.5" />
    </svg>
  );
}
