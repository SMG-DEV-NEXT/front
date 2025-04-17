"use client";

import dynamic from "next/dynamic";
import { useMobile } from "../../hooks/useMobile";
import Header from "./desktop";
import HeaderMobile from "./mobile";


export default function HeaderComponent() {
  const isMobile = useMobile(1000)
  const MobileComponent = dynamic(() => import('./mobile.jsx'), {
    ssr: false,  // Disable SSR for this component (optional)
  });
  if(isMobile){
    return <MobileComponent />
  }
  return <Header />
}
