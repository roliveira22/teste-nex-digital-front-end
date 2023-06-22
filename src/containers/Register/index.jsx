import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import api from '../../services/api'
import Button from '../../components/Button'

function Register() {
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo 6 digítos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    await api.post('users', {
      name: clientData.name,
      email: clientData.email,
      password: clientData.password,
    })

    navigate('/login')
  }


  return (
    <div>
      <h1>Cadastro</h1>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <label>Nome</label>
        <input type="text" {...register('name')} error={errors.name?.message} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

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

        <label>Confirmar Senha</label>
        <input
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

        <Button type="submit">
          Cadastrar-se
        </Button>
      </form>
    </div>
  )
}

export default Register
