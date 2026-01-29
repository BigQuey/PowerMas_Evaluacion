interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { id: number | string; label: string }[];
  error?: string;
}

export const SelectGroup = ({ label, options, error, ...props }: Props) => {
  return (
    <div>
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <select
        className={`w-full border rounded p-2 focus:ring-2 outline-none ${
          error ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-500'
        }`}
        {...props}
      >
        <option value={0}>-- Seleccione --</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};