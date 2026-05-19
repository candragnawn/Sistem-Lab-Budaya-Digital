"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: "Login";
      url: "/login";
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/SIWADA.svg",
    alt: "logo",
    title: "SIWADA",
  },
  menu = [
    { title: "Daftar Dosen", url: "#" },
    {
      title: "Publikasi",
      url: "#",
      items: [
        {
          title: "Artikel Ilmiah",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Hak Paten",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Publikasi Karya",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Arsip Digital",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    { title: "Dashboard", url: "/dashboard/profil" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
  },
  className,
}: Navbar1Props) => {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    role: string;
    photo: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    router.push("/login");
  };

  return (
    <section
      className={cn(
        "py-0 bg-[#1E3A5F] text-white border-b-2 border-yellow-400",
        className,
      )}
    >
      <div className="w-full px-4">
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a
              href={logo.url}
              className="flex items-center gap-2 text-foreground"
            >
              <img src={logo.src} className="max-h-7" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center ml-120">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 cursor-pointer text-white hover:opacity-80 transition-opacity select-none"
                >
                  <div className="h-9 w-9 rounded-full border-2 border-yellow-400 overflow-hidden bg-white/20">
                    <img
                      src={user.photo}
                      alt="Foto Profil"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold leading-none">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-yellow-400 font-medium mt-1">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 opacity-80 ml-1 transition-transform duration-200",
                      showDropdown && "rotate-180",
                    )}
                  />
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-lg bg-white shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-xs font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-gray-500">{user.role}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profil"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User className="h-3.5 w-3.5 text-gray-400" />
                        Profil Saya
                      </Link>
                      <Link
                        href="/dashboard/profil"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <Settings className="h-3.5 w-3.5 text-gray-400" />
                        Pengaturan
                      </Link>
                    </div>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm">
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a
              href={logo.url}
              className="flex items-center gap-2 text-foreground"
            >
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a
                      href={logo.url}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <img
                        src={logo.src}
                        className="max-h-8"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {user ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-black">
                          <div className="h-10 w-10 rounded-full border-2 border-yellow-500 overflow-hidden bg-gray-100">
                            <img
                              src={user.photo}
                              alt="Foto Profil"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-semibold leading-none">
                              {user.name}
                            </span>
                            <span className="text-xs text-yellow-600 font-medium mt-1">
                              {user.role}
                            </span>
                          </div>
                        </div>
                        <Link
                          href="/dashboard/profil"
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#1E3A5F]"
                        >
                          <User className="h-4 w-4" />
                          Profil Saya
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar
                        </button>
                      </div>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link href={auth.login.url}>
                            {auth.login.title}
                          </Link>
                        </Button>
                        <Button asChild>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className="rounded-md px-3 py-1 text-sm font-medium text-white transition-colors 
      hover:!bg-white/10 hover:!text-white"
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink
              asChild
              key={subItem.title}
              className="w-80"
            >
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 items-center justify-center rounded-md 
    px-2 py-1 text-sm font-medium transition-colors hover:bg-white/6 hover:text-[white] border-b-2"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b-0"
      >
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-[#ffffff] hover:text-[#1E3A5F]"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
