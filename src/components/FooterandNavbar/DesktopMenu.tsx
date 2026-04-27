"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { Navbar1Props } from "./menu-item";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { usePathname } from "next/navigation";
import { RenderMenuItemMobileComponent } from "./RenderMenuItemComponent";

export default function DesktopMenuComponent({ logo, auth, menu }: Navbar1Props) {
    const pathName = usePathname();

    return (
        <nav className="hidden lg:grid grid-cols-3 items-center w-full px-6 py-3">
            
            {/* Left — Logo */}
            <div className="flex items-center gap-2">
                <a href={logo?.url} className="flex items-center gap-2">
                    <Image
                        src={logo?.src as string}
                        width={25}
                        height={25}
                        className="max-h-8"
                        alt={logo?.alt as string}
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                        {logo?.title}
                    </span>
                </a>
            </div>

            {/* Center — Menu */}
            <div className="flex items-center justify-center ">
                <NavigationMenu>
                    {menu?.map((item, index) => (
                        <NavigationMenuList
                            key={index}
                            className={pathName === item.url ? "text-amber-400 me-8" : "text-black me-8"}
                        >
                            {RenderMenuItemMobileComponent(item)}
                        </NavigationMenuList>
                    ))}
                </NavigationMenu>
            </div>

            {/* Right — Auth buttons */}
            <div className="flex items-center justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                    <a href={auth?.login.url}>{auth?.login.title}</a>
                </Button>
                <Button asChild size="sm">
                    <a href={auth?.signup.url}>{auth?.signup.title}</a>
                </Button>
            </div>

        </nav>
    );
}