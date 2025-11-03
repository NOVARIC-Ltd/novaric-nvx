
import React from 'react';

interface CardProps {
  title?: string;
  titleIcon?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, titleIcon, headerAction, children, className = '' }) => {
  return (
    <div className={`bg-gray-900 bg-opacity-70 border border-gray-800 rounded-xl shadow-lg backdrop-blur-sm ${className}`}>
      {title && (
        <div className="px-4 py-3 sm:px-6 flex justify-between items-center border-b border-gray-800">
          <h3 className="text-lg leading-6 font-semibold text-white flex items-center gap-2">
            {titleIcon}
            <span>{title}</span>
          </h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
