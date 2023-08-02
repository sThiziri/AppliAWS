import { Amplify, API, Storage } from 'aws-amplify';

 

  import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';

  import '@aws-amplify/ui-react/styles.css';

 

  import awsExports from './aws-exports';

  import { useEffect, useState } from 'react';

 

  Amplify.configure(awsExports);

 

  function App({ signOut, user }) {

    const [ressources, setRessources] = useState(null);
  
   
  
    const fetchApiData = async () => {
  
      try {
  
        const response = await  API.get('apiamplify', '/items');
  
        setRessources(response);
  
      } catch (error) {
  
        console.error('Error fetching API data:', error);
  
      }
  
    };
  
   
  
    const handleFileUpload = async (event) => {
  
      const file = event.target.files[0];
  
      if (!file) return;
  
   
  
      try {
  
        const result = await Storage.put(file.name, file, {
  
          level: 'public',
  
          contentType: file.type,
  
        });
  
   
  
        console.log('File uploaded successfully:', result.key);
  
      } catch (error) {
  
        console.error('Error uploading the file:', error);
  
      }
  
    }
  
   
  
    useEffect(() => {
  
      fetchApiData();
  
    }, [])
  
   
  
   
  
  return (
  
      <div style={styles.container}>
  
        <Heading level={1}>Hello {user.attributes.email}</Heading>
  
        <Button onClick={signOut} style={styles.button}>Sign out</Button>
  
        {JSON.stringify(ressources, null, 2)}
  
        <h2>Amplify App</h2>
  
        <Button onClick={fetchApiData} style={styles.button} >Charger les données de l'API</Button>
  
        {ressources && (
  
          <div>
  
            <h2>Résultat de l'appel API :</h2>
  
            <pre>{JSON.stringify(ressources, null, 2)}</pre>
  
            <pre>{JSON.stringify(user.attributes.email, null, 2)}</pre>
  
          </div>
  
        )}
  
   
  
      <label for="avatar">Choose a file:</label>
  
   
  
      <input type="file"
  
            id="avatar" name="avatar" onChange={handleFileUpload}/>
  
      </div>
  
    )
  
  }

 

  const styles = {

    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },

    todo: { marginBottom: 15 },

    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },

    todoName: { fontSize: 20, fontWeight: 'bold' },

    todoDescription: { marginBottom: 0 },

    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }

  }

 

  export default withAuthenticator(App);