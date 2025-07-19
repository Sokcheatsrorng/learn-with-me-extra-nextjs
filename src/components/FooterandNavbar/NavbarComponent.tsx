
import { Navbar1Props } from "./menu-item";
import DesktopMenuComponent from "./DesktopMenu";
import MobileMenuComponent from "./MobileMenuComponent";

const NavbarComponent = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home",
      url: "/" ,
      active: ""
    },
    {
      title: "Products",
      url: "/product",
      active: ""
     
    },
    {
      title: "About Us",
      url: "/about",
      active: ""
    },
    {
      title: "Contact ",
      url: "/contact",
      active: ""
    },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
}: Navbar1Props) => {
  return (
    <section className="py-4">
      <div className="container">
        {/* Desktop Menu */}
        <DesktopMenuComponent logo={logo} auth={auth} menu={menu}/>
       
        {/* Mobile Menu */}
        <MobileMenuComponent logo={logo} auth={auth} menu={menu}/>
        
      </div>
    </section>
  );
};

export {  NavbarComponent };
