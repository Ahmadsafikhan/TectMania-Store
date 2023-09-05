const Message = ({ variant, children }) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'success':
          return 'bg-green-200 text-green-800 border-green-500';
        case 'error':
          return 'bg-red-200 text-red-800 border-red-500';
        case 'warning':
          return 'bg-yellow-200 text-yellow-800 border-yellow-500';
        default:
          return 'bg-blue-200 text-blue-800 border-blue-500';
      }
    };
  
    return (
      <div
        className={`border-l-4 p-4 ${getVariantClasses()}`}
        role="alert"
      >
        {children}
      </div>
    );
  };
  
  Message.defaultProps = {
    variant: 'info',
  };
  
  export default Message;