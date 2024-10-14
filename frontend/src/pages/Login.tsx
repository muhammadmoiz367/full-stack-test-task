import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  Box,
  Button,
  Form,
  IconButton,
  InputField,
  Text,
} from '../components/index';
import { useAuth } from '../context/AuthContext';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (payload: { email: string; password: string }) => {
    setLoading(true);
    setErrorMessage('');
    try {
      await login(payload);
      navigate('/');
    } catch (error: any) {
      console.log('error ', error);
      if (error.response.status === 401) {
        setErrorMessage(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400'>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'
      >
        <Text variant='title' text='Welcome Back!' />
        <Text variant='subtitle' text='Please login to your account' />
        <InputField
          label='Email'
          type='email'
          register={register('email')}
          error={errors.email?.message}
        />
        <InputField
          label='Password'
          type={showPassword ? 'text' : 'password'}
          register={register('password')}
          error={errors.password?.message}
          endAdornment={
            <IconButton
              Icon={showPassword ? GoEye : GoEyeClosed}
              onClick={togglePasswordVisibility}
              ariaLabel='Toggle password visibility'
            />
          }
        />

        {errorMessage && (
          <p className='text-red-500 text-center text-sm'>{errorMessage}</p>
        )}
        <Button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full'
          disabled={loading}
        >
          {loading ? 'Logging in ...' : 'Login'}
        </Button>

        <p className='text-center text-gray-500 mt-4'>
          Don't have an account?{' '}
          <a href='/signup' className='text-blue-600 hover:underline'>
            Sign Up
          </a>
        </p>
      </Form>
    </Box>
  );
};

export default Login;
