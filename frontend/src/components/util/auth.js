export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token
}
export const delAuthToken = () => {
    localStorage.removeItem("token");
    return 
}

