import { useState, ChangeEvent, Dispatch, useEffect } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducers";
import { v4 as uuidv4 } from 'uuid'

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    datosState: ActivityState
}

function Form({dispatch, datosState}: FormProps) {

    const [editMode, setEditMode] = useState(false);
        
    const initialState: Activity = {
        id: uuidv4(),
        category: 1,
        activityName: '',
        calories: 0   
    }

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (datosState.activeId) {
            const id = datosState.activeId;
            const activity = datosState.activities.filter( activity => activity.id === id);
            setActivity(activity[0]);
            setEditMode(true);
            return;
        }
        
        setEditMode(false);
        
    }, [datosState.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=> {
        const isNumber = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNumber ? +e.target.value : e.target.value 
        })
    }

    const isvalidActivity = () => {
        const {activityName, calories} = activity;

        // console.log(activityName.trim() === '' || calories <= 0);
        return (activityName.trim() === '' || calories <= 0);
    }

    const inputValueComprobation = () => {
        if (editMode) {
            return activity.category === 1 ? 'Actualizar Comida' : activity.category === 2 ? 'Actualizar Ejercicio' : 'Actualizar'
        }
        return activity.category === 1 ? 'Guardar Comida' : activity.category === 2 ? 'Guardar Ejercicio' : 'Guardar'
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editMode) {
            dispatch({
                type: 'update-activity',
                payload: {updateActivity: activity},
            });

        } else {
            dispatch({
                type: 'save-activity',
                payload: {newActivity: activity},
            });
        }


        // Reset form
        setActivity(initialState);
    }

    return (
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select 
                    name="" 
                    id="category" 
                    value={activity.category}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                >
                    {categories.map( category => 
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    )}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activityName" className="font-bold">Actividad:</label>

                <input 
                    id="activityName"
                    type="text" 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.activityName}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>

                <input 
                    id="calories"
                    type="number" 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    placeholder="Calorias. Ej.300 o 500"
                    value={activity.calories || ''}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit" 
                value={inputValueComprobation()} 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer transition-all duration-200 disabled:opacity-10" 

                disabled={isvalidActivity()}
            />
        </form>
    )
}

export default Form