import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
// import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import backgroundImage from '../assets/signup.jpg';

const schema = z.object({
    
  email: z.string().email(),
  password: z.string().min(8),
  })

 export type SignInFormData = z.infer<typeof schema>;

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      toast.success("Sign in Successful!");
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      toast.error( error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex min-h-screen overflow-auto justify-center items-center" style={{ backgroundImage: 'linear-gradient(115deg, #9F7AEA, #FEE2FE)' }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <div>
              <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" className="text-purple-500 font-semibold">Learn more</a></p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2  className="text-3xl mb-4">Login</h2>
            <p className="mb-4">
              Create your account. It’s free and only take a minute
            </p>
            <form action="#" onSubmit={onSubmit}>
              
              
              <div className="mt-5">
                <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full"
                {...register("email")}
                ></input>
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="mt-5">
                <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full"
                {...register("password")}
                ></input>
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>
              <div className="mt-5">
                <button className="w-full bg-purple-500 py-3 text-center text-white">Login</button>
              </div>
              <div className="mt-5">
                <span>
                  Already have a account?<Link to={"/register"} className="text-purple-500 font-semibold"> Register</Link>
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
