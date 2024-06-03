import { useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import ActivityList from "./components/ActivityList";

function App() {

  const [ state, dispatch ] = useReducer( activityReducer, initialState );

  return (
    <>
      <header className="bg-lime-600 py-3">
          <div className="flex justify-between container">
            <h1 className="text-center text-lg text-white uppercase font-bold">
              Contador de Calorias
            </h1>
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

      <section className="container pt-10 lg:max-w-7xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
