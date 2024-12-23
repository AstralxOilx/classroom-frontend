import { usePathname } from "next/navigation";
import { LayoutDashboard, School, Bell, Backpack, UserCog, ClipboardList ,ClipboardCheck} from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: "Dashboard",
      href: "/dashboard/class-group",
      icon: <LayoutDashboard />,
      active: isNavItemActive(pathname, "/dashboard"),
      position: 'hub'
    },
    {
      name: "Group",
      href: "/group",
      icon: <School />,
      active: isNavItemActive(pathname, "/group"),
      position: 'hub'
    },
    {
      name: "Assignment",
      href: "/assignment/up-coming",
      icon: <Backpack />,
      active: isNavItemActive(pathname, "/assignment"),
      position: 'hub'
    },
    {
      name: "Notifications",
      href: "/notification",
      icon: <Bell />,
      active: isNavItemActive(pathname, "/notification"),
      position: 'hub'
    },
  ];
};