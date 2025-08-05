import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  const [onDarkBackground, setOnDarkBackground] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
            );

          if (visibleEntries.length > 0) {
            const theme = visibleEntries[0].target.getAttribute("data-theme");
            console.log("data-theme", theme);
            setOnDarkBackground(theme === "dark");
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-64px 0px 0px 0px",
        }
      );

      document
        .querySelectorAll("[data-theme]")
        .forEach((el) => observer.observe(el));

      // Clean up on unmount
      return () => observer.disconnect();
    }, 300); // wait ~300ms for DOM to paint

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <nav
      className={`navbar-container ${isScrolled ? "scrolled" : ""} ${
        onDarkBackground ? "on-dark" : ""
      }`}
    >
      <div className="left">
        <Link href="/" className="logo">
          Dcan<span>i</span>s
        </Link>
      </div>
      <div className="right">
        <Link href="/work" className="btn-underline">
          Work
        </Link>
        <Link href="/about" className="btn-underline">
          About
        </Link>
        <Link href="/contact" className="btn-underline">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
