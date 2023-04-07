import Head from "next/head";
import Button from "@/components/button/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "@/styles/home.module.css";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const [changeColor, setChangeColor] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth/login");
  }, [status, router]);

  const handleClick = () => {
    setChangeColor(!changeColor);
  };
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/auth/log-out",
    });
  };

  if (status === "authenticated")
    return (
      <>
        <Head>
          <title>All Well | Home</title>
          <meta
            name="description"
            content="This a test app for all well company to test my technical skills"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={classes.main}>
          <h1 className={classes.heading}>This is your beautiful test app!</h1>
          <div className={classes.box}>
            <p>
              This app let’s you change the color of the button below from green
              to red
              <br /> each time you click it! isnt’ that amazing?
            </p>
            <div className={classes.btnContainer}>
              <div className={classes.btnWrapper}>
                <Button onClick={handleClick} changeColor={changeColor}>
                  Change the color of this button now
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.logOutBtn}>
            <Button onClick={handleLogout}>Log-out</Button>
          </div>
        </main>
      </>
    );
  return <div>Loading...</div>;
}
