import "./sidebar.scss";
import { useMediaQuery } from "@mui/material";
import MobileBar from "./MobileBar";
import Sidebar from "./Sidebar";

const ResponsiveNavigation = () => {
  const isTabletOrBigger = useMediaQuery("(min-width: 768px)");

  return <>{isTabletOrBigger ? <Sidebar /> : <MobileBar />}</>;
};

export default ResponsiveNavigation;
