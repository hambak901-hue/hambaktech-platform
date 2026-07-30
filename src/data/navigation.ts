export interface NavItem {
  id: number;
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Services",
    href: "#services",
  },
  {
    id: 3,
    label: "Academy",
    href: "#academy",
  },
  {
    id: 4,
    label: "Contact",
    href: "#contact",
  },
];