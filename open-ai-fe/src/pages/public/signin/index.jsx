import { Button, Card, CardContent, Grid } from "@mui/material";
import React from "react";

import { msalInstance } from "../../../main";
import { loginRequest } from "../../../msalConfig";
import msoft from "../../../assets/images/msft.webp";
import "./style.scss";

const SignIn = () => {
    const handleSignIn = async () => {
        try {
            const response = await msalInstance.loginPopup(loginRequest);
            console.log("response: ", response);
        } catch (err) {
            console.log("sign in err: ", err);
        }
    };

    return (
        <section className="sign-in">
            <Button variant="contained" onClick={handleSignIn}>
                Sign in with Microsoft
            </Button>
        </section>
    );
};

export default SignIn;
