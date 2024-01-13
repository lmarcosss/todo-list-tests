import { ChangeEvent } from "react";

type TextInputProps = {
    value: string | number;
    id: string;
    label: string;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export function TextInput({ id, label, value, onChange }: TextInputProps) {
    return (
        <label htmlFor={id}>
          {label}
          <input
            id={id}
            type="text"
            value={value}
            onChange={onChange}
          />
        </label>
    )
}