import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import ActivityList from "./components/ActivityList";
import CalorieTraker from "./components/CalorieTraker";

function App() {

  const [ state, dispatch ] = useReducer( activityReducer, initialState );

  // LocalStorage
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])
  
  const canResetApp = () => useMemo(()=> state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-4">
          <div className="flex justify-between px-4 sm:max-w-2xl lg:max-w-5xl mx-auto items-center">
            <h1 className="text-center md:text-2xl text-white uppercase font-bold">
              Contador de Calorias
            </h1>

            <button 
              className="p-2 text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors text-sm uppercase font-bold disabled:opacity-10 border-none"
              onClick={ ()=> dispatch({type: "reset-activity"})}
              disabled={!canResetApp()}
            >
              Resetear app
            </button>
          </div>
      </header>

      <section className="bg-lime-500 py-20">
        <div className="px-4 sm:max-w-2xl lg:max-w-5xl mx-auto">
          <Form 
            datosState={ state }
            dispatch={ dispatch }
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="px-4 sm:max-w-2xl lg:max-w-5xl mx-auto">
          <CalorieTraker 
            activities={state.activities}
          />
        </div>
      </section>

      <section className="px-4 sm:max-w-2xl lg:max-w-5xl mx-auto py-10">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
