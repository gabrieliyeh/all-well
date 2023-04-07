import Image from 'next/image'
import classes from './bgImage.module.css'

const BgImage = () => {
  return (
    <div className={classes.imgWrapper}>
      <Image  src="/static/background-image.svg" alt="bg-image" fill priority />      
    </div>
  )
}

export default BgImage
