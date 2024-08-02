
const rootUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
const apiVersion = process.env.EXPO_PUBLIC_API_VERSION;
const apiUrl = `${rootUrl}/api/${apiVersion}`

export { apiUrl };