import { SelectableActivity } from "../TripPlaner";

type ActivityButtonProps = SelectableActivity & {
    onClick: () => void;
}

const ActivityButton = ({ name, icon, onClick, isSelected }: ActivityButtonProps) => (
    <button
        type="button"
        aria-label={name}
        className={`rounded-lg  shadow-md text-secondary transition-all px-4 py-2 m-2 hover:scale-105 bg-primary-button ${isSelected ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
        onClick={onClick}
    >
        <i className={`fa fa-${icon} mr-2`} aria-hidden="true" />
        {name}
    </button>
)


export default ActivityButton;