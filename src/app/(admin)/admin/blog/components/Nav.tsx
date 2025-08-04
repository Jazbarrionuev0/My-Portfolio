"use client";

import Link from "next/link";
import React from "react";
import LogoutButton from "../../components/LogoutButton";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/blog", label: "Blogs" },
    { href: "/admin/blog/create", label: "New Post" },
  ];

  const isActive = (href: string) => {
    // Exact match for all routes
    if (pathname === href) {
      return true;
    }

    // Special case: highlight "Blog Posts" for blog edit pages, but not for create
    if (href === "/admin/blog" && pathname.startsWith("/admin/blog/") && !pathname.includes("/create")) {
      return true;
    }

    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) ? "text-blue-600 bg-blue-50 rounded-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              View Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
