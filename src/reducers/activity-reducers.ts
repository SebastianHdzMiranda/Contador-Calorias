import { Activity } from "../types"

/*
    type para mis acciones
    - Con el operador | (Bitewise OR) podemos tener varios actions 
*/
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } | 
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'update-activity', payload: { updateActivity: Activity  } } |
    { type: 'delete-activity', payload: { id:  Activity['id'] } }


export type ActivityState = {
    activities: Activity[];
    activeId: Activity['id'];
}

// Consultar localStorage
const localStorageActivities = ()=> {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
}



// State
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

// Funcion reducer
export const activityReducer = (state = initialState,  action: ActivityActions)=> {
    
    if (action.type === 'save-activity') {  
        
        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    if (action.type === 'set-activeId') {
        
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'update-activity') {
        
        const { payload: {updateActivity} } = action;

        return {
            ...state,
            activeId: '',
            activities: state.activities.map( activity => activity.id === updateActivity.id ? updateActivity : activity)
        }
    }

    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    return state;
}