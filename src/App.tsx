import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import ActivityList from "./components/ActivityList";

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
          <div className="flex justify-between container items-center">
            <h1 className="text-center md:text-lg text-white uppercase font-bold">
              Contador de Calorias
            </h1>

            <button 
              className="p-2 text-white bg-slate-600 rounded-lg hover:bg-slate-700 transition-colors text-sm uppercase font-bold disabled:opacity-10"
              onClick={ ()=> dispatch({type: "reset-activity"})}
              disabled={!canResetApp()}
            >
              Resetear app
            </button>
          </div>
      </header>

      <section className="bg-lime-500 py-20">
        <div className="container">
          <Form 
            datosState={ state }
            dispatch={ dispatch }
          />
        </div>
      </section>

      <section className="container py-10 lg:max-w-7xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
