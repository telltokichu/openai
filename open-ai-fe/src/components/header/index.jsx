import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginRequest } from "../../msalConfig";
import { AppBar, Button, Toolbar } from "@mui/material";

const AppHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { instance, accounts } = useMsal();

    const { userInfo } = useSelector(({ userInfo }) => ({
        userInfo,
    }));

    useEffect(() => {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                console.log("response: ", response);
                // dispatch(setUserInfo(response));
            })
            .catch((err) => console.log(err, "error"));
    }, []);

    const handleSignOut = async () => {
        const logoutRequest = {
            account: instance.getAccountByHomeId(accounts[0].homeAccountId),
            postLogoutRedirectUri: window.location.origin,
        };
        await instance.logoutRedirect(logoutRequest);
    };
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" onClick={handleSignOut}>
                    Sign out
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
