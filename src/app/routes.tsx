import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./pages/Dashboard";
import { CropIntelligence } from "./pages/CropIntelligence";
import { Advisory } from "./pages/Advisory";
import { MarketTrends } from "./pages/MarketTrends";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "crops", Component: CropIntelligence },
      { path: "advisory", Component: Advisory },
      { path: "market", Component: MarketTrends },
      { path: "settings", Component: Settings },
    ],
  },
]);
