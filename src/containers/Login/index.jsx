import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import api from '../../services/api'
import Button from '../../components/Button'

function Login() {
  let navigate = useNavigate()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo 6 digítos'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    const {
      data: { token },
    } = await api.post('sessions', {
      email: clientData.email,
      password: clientData.password,
    })

    await localStorage.setItem('nexDigital:userToken', JSON.stringify(token))

    navigate('/')
  }

  return (
    <div>
      <h1>Login</h1>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>

        <label>Senha</label>
        <input
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <Button type="submit">
          Entrar
        </Button>
      </form>
    </div>
  )
}

export default Login
