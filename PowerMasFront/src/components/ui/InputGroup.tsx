interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputGroup = ({ label, error, className, ...props }: Props) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <input
        className={`w-full border rounded p-2 focus:ring-2 outline-none ${
          error ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-500'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};