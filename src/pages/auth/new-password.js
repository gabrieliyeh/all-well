import Button from "@/components/button/Button";
import BgImage from "@/components/image/BgImage";
import { useState } from "react";
import classes from "@/styles/new-password.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import fetchJson from "@/lib/api";

const NewPasswordPage = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    confirmPassword: "",
  });
  const [focus, setFocus]= useState(false) 
  const [loading, setLoading]= useState(false) 
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if(passwordInfo.confirmPassword ===  ''){
      setFocus(false)
    } else{
      setFocus(true)
    }
  };

  const handleShowPassword = (index) => {
    if (index === 1) {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmNewPassword(!showConfirmNewPassword);
    }
  };

  const handleNewPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { password, confirmPassword } = passwordInfo;
    const res = await fetchJson(
      `https://all-well-backend.onrender.com/auth/new-password?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
      }
    );

    if (res) {
      setLoading(false)
      router.push("/confirm-password-change");
    }
    setLoading(false)
  };
 
  return (
    <>
      <Head>
        <title>All Well | New password</title>
      </Head>
      <div className={classes.main}>
        <BgImage />
        <div className={classes.right}>
          <h1 className={classes.heading}>Create new password.</h1>
          <div className={classes.box}>
            <h2> Create here a new password:</h2>
            <form onSubmit={handleNewPassword} >
              <div className={classes.formControl}>
                <input
                  type={!showNewPassword ? "password" : "text"}
                  name="password"
                  placeholder="Insert new password"
                  value={passwordInfo.newPassword}
                  onChange={handleOnChange}
                  required
                />{" "}
                {!showNewPassword ? (
                  <div
                    className={classes.icon}
                    onClick={() => handleShowPassword(1)}
                  >
                    <img src="/static/visibility_on.svg" alt="eye icon" />
                  </div>
                ) : (
                  <div
                    className={classes.icon}
                    onClick={() => handleShowPassword(1)}
                  >
                    <img src="/static/visibility_off.svg" alt="eye icon" />
                  </div>
                )}
              </div>
              <div className={classes.formControl}>
                <input
                  type={!showConfirmNewPassword ? "password" : "text"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwordInfo.confirmNewPassword}
                  onChange={handleOnChange}
                  pattern={passwordInfo.password}
                  focus={focus.toString()}
                  required  
                />
                <small className={classes.error}>Password do not match</small>
                {!showConfirmNewPassword ? (
                  <div
                    className={classes.icon}
                    onClick={() => handleShowPassword(2)}
                  >
                    <img src="/static\visibility_on.svg" alt="eye icon" />
                  </div>
                ) : (
                  <div
                    className={classes.icon}
                    onClick={() => handleShowPassword(2)}
                  >
                    <img src="/static\visibility_off.svg" alt="eye icon" />
                  </div>
                )}
              </div>
              <Button disabled={loading ? true : false}>
                {loading  ? 'Changing password...' : 'Create new password'}
                </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPasswordPage;
