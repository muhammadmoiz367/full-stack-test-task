import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Box, Button, Form, IconButton, InputField, Text } from '../components';
import { useAuth } from '../context/AuthContext';

const signupSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
});

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signup(payload);
      navigate('/');
    } catch (error: any) {
      console.log('error ', error);
      if (error.response?.status === 409) {
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
        <Text variant='title' text='Create Your Account' />
        <Text variant='subtitle' text='Join us and enjoy the features' />

        <InputField
          label='Name'
          type='text'
          register={register('name')}
          error={errors.name?.message}
        />

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
          {loading ? 'Signing up ...' : 'Sign Up'}
        </Button>

        <p className='text-center text-gray-500 mt-4'>
          Already have an account?{' '}
          <a href='/login' className='text-blue-600 hover:underline'>
            Log In
          </a>
        </p>
      </Form>
    </Box>
  );
};

export default Signup;
