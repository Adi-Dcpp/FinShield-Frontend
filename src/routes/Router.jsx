import Dashboard from "../pages/Dashboard.jsx";
import FraudDetector from "../pages/FraudDetecter.jsx";
import History from "../pages/History.jsx";
import Simulator from "../pages/Simulator.jsx";
import RootLayout from "./RootLayout.jsx";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="fraud-detector" element={<FraudDetector />} />
            <Route path="history" element={<History />} />
            <Route path="simulator" element={<Simulator />} />
        </Route>
    )
) 