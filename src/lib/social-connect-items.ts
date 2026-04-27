import {
  IconBrandDiscord,
  IconBrandX,
  IconBrandYoutube,
  IconLink,
  IconMail,
} from "@tabler/icons-react";

import { siteLinks } from "@/lib/site-links";

export const socialConnectItems = [
  { label: "X", href: siteLinks.x, icon: IconBrandX },
  { label: "YouTube", href: siteLinks.youtube, icon: IconBrandYoutube },
  { label: "Email", href: siteLinks.email, icon: IconMail },
  { label: "Discord", href: siteLinks.discord, icon: IconBrandDiscord },
  { label: "Portfolio", href: siteLinks.portfolio, icon: IconLink },
] as const;
