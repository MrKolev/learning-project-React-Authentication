export const gatAuthToken = () => {
    const token = localStorage.getItem("token");
    return token
}
export const delAuthToken = () => {
    localStorage.clear()
    return 
}