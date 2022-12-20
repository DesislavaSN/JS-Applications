const host = 'http://localhost:3030';

async function request(method, url, data){
    const options = {
        method,
        headers: {},
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const res = await fetch(host + url, options);

        if (res.ok == false) {
            const err = await res.json();
            throw Error(err.message);
        }

        if (res.status == 204) {
            return res;
        } else {
            return await res.json();
        }
        
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function get(url){
    return request('get', url);
}

export async function post(url, data){
    return request('post', url, data);
}

export async function put(url, data){
    return request('put', url, data);
}

// ne sum sigyrna che tazi f. del shte raboti ... 
export async function del(url, data){
    return request('delete', url, data);
}
