type ButtonProps = {
    disabled: boolean
    label: string;
    type: 'submit' | 'button' | 'reset'
}
export function Button({ disabled, label, type }: ButtonProps) {
    return (
        <button
          type={type}
          disabled={disabled}
        >
          {label}
        </button>
    )
}