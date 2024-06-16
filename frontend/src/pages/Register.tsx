import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { z  } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import backgroundImage from '../assets/register.webp';


const schema = z.object({
  firstName: z.string().min(1, "Username is required").max(100),
  lastName: z.string().min(1, "Username is required").max(100),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword:z.string().min(8)
  }).refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
});

export type RegisterFormData = z.infer<typeof schema>;

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      toast.success( "Registration Success!");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
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
            <h2  className="text-3xl mb-4">Register</h2>
            <p className="mb-4">
              Create your account. It’s free and only take a minute
            </p>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <div >
                  <input type="text" placeholder="Firstname" className="border border-gray-400 py-1 px-2 w-full"
                  {...register("firstName")}
                  ></input>
                  {errors.firstName && (
                    <span className="text-red-500">{errors.firstName.message}</span>
                  )}
                </div>
                <div >
                  <input type="text" placeholder="Surname" className="border border-gray-400 py-1 px-2 w-full"
                  {...register("lastName")}
                  ></input>
                  {errors.lastName && (
                    <span className="text-red-500">{errors.lastName.message}</span>
                  )}
                </div>
                
              </div>
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
                <input type="password" placeholder="Confirm Password" className="border border-gray-400 py-1 px-2 w-full"
                {...register("confirmPassword")}
                ></input>
                {errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
              </div>
              
              <div className="mt-5">
                <button className="w-full bg-purple-500 py-3 text-center text-white">Register Now</button>
              </div>
              <div className="mt-5">
                <span>
                  Already have a account?<Link to={"/sign-in"} className="text-purple-500 font-semibold"> Sign In</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
