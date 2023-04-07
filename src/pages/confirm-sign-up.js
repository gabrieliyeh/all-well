import Button from "@/components/button/Button";
import BgImage from "@/components/image/BgImage";
import classes from "@/styles/confirm-sign-up.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

const ConfirmSignUpPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <Head>
        <title>All Well | Confirm Sign up</title>
      </Head>
      <div className={classes.main}>
        <BgImage />
        <div className={classes.right}>
          <div className={classes.box}>
            <p>Congrats! you have successfully signed-up!</p>
          </div>
          <div className={classes.btnWrapper}>
            <Button onClick={handleClick}>
              Click here to log-in into your app!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmSignUpPage;
