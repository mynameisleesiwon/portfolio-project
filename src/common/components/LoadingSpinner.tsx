const LoadingSpinner = ({ text = '로딩중...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 md:p-12">
      <div className="w-10 h-10  border-3 md:border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      {text && (
        <p className="text-sm md:text-base text-text-muted font-medium text-center">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
