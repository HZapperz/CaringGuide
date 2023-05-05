import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import React from 'react';



type FormValues = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  const password = watch('password');

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-white inherit overflow-hidden">
         <img
          src="/images/back.png"
          alt="Login Background"
          className='overflow-hidden'
        />
      </div>
      <div className="flex-1 bg-white flex justify-center items-center">
        <div className="w-96">
        <img
          src="/images/full.png"
          alt="Login Background"
          
        />
        
        <div className='flex justify-center'>
          <h1 className="text-2xl font-bold text-black mb-6 pt-5 justify-center">Welcome to CaringGuide</h1>
          </div>
          <div className='p-8 bg-gray-200 rounded-lg shadow-xl'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-800 font-bold mb-2"
              >
                Username
              </label>
              <div className="relative">
              <input
                type="username"
                id="username"
                {...register('username', { required: true })}
                className={`w-full border-2 p-2 pl-10 rounded-lg ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="absolute top-2 left-2">
                  <UserIcon className="h-6 w-6 text-gray-500 pt-1" />
                </div>
                </div>
              {errors.username && (
                <p className="text-red-500 mt-2">Email is required</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { required: true })}
                    className={`w-full border-2 p-2 pl-10 rounded-lg ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleShowPasswordClick}
                    className="absolute right-2 top-2"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-6 w-6 text-gray-600 pt-1" />
                    ) : (
                      <EyeIcon className="h-6 w-6 text-gray-600 pt-1" />
                    )}
                  </button>
                  <div className="absolute top-2 left-2">
                  <LockClosedIcon className="h-6 w-6 text-gray-500 pt-1" />
                </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 mt-2">Password is required</p>
                )}
              </div>
              <div className='flex justify-center'>
              <button
                type="submit" className="bg-caring hover:bg-guide text-white font-bold py-2 px-4 rounded ">
                Sign In
              </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  
