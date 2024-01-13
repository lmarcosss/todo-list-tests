import { TodoType } from "@/app/page";

type ICheckBoxProps = {
    todo: TodoType;
    onChange(id: string): void;
}
export function Checkbox({ todo, onChange }: ICheckBoxProps) {
    return (
        <label 
          key={todo.id}
          htmlFor={todo.id}
        >
          <input 
              id={todo.id}
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => onChange(todo.id)}
          />
          {todo.text}
        </label>
    )
}