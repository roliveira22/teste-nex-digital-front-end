import { ButtonStyles } from './styles'

function Button({ children, ...rest }) {
  return (
    <ButtonStyles {...rest}>{children}</ButtonStyles>
  )
}

export default Button
