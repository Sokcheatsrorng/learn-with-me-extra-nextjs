import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Navbar1Props } from "./menu-item";
import { Accordion } from "../ui/accordion";
import { RenderMenuItemMobileComponent } from "./RenderMenuItemComponent";



export default function MobileMenuComponent({
    logo,auth,menu
}:Navbar1Props
){
    return (
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo?.url} className="flex items-center gap-2">
              <Image 
              src={logo?.src as string}
               className="max-h-8"
               width={1000}
               height={1000}
                alt={logo?.alt as string} />
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
                    <a href={logo?.url} className="flex items-center gap-2">
                      <Image src={logo?.src as string} 
                      className="max-h-8"
                       alt={logo?.alt as string}
                       width={1000}
                       height={1000}
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
                    {menu?.map((item) => RenderMenuItemMobileComponent(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <a href={auth?.login.url}>{auth?.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth?.signup.url}>{auth?.signup.title}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
    )
}