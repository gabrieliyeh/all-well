import Button from "@/components/button/Button";
import BgImage from "@/components/image/BgImage";
import fetchJson from "@/lib/api";
import classes from "@/styles/sign-up.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUpPage = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    const { userId, password } = userInfo;
    setLoading(true);
    e.preventDefault();
    const res = await fetchJson(
      "https://all-well-backend.onrender.com/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      }
    );
    if (res?.message === "Sign up successful") {
      setLoading(false);
      router.push("/confirm-sign-up");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>All Well | Sign up</title>
      </Head>
      <div className={classes.main}>
        <BgImage />
        <div className={classes.right}>
          <h1 className={classes.heading}>Sign-up to your test app.</h1>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.box}>
              <h2 className={classes.subTitle}>
                Choose a user-id and a password
              </h2>
              <div className={classes.formControl}>
                <input
                  type="email"
                  name="userId"
                  placeholder="Choose a user ID"
                  value={userInfo.userId}
                  onChange={handleOnchange}
                  required
                />
              </div>
              <div className={classes.formControl}>
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  placeholder="Choose a password"
                  value={userInfo.password}
                  onChange={handleOnchange}
                  required
                />{" "}
                {!showPassword ? (
                  <div className={classes.icon} onClick={handleShowPassword}>
                    <img src="/static\visibility_on.svg" alt="eye icon" />
                  </div>
                ) : (
                  <div className={classes.icon} onClick={handleShowPassword}>
                    <img src="/static\visibility_off.svg" alt="eye icon" />
                  </div>
                )}
              </div>
              <Button onClick={handleSubmit} disabled={loading ? true : false}>
                {loading ? "Signing you up" : " Sign-up!"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
