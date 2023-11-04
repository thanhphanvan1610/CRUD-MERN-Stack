import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAnimals = () => {
    const [animalData, setAnimalData] = useState({
        name: '',
        species: '',
        longity: null,
        enviroment: '', // Corrected the typo in 'environment'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'longity' && isNaN(value)) {
            alert('Longity must number')
            return;
        }
        setAnimalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    const handleSaveAnimal = () => {
        setLoading(true);
        setError(null);

        axios
            .post('http://localhost:3058/animals', animalData)
            .then(() => {
                setLoading(false);
                alert('Create Animal Successful');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
            .catch((error) => {
                setLoading(false);
                setError('Error occurred while creating the animal.'); // Update the error state
                console.error(error.message);
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl text-green-600 font-semibold">Add Animals</h1>
            <div className="flex flex-col border-dashed border-sky-400 rounded-2xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-600">Name Animal</label>
                    <input
                        type="text"
                        name="name"
                        value={animalData.name}
                        onChange={handleChange}
                        className="border-2 border-gray-600 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-600">Species</label>
                    <input
                        type="text"
                        name="species"
                        value={animalData.species}
                        onChange={handleChange}
                        className="border-2 border-gray-600 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-600">Longity</label>
                    <input
                        type="text"
                        name="longity"
                        value={animalData.longity}
                        onChange={handleChange}
                        className="border-2 border-gray-600 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-600">Environment</label>
                    <input
                        type="text"
                        name="enviroment"
                        value={animalData.enviroment}
                        onChange={handleChange}
                        className="border-2 border-gray-600 px-4 py-2 w-full"
                    />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button
                    className="p-2 rounded-2xl bg-blue-600 m-8"
                    onClick={handleSaveAnimal}
                    disabled={loading} // Disable the button while loading
                >
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </div>
        </div>
    );
};

export default CreateAnimals;
