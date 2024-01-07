import React from 'react';

interface TwitterHeaderProps {
  title: string;
  description: string;
  cta: string;
  imageUrl: string;
}
const TwitterHeader: React.FC<TwitterHeaderProps> = ({
  title,
  description,
  cta,
  imageUrl,
}) => {
  return (
    <div
      style={{
        width: '1500px', // Twitter Header dimensions
        height: '500px',
        border: '1px solid black',
        margin: '10px',
        display: 'flex', // Added for basic layout
        flexDirection: 'column', // Align items in a column
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
        textAlign: 'center', // Center text
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '20px', // Add padding
        boxSizing: 'border-box', // Ensure padding is included in width/height
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          wordWrap: 'break-word',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Apply a text shadow
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '14px',
          wordWrap: 'break-word',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Apply a text shadow
        }}
      >
        {description}
      </p>
      <button>{cta}</button>
    </div>
  );
};

export default TwitterHeader;
