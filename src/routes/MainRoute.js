import React from 'react';
import {
    Redirect, Route
} from 'react-router-dom';
import MainLayout from "../layouts/MainLayout"
import {useSelector} from "react-redux";

function MainRoute({ component: Component, ...rest }) {

    const { isLoggedIn } = useSelector(state => state.auths);

    return (
        <Route {...rest} render={props =>{

            if(isLoggedIn){
                return (
                    <MainLayout>
                        <Component {...props} />
                    </MainLayout>
                )
            }
            else{

                if(props.match.path === "/login" || props.match.path === "/register"){
                    return (
                        <MainLayout>
                            <Component {...props} />
                        </MainLayout>
                    );
                }

                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location },
                    }}
                />
            }

        }}/>
    );
}
export default MainRoute;