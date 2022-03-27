/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
const xhr = new XMLHttpRequest();
    xhr.responseType = options.responseType;
    if(options.method == 'GET') {
        if(options.data && options.data !==undefined) {
            let params = [];
            for (const [key,value] of Object.entries(options.data)) {
                params.push(`${key}=${value}`);
            }
            options.url = options.url + '?' + params.join();
        }
        try {
            xhr.open(options.method, options.url);
            xhr.send();
        }
        catch(err) {
            console.error(err);
        }
        
    } else {
        const formData = new FormData();
        const data = options.data;
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        try {
            xhr.open(options.method, options.url);
            xhr.send(formData);  
        }
        catch(err) { 
            console.error(err);
        }          
    }

    xhr.onload = () => options.callback(null, xhr.response);
};
