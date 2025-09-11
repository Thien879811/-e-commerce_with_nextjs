import { createCategory, updateCategory } from "@/api/apiCategory";
import {API_URL} from '@/config';

export interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        _id: string;
        name: string;
        description?: string;
        image?:{
            url: string;
        };
    } | null;
    fetchCategories: () => Promise<void>;
}

export default function CategoryModal({ isOpen, onClose, initialData, fetchCategories }: CategoryModalProps) {
    if (!isOpen) return null;

    const isEditMode = Boolean(initialData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (isEditMode && initialData) {
            try{
                await updateCategory(initialData._id,formData);
                fetchCategories();
            }catch(error){
                console.error("Error updating category:", error);
            }
        } else {   // Create category
            await createCategory(formData);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Modal container */}
            <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl animate-fade-in-up">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
                >
                </button>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {isEditMode ? "Edit Category" : "Create Category"}
                    </h2>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={initialData?.name || ""}
                            className="w-full text-black rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={initialData?.description || ""}
                            rows={3}
                            className="w-full rounded-lg border text-black border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                            Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            className="w-full rounded-lg border border-gray-300 p-2"
                        />
                        {isEditMode && initialData?.image && (
                            <img
                                src={API_URL + initialData.image.url}
                                alt="Current"
                                className="mt-3 h-20 w-20 rounded-md object-cover border"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            {isEditMode ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
