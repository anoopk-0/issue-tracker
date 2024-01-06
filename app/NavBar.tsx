"use client";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const { status, data: session } = useSession();

  console.log("session");

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  // usePathname only works in Client Components. Add the "use client" directive at the top of the file to use it.
  const activeRoute = usePathname();

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Flex direction="row" justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <FaBug />
          </Link>
          <ul className="flex space-x-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={classNames(
                    activeRoute === link.href
                      ? "text-zinc-900"
                      : "text-zinc-500",
                    "hover:text-zinc-800",
                    "transition-colors"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  size="2"
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">SignIn</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
