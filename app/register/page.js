"use client";

import axios from "axios";
import React, { useState } from "react";
// import {db} from "../../Firebase";
// import { collection,query,where,addDoc,getDocs } from 'firebase/firestore';

const Register = () => {
  // const [phonenumber, setPhonenumber] = useState("");
  // const [password, setPassword] = useState("");
  // const usersRef = collection(db,"users");
 
 
  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const usersQuery = query(usersRef,where("phonenumber","==",phonenumber),where("password","==",password));
  //     const querySnapshot = await getDocs(usersQuery);
  //     if (querySnapshot.empty) {
  //       await addDoc(collection(db,'users'),{ phonenumber: phonenumber , password: password});
  //       return;
  //     }
     
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container container-fluid">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-10 col-lg-5 ">
          Visit us to create an account
          {/* <form
            className="border border-secondary rounded p-4"
            onSubmit={submitHandler}
          >
            <h1 className="mb-4">Register</h1>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="name_field">
                Phonenumber
              </label>
              <input
                type="text"
                id="phone_field"
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
              Register
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
