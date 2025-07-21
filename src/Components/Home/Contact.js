import axios from "axios";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";


function Contact() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [stateForContact, setStateForContact] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [req_sub_succ, set_req_sub_succ] = useState(false);
  const [refAbout, inViewAbout] = useInView({
    threshold: 0.2, // Trigger animation when 20% of the element is in view
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setSpinner(true);
    setStateForContact(data);
    try {
      const response = await emailjs.send(
        "service_a1pn4gz",
        "template_41ewwsp",
        {
          client_name: data.first_name + " " + data.last_name,
          client_email: data.email,
          my_email: "ak1489007@gmail.com",
          client_message:
            data.description + " The client phone number is: " + data.phone,
        },
        "nkJK3YR4Hd29amgBX"
      );
      set_req_sub_succ(true);
      reset();
      setSpinner(false);
    } catch (error) {
      console.log("FAILED...", error);
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (req_sub_succ) {
      const timerId = setTimeout(() => {
        set_req_sub_succ(false);
      }, 6000);
      return () => clearTimeout(timerId);
    }
  }, [req_sub_succ]);
  // SENDING EMAIL FROM BACKEND
  useEffect(() => {
    if (stateForContact) {
      axios
        .post("portfolio/contact-me/", stateForContact)
        .then((res) => {
          set_req_sub_succ(true);
          setStateForContact(false);
        })
        .catch((err) => {
          console.log(err);
          setStateForContact(false);
        });
    }
  }, [stateForContact]);

  return (
    <div className="snapshots">
      <motion.h1
        className=""
        ref={refAbout}
        initial={{ y: -30, opacity: 0.2 }}
        animate={{
          y: inViewAbout ? 0 : -30,
          opacity: inViewAbout ? 1 : 0.2,
        }}
        transition={{ duration: 1.5 }}
      >
        CONTACT ME
      </motion.h1>
      <motion.h3
        ref={refAbout}
        initial={{ y: -30, opacity: 0.2 }}
        animate={{
          y: inViewAbout ? 0 : -30,
          opacity: inViewAbout ? 1 : 0.2,
        }}
        transition={{ duration: 1.5 }}
      >
        Please don't hesitate to reach out to me.
      </motion.h3>
      <br />
  <h2 style={{ margin: "10px auto 10px 5%", width: "fit-content", color: "#505050" }}>
  Send me a message!
</h2>
<div style={{ margin: "10px auto 10px 5%", width: "50%", color: "#505050", height: 'fit-content', textAlign: "Left"
 }}>
I'm open and ready to dive into exciting new projects, so don't hesitate to drop me a message with any ideas or queries you'd like to discuss. My virtual door is always open, 24/7, so feel free to reach out anytime! Let's get the conversation started. </div>
<div style={{ 
  margin: "20px 5%", 
  display: "flex", 
  flexDirection: "column", 
  gap: "5px",
  alignItems: "flex-start",
  fontSize: "16px"
}}>
  <a 
    href="mailto:ak1489007@gmail.com" 
    style={{
      color: "#0077cc",
      textDecoration: "none",
      fontWeight: "500"
    }}
    target="_blank" 
    rel="noopener noreferrer"
  >
    <MdEmail style={{fontSize: "30px", marginRight: '10px'}} />  <span style={{position: 'absolute', marginTop: "7px", textDecoration: 'underline',  textUnderlineOffset: "4px" ,   textDecorationThickness: "2px"
 }}> <span style={{color: " 	#505050"}} className="contact-links-mail"
>ak1489007@gmail.com</span></span>

  </a>
  <a 
    href="https://wa.me/923334483486" 
    style={{
      color: "#25D366",
      textDecoration: "none",
      fontWeight: "500"
    }}
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaWhatsapp style={{fontSize: "30px", marginRight: '10px'}} />  <span style={{position: 'absolute', marginTop: "7px", textDecoration: 'underline',  textUnderlineOffset: "4px" ,   textDecorationThickness: "2px" }}> <span style={{color: " 	#505050", }} className="contact-links-whatsapp"
    >+966 50 746 0747</span></span>
  </a>
</div>
<br/>
<br/>
<div className="my-location">
        <h3 style={{ margin: "10px auto 10px 5%", width: "fit-content" }}>
          My Location
        </h3>
        <div className="location">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211750.24074081753!2d71.40065772665172!3d33.977183193773136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b90f0e79cf%3A0xa816b2637558a412!2sPeshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710052931467!5m2!1sen!2s"
            width="90%"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe> */}
{/* THIS IS JUBAIL MAP UPDATED FROM PAKISTAN, iSLAMABAD TO JUBAIL, SAUDI ARABIA */}
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28436.6021848955!2d49.65084393059342!3d27.0119821857721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1752597213459!5m2!1sen!2s" width="90%" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <br />
      <br />
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="first_last_name">
          <div>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name", {
                required: "First name must be at least 4 characters",
              })}
            />
            {errors.first_name && (
              <div className="error">{errors.first_name.message}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name", {
                required: "Last name must be at least 4 characters",
              })}
            />
            {errors.last_name && (
              <div className="error">{errors.last_name.message}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{11,14}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phone && (
              <div className="error">{errors.phone.message}</div>
            )}
          </div>
        </div>
        <textarea
          placeholder="Write about problem or query!"
          {...register("description", {
            required: "Description must be at least 35 characters",
            minLength: {
              value: 35,
              message: "Description must be at least 35 characters",
            },
          })}
        />
        {errors.description && (
          <div
            style={{ margin: "10px auto", width: "fit-content" }}
            className="error"
          >
            {errors.description.message}
          </div>
        )}
        <div className="first_last_name" style={{ justifyContent: "center" }}>
          <button type="submit">
            {spinner ? <Loading data={"one"} /> : "CONTACT ME!"}
          </button>
        </div>
        {req_sub_succ && (
          <p className="form_sub_succ">
            You have Contacted Ajmal Khan successfully
          </p>
        )}
      </form> */}
    </div>
  );
}

export default Contact;
