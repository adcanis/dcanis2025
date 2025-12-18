import React from "react";
import Router from "next/router";
import NextLink, { LinkProps } from "next/link";
import { AppContext } from "../pages/_app";

const LenisLink = React.memo(
  (props: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const lenis = React.useContext(AppContext)?.lenis;

    return (
      <NextLink
        {...props}
        onClick={(e) => {
          if (
            (!props.target || props.target === "_self") &&
            props.scroll !== false
          ) {
            e.preventDefault();
            Router.push(props.href).then(() => {
              lenis?.scrollTo(0, {
                immediate: true,
              });
            });
          }
        }}
      />
    );
  }
);

LenisLink.displayName = "LenisLink";

export default LenisLink;
