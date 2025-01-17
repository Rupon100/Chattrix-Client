import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateUserProfile, googleSignin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);

    const img = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, img, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const photoURL = res?.data?.data?.display_url;

      createUser(data?.email, data?.password).then((res) => {
        updateUserProfile(data?.username, photoURL).then(() => {
          reset();
          toast.success("Register successfull!");
          navigate("/");
        });
        console.log(res?.user);
      });
    }
  };

  const handleGoogleLogin = () => {
    googleSignin().then((res) => {
      toast.success("Register successfull!");
      navigate("/");
    });
  };

  return (
    <div className="bg-gradient-to-r from-black to-sky-950">
      <div className="max-w-sm mx-auto p-10 text-white  rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-black"
        >
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
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* choose an image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold">
              photoURL
            </label>
            <input
              id="image"
              type="file"
              className="file-input file-input-bordered text-sm w-full "
              accept="image/*"
              {...register("image", {
                required: "Please upload an image",
              })}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
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
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
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

          <div className="divider h-[1px] bg-white"></div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center gap-2 border self-center p-2 rounded-lg hover:bg-gray-200  hover:text-black text-white  transition-all"
          >
            <FcGoogle /> <h3>Join With Google</h3>{" "}
          </button>
        </form>

        <h3 className="text-center my-4 text-sm">
          Already have an Account?{" "}
          <Link to={`/login`} className="font-semibold ">
            Login.
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Register;
