"use client";
import React, { useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const Login = () => {
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const { data,status } = useSession();

  const submitHandler = async (e) => {
    e.preventDefault();
      await signIn("credentials", {
        redirect: false,
        phonenumber,
        password,
      })
  };
  useEffect(()=>{
    if(data?.session?.user?.role){
      if(data?.session?.user?.role=="internet")
        window.location.href=`${process.env.BASE_URL}/internet`
      else if(data?.session?.user?.role=="satelite"){
        window.location.href=`${process.env.BASE_URL}/satelite`
      }else if(data?.session?.user?.role=="client"){
        window.location.href=`${process.env.BASE_URL}/user/${data?.session?.user?.id}`
      }
    }
  },[data?.session?.user?.role])
  if(status=="loading"){
    return <h1>loading...</h1>
  }
  return (
    <div className="container container-fluid">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-10 col-lg-5 ">
          <form
            className="border border-secondary rounded p-4"
            onSubmit={submitHandler}
          >
            <h1 className="mb-4">Login</h1>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email_field">
                Phonenumber
              </label>
              <input
                type="username"
                id="phonenumber_field"
                className="form-control"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password_field">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
            >
              Sign in
            </button>

            {/* <div className="text-center">
              <p>
                Not a member? <Link href="/register">Register</Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
