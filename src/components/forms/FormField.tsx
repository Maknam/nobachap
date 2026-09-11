export type FieldOption = { value: string; label: string };
type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
  options?: FieldOption[];
  multiline?: boolean;
  maxLength?: number;
};
export function FormField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required,
  placeholder,
  autoComplete,
  type = "text",
  options,
  multiline,
  maxLength = 200,
}: Props) {
  const shared = {
    id,
    name,
    value,
    required,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: "field",
  };
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && (
          <span className="text-rust" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {options ? (
        <select {...shared} onChange={(event) => onChange(event.target.value)}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          {...shared}
          rows={4}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
