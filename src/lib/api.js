import { toast } from "react-toastify"

export default async function fetchJson(url, options) {
try {
  const res = await fetch(url, options)
    const data = await res.json() 
    if(!res.ok ){       
      throw new Error(data?.message,res.status || res.status)
    }
    return data
} catch (error) {
  toast.error(error?.message || 'Something went wrong')
  console.error(error.message)
}  
}

