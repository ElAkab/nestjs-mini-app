import React, { forwardRef } from "react";

/**
 * Props for the InputField component
 * Extends native input attributes so React Hook Form can inject:
 * - ref
 * - onChange
 * - onBlur
 * - name
 */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, id, required, ...rest }, ref) => {
		return (
			<div className="flex flex-col">
				<label htmlFor={id} className="mb-1 ml-2 font-medium text-gray-700">
					{label}
				</label>

				<input
					ref={ref}
					id={id}
					required={required}
					className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					{...rest}
				/>
			</div>
		);
	},
);

InputField.displayName = "InputField";

export default InputField;
