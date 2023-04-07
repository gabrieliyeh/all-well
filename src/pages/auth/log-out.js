import Button from "@/components/button/Button";
import { useRouter } from "next/router";
import classes from "@/styles/log-out.module.css";
import Head from "next/head";

const LogOutPage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <Head>
        <title>All Well | Log out</title>
      </Head>
      <div className={classes.main}>
        <h1 className={classes.heading}> You logged out!</h1>
        <div className={classes.btnWrapper}>
          <Button onClick={handleClick}>
            Click here to Access your app again!
          </Button>
        </div>
      </div>
    </>
  );
};

export default LogOutPage;
