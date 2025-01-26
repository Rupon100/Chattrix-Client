import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { set, useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Joinus = () => {
  const navigate = useNavigate();

  const { signUser, googleSignin } = useAuth();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.email);
    signUser(data.email, data.password)
      .then((res) => {
        toast.success("Login Successfull!");
        reset();
        navigate("/");
      })
      .catch((err) => {
        setLoginError("Invalid email or password. Please try again.");
      });
  };

  const handleGoogleLogin = () => {
    setLoginError("");
    googleSignin()
      .then(() => {
        toast.success("Login Successfull!");
        navigate("/");
      })
      .catch((err) => {
        setLoginError("Google Sign-In failed. Please try again.");
      });
  };

  return (
    <div className=" min-h-screen bg-gradient-to-r from-black to-sky-950 flex justify-center items-center">
      <div className="max-w-sm mx-auto p-10  text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Join Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* email */}
          <div className="form-control mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered text-black"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* password */}
          <div className="form-control mb-4">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered text-black"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="w-full mt-6">
            <button
              type={"submit"}
              className="w-full p-2 rounded-lg bg-sky-800 hover:bg-sky-900 text-white"
            >
              Login
            </button>
          </div>

          {loginError && (
            <p className="text-red-500 text-xs mt-3 text-center">
              {loginError}
            </p>
          )}

          <div className="divider h-[1px] bg-white"></div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center gap-2 border self-center p-2 rounded-lg hover:bg-gray-200 hover:text-black transition-all"
          >
            <FcGoogle /> <h3>Join With Google</h3>{" "}
          </button>
        </form>

        <h3 className="text-center my-4 text-sm">
          New to here?{" "}
          <Link to={`/register`} className="font-semibold ">
            Register.
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Joinus;
