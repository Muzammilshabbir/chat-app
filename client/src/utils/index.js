export const setUserData = (data) => {
    localStorage.setItem("token", data.token)  
    localStorage.setItem("user",JSON.stringify(data.user)) 
    return true
}

export const getToken = () => localStorage.getItem("token")||''
export const getUserData = () =>JSON.parse(localStorage.getItem("user"))||null