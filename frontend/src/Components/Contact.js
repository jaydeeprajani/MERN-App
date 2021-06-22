import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
  });
  const { firstName, lastName, email, company, phone } = formData;

  const onChange = (e) => {
    // Sperad Operator ...formData
    setFormData({...formData,[e.target.name]: e.target.value});
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const newContact = {
        firstName:firstName,
        lastName:lastName,
        email:email,
        company:company,
        phone:phone
    }; 

    const config = {
        headers:{
            "Content-Type": "applocation/json",
        },
    };

    try
    {
        const body = JSON.stringify(newContact);
        console.log(body);
        await axios.post("/contact",body,config);
        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            company:"",
            phone:""
        });
        window.location.reload();
    }
    catch(err)
    {
        console.log("error",err.response.data);
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Enter your first name"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => onChange(e)}
        ></input>
        <br/>
        <input
          type="text"
          placeholder="Enter your last name"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => onChange(e)}
        ></input>
        <br/>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          required
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <br/>
        <input
          type="text"
          placeholder="Enter your company name"
          name="company"
          required
          value={company}
          onChange={(e) => onChange(e)}
        ></input>
        <br/>
        <input
          type="tel"
          placeholder="Enter your phone no."
          name="phone"
          required
          value={phone}
          onChange={(e) => onChange(e)}
        ></input>
        <button type="submit">Add new Contact</button>
      </form>
    </>
  );
};

export default Contact;
