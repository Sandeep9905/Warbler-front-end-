import React,{Component} from 'react';

class AuthForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            username:'',
            profileImageUrl:''
        }
    }
    handleChange = e =>{
        this.setState({
            [e.target.name]:e.target.value 
        });
    }
    handleSubmit = e =>{
        e.preventDefault()
        const authType = this.props.signup?"signup":"signin";
        this.props.onAuth(authType , this.state).then(()=>{
            this.props.history.push("/");
        }).catch(()=>{
            return;
        });
    }

    render(){
        const {email , username , profileImageUrl} = this.state;
        const {heading , buttonText ,signup ,errors ,removeError ,history} = this.props;

        history.listen(()=>{
            removeError();
        });
        return(
          <div className="row justify-content-md-center text-center">
              <div className="col-md-6">
                  <form onSubmit={this.handleSubmit}>
    {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                     <h2>{heading}</h2>
                     <label htmlFor="email">Email:</label>
                     <input className="form-control" 
                            id="email"
                            type="text" 
                            name="email" 
                            value={email}
                            onChange={this.handleChange}  />
                     <label htmlFor="password">Password:</label>
                     <input className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            onChange={this.handleChange} />    
                    {signup && (
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input className="form-control"
                                   id="username"
                                   type="text"
                                   name="username"
                                   value={username}
                                   onChange={this.handleChange}
                                    />
                            <label htmlFor="image-url">Image url:</label>
                            <input className="form-control"
                                   id="image-url"
                                   type="text"
                                   name="profileImageUrl"
                                   value={profileImageUrl}
                                   onChange={this.handleChange}
                                    />        
                        </div>
                    )}    
                    <button className="btn btn-primary btn-block btn-lg">
                        {buttonText}
                    </button>       
                  </form>
              </div>
          </div>
        )
    }
}
export default AuthForm;