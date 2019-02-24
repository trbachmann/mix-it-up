export const fetchData = async (url) => {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(response.message)
  } 
   return await response.json();
}