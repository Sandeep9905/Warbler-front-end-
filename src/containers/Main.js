import React from 'react';
import {Switch ,Route , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/error';
import MessageForm from '../containers/MessageForm';
import withAuth from '../hocs/withAuth';

const Main = props=>{
    const {authUser ,errors ,removeError ,currentUser} = props;
    return(
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/>} />
                <Route exact path="/signup" render={
                    props=>{
                        return(
                            <AuthForm removeError={removeError} errors={errors} onAuth={authUser} signup {...props} heading="Join warbler Today!" buttonText="Sign me up" />
                        )
                    }
                } />
                <Route exact path="/signin" render={
                    props=>{
                        return(
                            <AuthForm removeError={removeError} errors={errors} onAuth={authUser} {...props} heading="Welocme Back" buttonText="Log in" />
                        )
                    }
                } />
                <Route path="/api/user/:id/messages/new" component = {withAuth(MessageForm)}/>
            </Switch>
        </div>
    )
}

function mapStateToProps(state){
    return{
      currentUser:state.currentUser,
      errors:state.error
    }
}

export default withRouter(connect(mapStateToProps , {authUser ,removeError})(Main));