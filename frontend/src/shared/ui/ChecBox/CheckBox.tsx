import './CheckBox.css'

interface CheckBoxProps {
    id?: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
}

export const CheckBox = (props: CheckBoxProps) => {
    const { checked, onChange, id } = props

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <div className="checkbox-wrapper-19">
            <input
                id={`todo-checkbox-${id}`}
                onChange={handleCheckboxChange}
                checked={checked}
                type="checkbox"
            />
            <label htmlFor={`todo-checkbox-${id}`} className="check-box" />
        </div>
    )
}


