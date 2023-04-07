import classes from './button.module.css'
import cls from 'classnames'

const Button = ({children,onClick, changeColor, ...props}) => {
  const styles = {
    backgroundColor: 'red',
  }
  
  return (
    <button {...props} className={cls(classes.btn, changeColor ? classes.red: classes.green)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
