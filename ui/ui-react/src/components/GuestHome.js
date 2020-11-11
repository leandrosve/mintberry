import React from 'react';
import LoginForm from "./user/LoginForm";
import { Container } from "bloomer/lib/layout/Container";
import SignupForm from "./user/SignupForm";
import { Card } from "bloomer/lib/components/Card/Card";
import { useSelector } from 'react-redux';
import { selectModalContentType, selectModalIsOpen } from '../redux/reducers';
 
const GuestHome = () => {
    const isLoginModalOpen = useSelector(state=>selectModalContentType(state) === "LoginForm" && selectModalIsOpen(state))
    const isSignupModalOpen = useSelector(state=>selectModalContentType(state) === "SignupForm" && selectModalIsOpen(state))
    return (
        <Container>   
          <div className="tile is-ancestor">
            <div className="tile is-horizontal ">
              <div className="tile  is-vertical">
                <Card className="p-5 m-5">
                  <LoginForm showSignupSuccess={false} showNotifications={!isLoginModalOpen}/>
                </Card>
              </div>
              <div className="tile is-vertical ">
                <Card className="p-5 m-5">
                  {" "}
                  <SignupForm showNotifications={!isSignupModalOpen}/>
                </Card>
              </div>
            </div>
          </div>
          </Container>
    );
}
 
GuestHome.propTypes = {};
 
export default GuestHome;