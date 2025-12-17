import React from "react";

export const useThemeOnScroll = (
  theme: "dark" | "light" | "yellow" | "grey",
  enabled: boolean
) => {
  React.useEffect(() => {
    if (!enabled) return;

    const prev = document.body.getAttribute("data-theme");

    document.body.setAttribute("data-theme", theme);

    return () => {
      if (prev) document.body.setAttribute("data-theme", prev);
      else document.body.removeAttribute("data-theme");
    };
  }, [theme, enabled]);
};
