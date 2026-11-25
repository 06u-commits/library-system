import './SearchInput.css';

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      className="search-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
