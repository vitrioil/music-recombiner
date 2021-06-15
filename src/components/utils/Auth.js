//https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

async function getAuthCall(endpoint) {
    const controller = new AbortController();
    const { signal } = controller;
    const response = await fetch(endpoint, {
        headers: new Headers({"Authorization": `Bearer ${getCookie("token")}`}),
        method: "GET",
        signal: signal
    });
    return {response, controller};
}

async function postAuthCall(endpoint, payload) {
    const controller = new AbortController();
    const { signal } = controller;
    const response = await fetch(endpoint, {
        headers: new Headers({"Authorization": `Bearer ${getCookie("token")}`}),
        method: "POST",
        signal: signal,
        body: payload
    });
    return {response, controller};
}
export {setCookie, getCookie, eraseCookie, getAuthCall, postAuthCall};