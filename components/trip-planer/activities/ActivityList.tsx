
import { SelectableActivity } from "../TripPlaner";
import ActivityButton from "./ActivityButton";

const ActivityList = ({ activities, handleActivityClick }: { activities: SelectableActivity[], handleActivityClick: (activity: SelectableActivity) => void }) => (
    <div className="flex flex-row flex-wrap space-x-4 items-center justify-center">
        {activities.map((activity) => (
            <ActivityButton key={`${activity.icon + activity.name + activity.isSelected}`} name={activity.name} icon={activity.icon} onClick={() => handleActivityClick(activity)} isSelected={activity.isSelected} />
        ))}
    </div>
)

export default ActivityList;