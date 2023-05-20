'use client';
import { ACTIVITIES_DATA, Activity } from "@/config";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import ActivityList from "./activities/ActivityList";
import { ItineraryRequirements, generateItinerary } from "@/lib/generateItinerary";

const labelClass = "block text-lg font-bold mb-1";
const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

export type SelectableActivity = Activity & { isSelected: boolean };

const selectableActivities: SelectableActivity[] = ACTIVITIES_DATA.map((activity) => ({
    ...activity,
    isSelected: false
}))

const TripPlaner = () => {
    const [country, setCountry] = useState('');
    const [tripLength, setTripLength] = useState('');
    const [activities, setActivities] = useState<SelectableActivity[]>(selectableActivities);

    const [isLoadingTrip, setIsLoadingTrip] = useState(false);
    const [trip, setTrip] = useState("");

    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value);
    }

    const handleTripLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTripLength(e.target.value);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingTrip(true);

        try {
            const itinerary: ItineraryRequirements = {
                destinations: [country],
                duration: tripLength,
                activities: activities.filter(a => a.isSelected).map(a => a.name),
                budget: null,
                months: [],
                travellers: [],
                dietaryRestrictions: [],
                otherConsiderations: [],
                inDepth: false
            };

            console.log("client itinerary", itinerary)

            const result = await generateItinerary(itinerary);
            setTrip(result);
        } catch (error) {
            console.error("Error generating itinerary", error);
        } finally {
            setIsLoadingTrip(false);
        }
    }

    return (
        <div className="flex flex-col w-full md:max-w-xl">
            <form className="flex flex-col px-0 md:px-4" onSubmit={handleSubmit}>
                <div className="mb-8">
                    <label className={labelClass} htmlFor="country">Where are you going?</label>
                    <input
                        className={inputClass}
                        type="text"
                        id="country"
                        placeholder="Enter a country"
                        value={country}
                        onChange={handleCountryChange}
                    />
                </div>

                <div className="mb-8">
                    {country && (
                        <>
                            <label className={labelClass} htmlFor="tripDate">How many days?</label>
                            <input
                                className={inputClass}
                                type="number"
                                id="tripLength"
                                placeholder="Enter trip length"
                                value={tripLength}
                                onChange={handleTripLengthChange}
                            />
                        </>
                    )}
                </div>

                <div className="mb-8">
                    {country && tripLength && (
                        <ActivityList activities={activities} handleActivityClick={handleActivityClick} />
                    )}
                </div>

                {country && tripLength && (
                    <button type="submit" className="bg-accent self-center text-secondary font-semibold py-4 px-8 rounded">
                        Plan my trip
                    </button>
                )}

                {isLoadingTrip && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                    </div>
                )}

                {trip && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Your trip</h2>
                        <p>{trip}</p>
                    </div>
                )}
            </form>
        </div>
    )
}


export default TripPlaner;