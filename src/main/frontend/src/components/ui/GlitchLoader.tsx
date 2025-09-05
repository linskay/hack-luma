import React from 'react';
import '../../styles/glitch-loader.css';

interface GlitchLoaderProps {
  message?: string;
}

const GlitchLoader: React.FC<GlitchLoaderProps> = ({ message = 'LOADING...' }) => {
  return (
    <div className="glitch" data-glitch={message}>
      {message}
    </div>
  );
};

export default GlitchLoader;
