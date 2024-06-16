
const ROUTES = {
  BASE_URL:`${import.meta.env.VITE_BASE_API_URL_DEV}/api/v1`,
  LOGIN:"user/login",
  REGISTER:"user/register",
  MESSAGES:"messages",
}  

const getAccessToken = () => localStorage.getItem("accessToken")||''

const get = async ({ url, id = null, searchParams=null, auth=true }) => {
  const token=getAccessToken()

  try {

    
    let headers = {};
    let newurl = url;
    
    if (auth) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (id) newurl = newurl + "/" + id;
    else if (searchParams) {
        const queryParams = new URLSearchParams(searchParams).toString();
        newurl = `${newurl}?${queryParams}`;
    }

    let promise = await fetch(`${ROUTES.BASE_URL}/${newurl}`, {
      method: "GET",
      headers,
    });
    if (promise.status === 200) {
      let res = await promise.json();
      return res;
    } else return null;
  } catch (error) {
    console.log("GET ", error);
    return null;
  }
};

const post = async ({ url, body, isFormData = false, auth=true }) => {
  try {
    const token=getAccessToken()

    let headers = {
      Accept: "application/json, text/plain, */*"
    };
    if(!isFormData)headers['Content-Type']='application/json'

    if (auth) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let promise = await fetch(`${ROUTES.BASE_URL}/${url}`,
    {
      method: "POST",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (!promise.ok) {
      const errorData = await promise.json()

      return Promise.reject(errorData)
    }
    let data = await promise.json();
    return data;
  } catch (ex) {
    if (ex instanceof TypeError && ex.message === "Failed to fetch") {
      throw new Error('Network Error: Please check your internet connection')
    }
    throw new Error(ex);
  }
};

const FETCH = {get, post}
export {FETCH, ROUTES};
