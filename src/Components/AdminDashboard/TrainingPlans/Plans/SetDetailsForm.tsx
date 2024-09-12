import { Controller, useForm } from "react-hook-form";
import { SetDetails } from "../../../../Models/TrainingPlan";
import { useEffect } from "react";
import { trainingPlansService } from "../../../../Services/TrainingPlansService";

type SetDetailsFormProps = {
    setDetails: SetDetails[]
    setEditIndex: React.Dispatch<React.SetStateAction<number>>
    editIndex: number
}


export default function SetDetailsForm({ setDetails, editIndex, setEditIndex }: SetDetailsFormProps): JSX.Element {
    const { control, handleSubmit, reset } = useForm<SetDetails>({
        defaultValues: { weight: 0, reps: 0, effortLevel: 5 }
    });

    useEffect(() => {
        if (editIndex !== null) {
            reset(setDetails[editIndex]);
        }
    }, [editIndex, reset, setDetails]);

    const onSubmit = async (data: SetDetails) => {
        try {
            console.log("Updated Set Details:", data);
            const updatedSetDetails = [...setDetails];
            // updatedSetDetails[editIndex!] = data;
            await trainingPlansService.updateSetDetails(data);
            setEditIndex(null);
        } catch (error) {
            console.error("Failed to update set details", error);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">משקל</label>
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                placeholder="Enter weight"
                            />
                        )}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">חזרות</label>
                    <Controller
                        name="reps"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                placeholder="Enter reps"
                            />
                        )}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">רמת מאמץ</label>
                    <Controller
                        name="effortLevel"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                placeholder="Enter effort level"
                            />
                        )}
                    />
                </div>
                <div className="flex space-x-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        שמור
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditIndex(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        ביטול
                    </button>
                </div>
            </form>
        </div>
    )
}