import { useState } from "react";
import classes from "@/styles/login.module.css";
import cls from "classnames";
import Link from "next/link";
import Button from "@/components/button/Button";
import BgImage from "@/components/image/BgImage";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await signIn("credentials", {
      userId: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (user.ok) {
      setLoading(false);
      toast.success("Successfully logged in");
      router.push("/");
    } else {
      setLoading(false);
      toast.error(user.error);
    }
  };

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
  return (
    <>
      <Head>
        <title>All Well | Login</title>
      </Head>
      <div className={cls("", classes.main)}>
        <div className={classes.imgWrapper}>
          <BgImage />
        </div>
        <div className={classes.right}>
          <h1 className={classes.heading}>Access your test app.</h1>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.box}>
              <h2 className={classes.subTitle}>Insert your credentials</h2>
              <div className={classes.formControl}>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Choose a user ID"
                  value={userInfo.email}
                  onChange={handleOnchange}
                />
              </div>
              <div className={classes.formControl}>
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  required
                  placeholder="Choose a password"
                  value={userInfo.password}
                  onChange={handleOnchange}
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
              <p>
                <span>have you forgotten your password? click</span>{" "}
                <Link href="/reset-password"> here</Link>
              </p>
              <Button  disabled={loading ? true : false}>
                {loading ? "Logging you in" : "Log in  "}
              </Button>
            </div>

            <p>
              <span> You don’t have a profile yet? sign up </span>
              <Link href="/auth/sign-up">here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
