export const url = "http://127.0.0.1:8000/api";

export const apiCall = function(route, type = 'GET', data = null){
    if(type === "GET"){
        return fetch(url+route, {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('access_token'),
              }
        });
    } else {
        return fetch(url+route, {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain',
                'Authorization': 'Bearer '+localStorage.getItem('access_token'),
              },
            body: JSON.stringify(data)
        });
    }
}