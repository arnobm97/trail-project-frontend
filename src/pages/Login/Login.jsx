import { useEffect, useState, useContext } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProviders";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // In Login.jsx, update the handleLogin function
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;

        // Store user session
        localStorage.setItem(
          "user-session",
          JSON.stringify({
            email: user.email,
            name: user.displayName || email.split("@")[0],
            isAdmin: false,
            avatar:
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${user.email}&background=random`,
          })
        );

        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // Redirect to the page user was trying to access, or to dashboard
        const redirectTo = location.state?.from || "/user/dashboard";
        navigate(redirectTo, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error);
        Swal.fire({
          title: "Login Failed",
          text: error.message || "Invalid email or password",
          icon: "error",
        });
      });
  };
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen bg-gradient-to-br from-green-400 to-blue-600 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6"></p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl bg-gradient-to-br from-green-350 to-blue-200">
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <LoadCanvasTemplate />
              <input
                onBlur={handleValidateCaptcha}
                type="text"
                name="captcha"
                className="input"
                placeholder="type the captcha above"
              />

              <input
                disabled={disabled}
                className="btn btn-neutral mt-2 bg-[#1A77F2] text-white border-[#005fd8]"
                type="submit"
                value="Login"
              />
            </fieldset>
          </form>
          <p className="px-6">
            <small>
              New Here?<Link to="/signup">Create an Account</Link>
            </small>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
