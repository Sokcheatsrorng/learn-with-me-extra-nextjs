import Image from "next/image";
// import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Navbar1Props } from "./menu-item";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { RenderMenuItemMobileComponent } from "./RenderMenuItemComponent";


export default function DesktopMenuComponent(
    {logo,
    auth,
    menu
}:Navbar1Props

){
   console.log("menu",menu)
    return (
      <nav className=" hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo?.url} className="flex items-center gap-2">
              <Image src={logo?.src as string} 
              width={25}
              height={25}
              className="max-h-8" alt={logo?.alt as string} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo?.title}
              </span>
            </a>
          </div>

            {/* list menuItem */}
            <div className="flex items-center ">
              <NavigationMenu>
                <NavigationMenuList className="gap-5">
                  {menu?.map((item) => RenderMenuItemMobileComponent(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={auth?.login.url}>{auth?.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth?.signup.url}>{auth?.signup.title}</a>
            </Button>
          </div>
        </nav>

    )
}