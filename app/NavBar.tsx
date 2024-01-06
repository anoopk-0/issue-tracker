"use client";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import React from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  // usePathname only works in Client Components. Add the "use client" directive at the top of the file to use it.
  const activeRoute = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 py-3 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames(
                activeRoute === link.href ? "text-zinc-900" : "text-zinc-500",
                "hover:text-zinc-800",
                "transition-colors"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
