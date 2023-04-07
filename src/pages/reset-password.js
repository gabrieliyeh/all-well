import Button from "@/components/button/Button"
import BgImage from "@/components/image/BgImage"
import fetchJson from "@/lib/api"
import classes from '@/styles/reset-password.module.css'
import Head from "next/head"
import { useState } from "react"
import { toast } from "react-toastify"

const ResetPasswordPage = ()=> {
  const [userId, setUserId]= useState('')
  const [loading, setLoading]= useState(false)
 
  const handleResetPassword = async (e)=> {
    e.preventDefault();
    setLoading(true)
    const res = await fetchJson(`https://all-well-backend.onrender.com/auth/password/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId})
    })
    if(res) {
      setLoading(false)
      toast.success(res?.message)
    }
    setLoading(false)
  }

  return (
    <>
    <Head>
      <title>All Well | Reset password</title>
    </Head>
    <div className={classes.main}>
      <BgImage/>
      <div className={classes.right}>
        <h1 className={classes.heading}>Reset your password.</h1>
        <div className={classes.box}>
          <h2>Have you forgot your password?</h2>
          <p>
          Do not worry, insert here your email and we will send you a link to reset your password.
          </p>
            <form className={classes.form}  onSubmit={handleResetPassword}>
          <div className={classes.formControl}>
            <input required type="email" value={userId} placeholder="userId" onChange={(e)=> setUserId(e.target.value)} />
            <Button disabled={loading ? true : false} >
              {loading ? 'loading...': 'Reset your password'}
            </Button>
          </div>
            </form>
         
        </div>
      </div>
    </div>
    </>
    
  )
}

export default ResetPasswordPage