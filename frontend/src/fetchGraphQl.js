const API = 'http://localhost:4000/graphql/';

async function fetchGraphQL(text, variables) {
    const response = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    });
  
    // Get the response as JSON
    return await response.json();
  }
  
  export default fetchGraphQL;