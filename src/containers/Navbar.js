import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from "../images/warbler-logo.png";
import {logout} from "../store/actions/auth";

class Navbar extends Component{
    logout=(e)=>{
        e.preventDefault();
        this.props.logout();
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                           <img src={Logo} alt="Warbler Home"></img>
                        </Link>        
                    </div>
                    {this.props.currentUser.isAuthenticated?(
                      <ul className="nav justify-content-end">
                          <li className="nav-item">
                            <Link to={`api/user/${this.props.currentUser.user.id}/messages/new`}>New Messages</Link>
                          </li>
                          <li className="nav-item">
                             <a href="/" onClick={this.logout}>Log out</a>
                          </li>
                      </ul>
                    ):(
                        <ul className="nav justify-content-end">
                           <li className="nav-item active">
                              <Link to="signup">Signup</Link>
                           </li>
                           <li className="nav-item">
                              <Link to="signin">Signin</Link>
                           </li>
                       </ul> 
                    )
                }                                
                </div>
             </nav>
        )
    }
}

function mapStateToProps(state){
    return{
        currentUser:state.currentUser
    }
}

export default connect(mapStateToProps , {logout})(Navbar);