import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Register = () => {

  const { createUser, updateUserProfile, googleSignin } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);

    createUser(data?.email, data?.password)
    .then(res => {
      updateUserProfile(data?.username, '')
      .then(() => {
        reset();
      })
      console.log(res?.user)
    })
  };


  const handleGoogleLogin = () => {
    googleSignin();
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-5 bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" >
        {/* usernaem */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* submit  */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-2  bg-sky-800 hover:bg-sky-900 text-white rounded-md"
          >
            Register
          </button>
        </div>

        <div className="divider"></div>

        <button onClick={handleGoogleLogin} type="button" className="flex items-center gap-2 border self-center p-2 rounded-lg hover:bg-gray-200 transition-all">
          <FcGoogle /> <h3>Join With Google</h3>{" "}
        </button>
      </form>

      <h3 className="text-center my-4 text-sm">
        Already have an Account?{" "}
        <Link to={`/joinus`} className="font-semibold ">
          Login.
        </Link>
      </h3>
    </div>
  );
};

export default Register;
