import React, { Component } from 'react';
import './Signin.css'
// import '../../assets/mdb/css/style.css'
import Loader from '../../assets/loader'
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/res.png';
import { ConnectionStates } from 'mongoose';

class Signin extends Component{

  constructor(){
    super()
    this.state={
       email:'',
       password:'',
       isLoading:false,
       info:''
       
     }
  
      this.handleEmail = this.handleEmail.bind(this)
      this.handlePassword =this.handlePassword.bind(this)
          }
          
          handleSubmit=(e)=>{
            e.preventDefault()
            if(!this.state.email ||!this.state.password){
           this.setState({info:"put both your email and password"})
            }else{
            this.setState({isLoading:true})
            fetch("/login", { 
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                
                    email:this.state.email,
                    password:this.state.password
                })
 
            } )
            .then(res => res.json())
            .then(res =>{console.log(res.message +`token ${res.token}`)
              
                   
            this.setState({isLoading:false})
            this.setState({info:res.message})
            console.log(res)
         
              if(res.auth == true &&res.status==200){
                window.localStorage.setItem('userId', res.userId)
                window.localStorage.setItem('fname', res.fname)
                window.localStorage.setItem('lname', res.lname)


            window.localStorage.setItem('token', JSON.stringify(res.token)) 
          
                console.log(res.accessToken)
            
                this.props.history.push("/dashboard")
              }
              
            } )
            .catch(err => {console.log(err)
              this.setState({isLoading:false})
            })
 }
            //console.log(this.state)
 
          }
         
          handleEmail(e){
              this.setState({email:e.target.value})
          }
          handlePassword(e){
              this.setState({password:e.target.value})
          }
 
  


render(){
  
  if(this.state.isLoading){
        return(<Loader/>)
  }

  return(


<div>




{/* /login */}


{/* <!-- Material form login --> */}
<div className="card mt-5" id="signin">

<h3 className="card-header  dark-text text-center py-4">
  {/* <strong className="mdi mdi-account-key">Sign-in</strong> */}
   <a href="index.html" class="brand-link">
               <img src={Logo} alt=" Logo" width="200"/>
               </a>
</h3>

{/* <!--Card content--> */}
<div className="card-body px-lg-5 pt-0">

  {/* <!-- Form --> */}
  <div className="text-center" style={{color: '#757575'}}>

    {/* <!-- Email --> */}
    <div className="md-form mt-5">
      <input type="email" id="materialLoginFormEmail" className="form-control" value={this.state.email} onChange={this.handleEmail}/>
      <label htmlFor="materialLoginFormEmail" className="fa fa-envelope"> Email</label>
    </div>

    {/* <!-- Password --> */}
    <div className="md-form mt-5">
      <input type="password" id="materialLoginFormPassword" className="form-control" value={this.state.password} onChange={this.handlePassword}/>
      <label htmlFor="materialLoginFormPassword" className="fa fa-lock"> Password</label>
    </div>
    {this.state.info===''||this.state.info===undefined ?
  (<p className="alert alert-warning" style={{display:'none'}}>{this.state.info}</p>) : (<p className="alert alert-danger">{this.state.info}</p>)}

    {/* <!-- Sign in button --> */}
    <button id="loginbtn" className="btn btn-info btn-block" style={{color: 'rgb(235,235,235)'}}  onClick={this.handleSubmit}> 
 Login
</button>

    {/* <!-- Register --> */}
    <p>Not a member?
      <Link to="/signup"> Register</Link>
    </p>

    {/* <!-- Social login --> */}
    <p>or sign in with:</p>
    <a type="button" className="btn-floating btn-fb btn-sm">
      <i className="fa fa-facebook"></i>
    </a>
    <a type="button" className="btn-floating btn-tw btn-sm">
      <i className="fa fa-twitter"></i>
    </a>
    <a type="button" className="btn-floating btn-li btn-sm">
      <i className="fa fa-linkedin"></i>
    </a>
    <a type="button" className="btn-floating btn-git btn-sm">
      <i className="fa fa-github"></i>
    </a>

  </div>

   

  {/* <!-- Form --> */}

</div>

</div>
{/* <!-- Material form login --> */}



</div>



  )








}



}


export default Signin