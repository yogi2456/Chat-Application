import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

const Form = ({isSignInPage = true}) => {

    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ""
        }),
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('data >>', data)
      const res = await fetch(`http://localhost:8000/api/${isSignInPage ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(res.status === 400) {
        alert("Invalid credentials")
      } else {
        const resData = await res.json()
      console.log('data >>', resData)
      if(resData.token) {
        localStorage.setItem('user:token', resData.token)
        localStorage.setItem('user:detail', JSON.stringify(resData.user))
        navigate('/')
      }
      }
    }

  return (
    <div className="bg-light h-screen flex items-center justify-center">
    <div className="bg-white w-[300px] h-[400px] shadow-lg flex flex-col justify-center items-center">
      <div className="text-2xl font-semibold">
        Welcome {isSignInPage && "Back"}
      </div>
      <div className="text-l font-light mb-6">
        {isSignInPage ? "Sign in to get explored" : "Sign up to get started."}
      </div>
      <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
      {!isSignInPage && 
        <Input
          label="Full name"
          name="name"
          placeholder="Enter your full name"
          className="mb-2 w-[60%]"
          value={data.fullName}
          onChange={(e) => setData({ ...data, fullName: e.target.value})}
        />
      }
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="mb-2 w-[60%]"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value})}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        className="mb-2 w-[60%]"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value})}
      />
      <Button label={isSignInPage ? "Sign In" : "Sign Up"} type="submit" />
      </form>
      <div className="text-xs mt-2">
        {isSignInPage ? "Didn't have an account?" : "Already have an account?"}
        <span onClick={() => navigate(`/users/${isSignInPage ? "Sign-up" : "Sign-in"}`)} className="text-primary underline text-xs">
          {isSignInPage ? "Sign up" : "Sign in"}
        </span>
      </div>
    </div>
    </div>
  );
};

export default Form;
