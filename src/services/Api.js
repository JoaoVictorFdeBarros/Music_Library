const request = async (endpoint, options={})=>{
    try {
        const response = await fetch(
            `${endpoint}`, 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options
            }
        )

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
          }
          
        return await response.json();
        
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

export default request