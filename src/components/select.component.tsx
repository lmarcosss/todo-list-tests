import { ChangeEvent } from "react"

type OptionType = {
    defaultChecked?: boolean
    value: string
    label: string
}

type SelectProps = {
    onChange(event: ChangeEvent<HTMLSelectElement>): void
    value: string
    id: string
    options: OptionType[];
}
export function Select({ onChange, value, id, options }: SelectProps) {
    return (
      <select 
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((optionData) => (
            <option
                key={optionData.value}
                defaultChecked={optionData?.defaultChecked}
                value={optionData.value}
            >
            {optionData.label}
        </option>
        ))}
      </select>
    )
}