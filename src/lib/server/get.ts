const domain = "http://localhost:3000/api/"
export async function ServerFetch(endpoint:string) {
    try {
      const result = await fetch(`${domain}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const body = await result.json();
      return {
        body:body,
      };
    } catch (e) {
            console.log(e)
    }
  }
export async function GetOffre(){
  const res = await ServerFetch("offre");
  return res
}
export async function GetCarsoul(){
  const res = await ServerFetch("carsoul");
  return res?.body
}
export async function GetSinglData($parms:string){
  const res = await ServerFetch(`data?search=${$parms}`);
  return res?.body
}