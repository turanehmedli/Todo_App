import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { NavLink } from "react-router";
import { useAuthStore } from "../stores/authStore";

const Register = () => {

  const {setAccessToken, setRefreshToken} = useAuthStore()

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          value,
        );
        const {accessToken, refreshToken} = res.data
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)

        window.location.href="/"
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[\p{L}\s'-]+$/u;

  const errorFirstName = (value: string) => {
    if (!value.trim()) return "FirstName is Required";
    if (!nameRegex.test(value))
      return "Only letters, spaces and hypens allowed";
  };

  const errorLastName = (value: string) => {
    if (!value.trim()) return "LastName is Required";
    if (!nameRegex.test(value))
      return "Only letters, spaces and hypens allowed";
  };

  const errorEmail = (value: string) => {
    if (!value.trim()) return "Email is Required";
    if (!emailRegex.test(value)) return "Invalid email format";
  };

  const errorPassword = (value: string) => {
    if (value.trim().length < 8)
      return "Password must be at least 8 characters";
  };
  return (
    <div className="w-full h-full flex justify-center items-center ">
        <div className="w-full h-screen bg-red-300 hidden md:flex"></div>
      <form onSubmit={(e)=>{
        e.preventDefault()
        form.handleSubmit();
      }} className="flex flex-col items-center justify-center p-5 w-full h-screen">
        <h2 className="font-bold text-4xl text-center">Register</h2>

        <div className="w-full flex flex-col gap-5 p-5 ">
            <form.Field
            name="firstName"
            validators={{onBlur:({value})=> errorFirstName(value)}}
        >
            {(field)=>(
                <div>
                    <input
                    className="border px-5 py-3 w-full rounded-lg outline-blue-500 text-lg" 
                    placeholder="Enter Your First Name"
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="text" />
                    {field.state.meta.isTouched && field.state.meta.errors?.[0] && (
                        <p className="text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                </div>
            )}
        </form.Field>

        <form.Field
            name="lastName"
            validators={{onBlur:({value})=> errorLastName(value)}}
        >
            {(field)=>(
                <div>
                    <input 
                    className="border px-5 py-3 w-full rounded-lg outline-blue-500 text-lg"
                    placeholder="Enter Your Last Name"
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="text" />
                    {field.state.meta.isTouched && field.state.meta.errors?.[0] && (
                        <p className="text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                </div>
            )}
        </form.Field>

        <form.Field
            name="email"
            validators={{onBlur:({value})=> errorEmail(value)}}
        >
            {(field)=>(
                <div>
                    <input 
                    className="border px-5 py-3 w-full rounded-lg outline-blue-500 text-lg"
                    placeholder="Enter Your Email"
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="text" />
                    {field.state.meta.isTouched && field.state.meta.errors?.[0] && (
                        <p className="text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                </div>
            )}
        </form.Field>

        <form.Field
            name="password"
            validators={{onBlur:({value})=> errorPassword(value)}}
        >
            {(field)=>(
                <div>
                    <input 
                    className="border px-5 py-3 w-full rounded-lg outline-blue-500 text-lg"
                    placeholder="Enter Your Password"
                    value={field.state.value}
                    onChange={(e)=>field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="text" />
                    {field.state.meta.isTouched && field.state.meta.errors?.[0] && (
                        <p className="text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                </div>
            )}
        </form.Field>

        <NavLink className={'text-lg text-center text-zinc-400'} to={'/login'}>do you have an account?</NavLink>

        <button className="border py-3 rounded-lg bg-sky-600 text-white text-xl font-semibold " type="submit" >Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
