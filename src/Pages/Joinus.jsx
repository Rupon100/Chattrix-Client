import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const Joinus = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = (data) => {
        console.log("Form Data: ", data);
      };
    

  return (
    <div className="max-w-sm mx-auto mt-10 p-5 " >
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
            className="input input-bordered"
            {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
            })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* password */}
        <div className="form-control mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered"
            {...register("password", { 
              required: "Password is required", 
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="w-full mt-6">
          <button type={"submit"} className="w-full p-2 rounded-lg bg-sky-800 hover:bg-sky-900 text-white">Login</button>
        </div>

        <div className="divider" ></div>

       <button className="flex items-center gap-2 border self-center p-2 rounded-lg hover:bg-gray-200 transition-all" ><FcGoogle /> <h3>Join With Google</h3> </button>

      </form>

      <h3 className="text-center my-4 text-sm" >New to here? <Link to={`/register`} className="font-semibold " >Register.</Link></h3>
    </div>
  );
};

export default Joinus;
