'use client';
import { ACTIVITIES_DATA, Activity } from "@/data";
import { useEffect, useRef, useState } from "react";
import ActivityList from "./activities/ActivityList";
import { ItineraryRequirements, generateItinerary } from "@/lib/generateItinerary";
import InputField from "../Forms/InputField";
import IteneraryResult from "./IteneraryItem";

export type SelectableActivity = Activity & { isSelected: boolean };

const selectableActivities: SelectableActivity[] = ACTIVITIES_DATA.map((activity) => ({
    ...activity,
    isSelected: false
}))

const TripPlaner = () => {
    const [itineraryRequirements, setItineraryRequirements] = useState<ItineraryRequirements>({
        destinations: '',
        duration: '',
        activities: [],
        budget: '',
        months: [],
        travellers: '',
        dietaryRestrictions: [],
        otherConsiderations: [],
        inDepth: false
    });

    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const [activities, setActivities] = useState<SelectableActivity[]>(selectableActivities);

    const [isGeneratingItenerary, setIsGeneratingItenerary] = useState(false);
    const [iteneraryResult, setIteneraryResult] = useState<string>('');

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItineraryRequirements({
            ...itineraryRequirements,
            destinations: e.target.value
        });
    }

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItineraryRequirements({
            ...itineraryRequirements,
            duration: e.target.value
        });
    }

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItineraryRequirements({
            ...itineraryRequirements,
            budget: e.target.value
        });
    }

    const handleTravellersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItineraryRequirements({
            ...itineraryRequirements,
            travellers: e.target.value
        });
    }

    const handleActivityClick = (activity: Activity) => {
        const updatedActivities = activities.map(a => {
            if (a.name === activity.name) {
                return { ...a, isSelected: !a.isSelected };
            }

            return a;
        });

        setActivities(updatedActivities);
    }

    const handleGenerationComplete = (result: string) => {
        setIteneraryResult((prev) => prev + result);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsGeneratingItenerary(true);

        const itineraryData: ItineraryRequirements = {
            ...itineraryRequirements,
            activities: activities.filter(a => a.isSelected).map(a => a.name),
        };

        try {
            await generateItinerary(itineraryData, handleGenerationComplete);
        } catch (error) {
            console.error("Error generating itenerary from itineraryData:", error);
        } finally {
            setIsGeneratingItenerary(false);
        }
    }

    const showCreateButton = itineraryRequirements.destinations && itineraryRequirements.duration && activities.some(a => a.isSelected)
    const showRestOfForm = false; // itineraryRequirements.destinations && itineraryRequirements.duration && activities.some(a => a.isSelected);

    return (
        <div className="flex flex-col w-full">
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <fieldset className="flex flex-col">
                    <div className="mb-8">
                        <InputField id="destinations" listId="destinations-list" label="Destinations" type="text" placeholder="i.e. Thailand, Vietnam, Laos" value={itineraryRequirements.destinations} onChange={handleDestinationChange} />
                        <datalist id="destinations-list">
                            <option value="South East Asia" />
                            <option value="New York" />
                            <option value="Scandinavia" />
                            <option value="Bali" />
                        </datalist>
                    </div>

                    {itineraryRequirements.destinations && (
                        <div className="mb-8">
                            <InputField id="duration" listId="duration-list" label="How long?" type="text" placeholder="i.e. 3 weeks" value={itineraryRequirements.duration} onChange={handleDurationChange} />
                            <datalist id="duration-list">
                                <option value="1-2 weeks" />
                                <option value="2 months" />
                                <option value="Ideal time needed" />
                            </datalist>
                        </div>
                    )}

                    {itineraryRequirements.destinations && itineraryRequirements.duration && (
                        <div className="mb-8">
                            <p className="block text-lg font-bold mb-4">Pick your flavors</p>
                            <ActivityList activities={activities} handleActivityClick={handleActivityClick} />
                        </div>
                    )}

                    {showMoreDetails && (
                        <div>
                            <p className="block text-lg font-bold mb-8">More Details</p>
                            <div className="mb-8">
                                <InputField id="budget" label="Budget" type="text" placeholder="$500 per week" value={itineraryRequirements.budget} onChange={handleBudgetChange} />
                            </div>

                            <div className="mb-8">
                                <InputField id="duration" label="Who is travelling?" type="text" placeholder="Me and my friend" value={itineraryRequirements.travellers} onChange={handleTravellersChange} />
                            </div>
                        </div>
                    )}

                    {showCreateButton && (
                        <button type="submit" className="bg-primary-button rounded-lg shadow-md text-secondary font-semibold transition-all px-8 self-center py-2 m-2 scale-105 hover:opacity-75">
                            Create my Trip
                        </button>
                    )}

                    {/* {isGeneratingItenerary && (
                        <div className="flex flex-col items-center justify-center my-8">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
                            <p className="block text-lg font-bold mt-4">This may take 10 to 15 seconds...</p>
                        </div>
                    )} */}

                    <div className="mt-8">
                        {iteneraryResult && (
                            <IteneraryResult result={iteneraryResult} />
                        )}
                    </div>
                </fieldset>
            </form>
        </div>
    )
}




export default TripPlaner;