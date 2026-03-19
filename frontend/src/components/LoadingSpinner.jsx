function LoadingSpinner({ fullScreen = false }) {
  const spinner = (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-950">
        {spinner}
      </div>
    );
  }

  return <div className="py-12">{spinner}</div>;
}

export default LoadingSpinner;