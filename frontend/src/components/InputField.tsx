// src/components/InputField.tsx
type Props = {
	label: string;
	value: string;
	onChange: (val: string) => void;
};

export const InputField = ({ label, value, onChange }: Props) => (
	<div>
		<label>{label}</label>
		<input value={value} onChange={(e) => onChange(e.target.value)} />
	</div>
);
