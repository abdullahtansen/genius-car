import React, { useContext } from "react";
import login from '../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
    const {loginUser} = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handleLogin = (e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email,password)
        .then((result) => {
            // Signed in 
            const user = result.user;
            const currentUser = {
              email: user.email
            }
            console.log(currentUser)
            // get jwt token
            fetch('https://genius-car-server-henna-nine.vercel.app/jwt',{
              method: 'POST',
              headers:{
                'content-type': 'application/json'
              },
              body: JSON.stringify(currentUser)
            })
           .then(res=> res.json())
           .then(data=> {
            console.log(data)
            // local storage is the easiest but not the best place to storage
            localStorage.setItem('token',data.token);
           })

            navigate(from, { replace: true });
          })
          .catch(err=> console.log(err));
        }
  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
         <img className="w-3/4" src={login} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
        <h1 className="text-5xl font-bold text-center">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                required
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                required
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <p className="text-center">New To Genius Car <Link to='/signup' className="text-orange-600 font-bold">Sign Up</Link></p>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
