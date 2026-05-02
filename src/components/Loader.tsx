const Loader = () => {
  return (
    <div
      role="status"
      aria-label="Loading pokemon"
      className="flex justify-center py-6"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
    </div>
  );
};

export default Loader;
