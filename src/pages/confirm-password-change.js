import Button from "@/components/button/Button";
import { useRouter } from "next/router";
import classes from "@/styles/confirm-password.module.css";
import BgImage from "@/components/image/BgImage";
import Head from "next/head";

const PasswordChangedSuccessfulPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>All Well | Confirm Password Change</title>
      </Head>
      <div className={classes.main}>
        <BgImage />
        <div className={classes.right}>
          <div className={classes.box}>
            <p>Your password has been successfully changed!</p>
          </div>
          <div className={classes.btnWrapper}>
            <Button onClick={() => router.push("/auth/login")}>
              Click here to Access your app again!
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordChangedSuccessfulPage;
