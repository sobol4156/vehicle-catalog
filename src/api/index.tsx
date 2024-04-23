
export const api = async() => {
   const response = await fetch('https://test.tspb.su/test-task/vehicles',{
    method: 'GET'
   })
   const commits = await response.json()

    return commits
}


