type InputFieldProps = {
    id: string;
    listId?: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, listId, label, type = "text", placeholder, value, onChange }) => {
    return (
        <>
            <label className="block text-lg font-bold mb-1" htmlFor={id}>{label}</label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={type}
                list={listId}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

export default InputField;