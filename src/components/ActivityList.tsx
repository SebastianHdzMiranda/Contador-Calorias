import { Dispatch, useMemo } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducers";

type ActivityListProps = {
    activities:  Activity[]
    dispatch: Dispatch<ActivityActions>
}


function ActivityList({ activities, dispatch }: ActivityListProps) {

    /*
        Funcion que me returna el name de la categoria con base a su ID

        - El primer arrow function corresponde al de useMemo, ahi no podemos pasar nuestros parametros
        - Para pasar nuestros parametros usar otro arrow function
        - Cada que activities cambie se ejecutara la funcion
    */
    const categoryName = useMemo(()=> (category: Activity['category']) => categories.map( cat => cat.id === category && cat.name), [activities]);

    const handleEdit = ( id: Activity['id'] )=> {
        
        dispatch({
            type: "set-activeId",
            payload: {id}
        });
    }
    const handleDelete = ( id: Activity['id'] )=> {
        
        dispatch({
            type: "delete-activity",
            payload: {id}
        });
    }

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y Actividades
            </h2>
            {activities.length > 0 ? 
            
                activities.map( activity => 

                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between items-center shadow-md rounded-lg">
                        <div className="space-y-2 relative">
                            <p
                                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}
                            >{categoryName(activity.category)}</p>
                            <p className="text-2xl font-bold pt-5">{activity.activityName}</p>
                            <p className="font-black text-4xl text-lime-500">{activity.calories} <span>Calorias</span></p>
                        </div>

                        <div>
                            <button
                                onClick={()=> handleEdit(activity.id)}
                            >
                                <PencilSquareIcon 
                                    className="h-8 w-8 text-gray-800"
                                /> 
                            </button>
                            <button
                                onClick={()=> handleDelete(activity.id)}
                            >
                                <XCircleIcon 
                                    className="h-8 w-8 text-red-500"
                                /> 
                            </button>
                        </div>
                        
                    </div>
                ) :

                <p className="text-center pt-10">No hay actividades aún...</p>
            }

        </>
    )
}

export default ActivityList;