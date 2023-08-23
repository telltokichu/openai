import Container from "@mui/material/Container";
import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/protected/home";
import SignIn from "./pages/public/signin";
import AppHeader from "./components/header";

import "../src/assets/common_styles/appStyle.scss";

function App() {
    const isAuthenticated = useIsAuthenticated();

    const renderContent = () => {
        if (isAuthenticated) {
            return (
                <Container>
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Container>
            );
        }

        return (
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    };

    return <Container>{renderContent()}</Container>;
}

export default App;
