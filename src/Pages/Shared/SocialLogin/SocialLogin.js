import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { setAuthToken } from '../../../api/auth';
// import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {handleGoogleLogin} = useContext(AuthContext);
    // const navigate = useNavigate();
    const handleGoogle = () =>{
        handleGoogleLogin()
        .then(result =>{
            const user = result.user;
           setAuthToken(user)
          })
        .catch(err=> console.error(err));
    }
    return (
        <div>
            <p className="text-center"><small>Social Login</small></p>
            <p className="text-center">
                <button onClick={handleGoogle} className="btn-ghost">Google</button>
            </p>
        </div>
    );
};

export default SocialLogin;