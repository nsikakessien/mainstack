"use client";
import { UserDetails } from "@api/user/types";
import { useGetUser } from "@api/user/user";
import Modal from "@components/modal/Modal";
import { Dialog, Popover } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";

interface MenuProp {
  name: string;
  icon: string;
  selectedIcon: string;
  path: string;
}

const menu: MenuProp[] = [
  {
    name: "Home",
    icon: "/assets/icons/home.svg",
    selectedIcon: "/assets/icons/home-white.svg",
    path: "/",
  },
  {
    name: "Analytics",
    icon: "/assets/icons/analytics.svg",
    selectedIcon: "/assets/icons/analytics-white.svg",
    path: "/analytics",
  },
  {
    name: "Revenue",
    icon: "/assets/icons/revenue.svg",
    selectedIcon: "/assets/icons/revenue-white.svg",
    path: "/revenue",
  },
  {
    name: "CRM",
    icon: "/assets/icons/crm.svg",
    selectedIcon: "/assets/icons/crm-white.svg",
    path: "/crm",
  },
  {
    name: "Apps",
    icon: "/assets/icons/apps.svg",
    selectedIcon: "/assets/icons/apps-white.svg",
    path: "/apps",
  },
];

const Header = () => {
  const pathname = usePathname();
  const { data, isLoading } = useGetUser();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nameInitials = (firstName: string, lastName: string) => {
    const firstChar = firstName?.charAt(0).toUpperCase();
    const secondChar = lastName?.charAt(0).toUpperCase();
    return `${firstChar}${secondChar}`;
  };

  const userDetails = useMemo(() => data?.data as UserDetails, [data]);

  return (
    <header className="fixed-header flex items-center">
      <nav
        className="flex items-center justify-between p-6 lg:px-6 lg:py-0 w-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="mainstack logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Image
              src="/assets/icons/thin-hamburger.svg"
              alt="hamburger icon"
              width={24}
              height={24}
            />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {menu.map((item) => (
            <Link
              className={`flex text-base font-semibold ${
                pathname === item.path
                  ? "text-white-100"
                  : "text-gray-400 hover:bg-gray-50"
              }  gap-1 items-center rounded-[100px] py-2 pl-[14px] pr-[18px] ${
                pathname === item.path ? "bg-black-300" : ""
              }`}
              key={item.name}
              href={item.path}
            >
              <Image
                src={pathname === item.path ? item.selectedIcon : item.icon}
                alt="menu icon"
                width={20}
                height={20}
              />
              <p className="">{item.name}</p>
            </Link>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Image
            src="/assets/icons/bell.svg"
            alt="notification icon"
            width={20}
            height={20}
            className="lg:mr-7 mr-2"
          />
          <Image
            src="/assets/icons/note.svg"
            alt="notification icon"
            width={20}
            height={20}
            className="lg:mr-[10px] mr-2"
          />

          <div className="bg-gray-50 py-1 pl-[5px] pr-3 flex items-center gap-2 rounded-[100px] cursor-pointer">
            <div className="relative">
              <Image
                src="/assets/icons/eclipse.svg"
                alt="black circle"
                width={32}
                height={32}
              />
              <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
                <p className="text-sm font-semibold text-white-100">
                  {nameInitials(
                    userDetails?.first_name,
                    userDetails?.last_name
                  )}
                </p>
              </div>
            </div>
            <Image
              src="/assets/icons/thin-hamburger.svg"
              alt="hamburger icon"
              width={24}
              height={24}
            />
          </div>
        </div>
      </nav>

      <Modal visible={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              alt="mainstack logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {menu.map((item) => (
                <Link
                  className={`flex text-base font-semibold ${
                    pathname === item.path
                      ? "text-white-100"
                      : "text-gray-400 hover:bg-gray-50"
                  }  gap-1 items-center rounded-[100px] py-2 pl-[14px] pr-[18px] ${
                    pathname === item.path ? "bg-black-300" : ""
                  }`}
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src={pathname === item.path ? item.selectedIcon : item.icon}
                    alt="menu icon"
                    width={20}
                    height={20}
                  />
                  <p className="">{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Dialog.Panel className="fixed bg-white-100 inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/assets/images/logo.svg"
                alt="mainstack logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menu.map((item) => (
                  <Link
                    className={`flex text-base font-semibold ${
                      pathname === item.path
                        ? "text-white-100"
                        : "text-gray-400 hover:bg-gray-50"
                    }  gap-1 items-center rounded-[100px] py-2 pl-[14px] pr-[18px] ${
                      pathname === item.path ? "bg-black-300" : ""
                    }`}
                    key={item.name}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Image
                      src={
                        pathname === item.path ? item.selectedIcon : item.icon
                      }
                      alt="menu icon"
                      width={20}
                      height={20}
                    />
                    <p className="">{item.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> */}
    </header>
  );
};

export default Header;
