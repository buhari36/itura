import "./home.css";
import Logo from "../assets/Logo.svg";
import Rectangle from "../assets/Rectangle.png";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet";

const Home = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [mail, setMail] = useState("");
  const Mails = () => {
    setMail(!mail);
  };
  useEffect(() => {
    if (mail && enteredNameIsValid && enteredEmailIsValid) {
      formIsValid = true;
      alert("Mail Sent");
    }
  }, [mail]);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    if (!enteredEmailIsValid) {
      return;
    }

    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);

    emailjs
      .sendForm(
        "service_mi18pyn",
        "template_4jc7xrk",
        form.current,
        "n4oZWccTxD4eiyYH7"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const enteredNameIsValid = enteredName.trim() !== "";
  const enteredEmailIsValid = enteredEmail.includes("@");

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  if (enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  // const formSubmissionHandler = (event) => {

  // };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <div className="container container-home">
      <Helmet>
        <meta
          name="description"
          content="Get Early Access to IturaRx. Be one of the first to use the IturaRX Pharmacy software when we
    launch"
        />
        <meta name="keywords" content="iturarx" />
      </Helmet>
      <div className="home">
        <div className="left">
          <div className="image">
            <img src={Logo} alt="IturaRx logo" />
            <button className="bon">Coming Soon!</button>
          </div>
          <div className="write">
            <h1>Get Early Access!</h1>
            <p>
              Be one of the first to use the IturaRX Pharmacy software when we
              launch
            </p>
          </div>
          <form ref={form} onSubmit={sendEmail}>
            <div className="inputs ">
              <div className={nameInputClasses}>
                <input
                  type="text"
                  placeholder="Pharmacy name"
                  name="name"
                  required
                  value={enteredName}
                  onChange={nameInputChangeHandler}
                  onBlur={nameInputBlurHandler}
                />
                {nameInputIsInvalid && (
                  <p className="error-text">Name must not be empty.</p>
                )}
              </div>
              <div className={emailInputClasses}>
                <input
                  type="email"
                  placeholder="Pharmacy Email"
                  name="email"
                  required
                  value={enteredEmail}
                  onChange={emailInputChangeHandler}
                  onBlur={emailInputBlurHandler}
                />
                {emailInputIsInvalid && (
                  <p className="error-text">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
            </div>
            <div className="btn">
              <button disabled={!formIsValid} onClick={Mails}>
                Join the Waitlist
              </button>
            </div>
          </form>
        </div>
        <div className="right">
          <img src={Rectangle} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
