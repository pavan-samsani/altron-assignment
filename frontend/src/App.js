import "./App.css";
import { useEffect } from 'react';
import ViewFlow from './flow';
function App() {
  useEffect(() => {
    const query = `
    {
      backEnd {
        id
        name
        skills {
          edges{
            node {
              id
              name
            }
          }
        }
      }
    }`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    };
    // fetch('http://localhost:4000/graphql/',requestOptions)
    // .then(response => response.json())
    // .then(data => console.log(data));
  })
  return (
    <div className="App">
      <header>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossorigin="anonymous">
        </link>
      </header>
      <div style={{padding: '40px'}}>
      <ViewFlow ></ViewFlow>
      </div>
      
    </div>
  );
}

export default App;
