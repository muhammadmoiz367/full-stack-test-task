import React from 'react';

interface TextProps {
  variant: 'title' | 'subtitle' | 'body';
  text: String;
  className?: string;
}

const Text: React.FC<TextProps> = ({ variant, text, className }) => {
  const baseClasses = `text-gray-800 ${className}`;

  const variantClasses = {
    title: 'text-3xl font-bold text-center',
    subtitle: 'text-lg text-center text-gray-600 mb-4',
    body: 'text-base text-center text-gray-500',
  };

  return <p className={`${baseClasses} ${variantClasses[variant]}`}>{text}</p>;
};

export default Text;
