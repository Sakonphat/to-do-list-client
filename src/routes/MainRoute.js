import React from 'react';
import {
    Redirect,
    Route,
} from 'react-router-dom';
import MainLayout from "../layouts/MainLayout"
import {useSelector} from "react-redux";

function MainRoute({ component: Component, ...rest }) {

    const { isPrivate } = { ...rest };

    const { isLoggedIn } = useSelector(state => state.auths);

    return (
        <Route {...rest} render={props =>{

            if (isPrivate) {

                if(isLoggedIn){
                    return (
                        <MainLayout>
                            <Component {...props} />
                        </MainLayout>
                    )
                }
                else{
                    return <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                }
            }
            else {
                if(isLoggedIn){
                    return <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location },
                        }}
                    />
                }
                else {
                    return (
                        <MainLayout>
                            <Component {...props} />
                        </MainLayout>
                    );
                }
            }

        }}/>
    );
}

export default MainRoute;