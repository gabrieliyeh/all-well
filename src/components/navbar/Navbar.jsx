import classes from './navbar.module.css'
import cls from 'classnames'

const Navbar = () => {
  return (
    <nav className={cls(classes.navbar, '' ) }>
      <img src="/static/All-Well-logo.svg" alt="logo" />
    </nav>
  )
}

export default Navbar
