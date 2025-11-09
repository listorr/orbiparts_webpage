import React from 'react';
import { Link } from 'react-router-dom';

const BrandLogo = ({ theme = 'blue', includeText = false, className = 'h-8 w-auto' }) => {
  const logoBlue = 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756807193009.png';
  const logoWhite = 'https://fjhynjjirvcyeahmlopq.supabase.co/storage/v1/object/public/assets/b34bd64a-153f-4c75-9bed-1bba68cece2a/1756816595602.png';

  const logoSrc = theme === 'white' ? logoWhite : logoBlue;
  const textColor = theme === 'white' ? 'text-white' : 'text-primary';

  return (
    <Link to="/" className="flex items-center space-x-3">
      <img src={logoSrc} alt="ORBIPARTS Logo" className={className} />
      {includeText && (
        <span className={`text-2xl font-bold ${textColor}`}>ORBIPARTS</span>
      )}
    </Link>
  );
};

export default BrandLogo;