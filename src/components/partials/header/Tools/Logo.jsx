import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import vivsLogo from "@/assets/images/logo/logo1.png";
import vivsLogoWhite from "@/assets/images/logo/logo1.png";

const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {width >= breakpoints.xl ? (
          // <img src={isDark ? LogoWhite : vivsLogo} alt="" />
          <p className={isDark ? `text-body fw-bolder` : `text-body fw-bolder`}>VIVS</p>
        ) : (
          // <img src={isDark ? MobileLogoW fw-bolderhite : vivsLogo} alt="" />
          <p className={isDark ? `text-body fw-bolder` : `text-body fw-bolder`}>VIVS</p>
        )}
      </Link>
    </div>
  );
};

export default Logo;
