addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const SERVER_1_IP = '136.243.236.205'; // Replace with Server 1 IP address
    const SERVER_2_IP = '136.243.236.206'; // Replace with Server 2 IP address

    let response;
    try {
        // Check the health of Server 1
        response = await fetch(`http://${SERVER_1_IP}`, { cf: { cacheTtl: 1 } });
        if (!response.ok) {
            throw new Error('Server 1 is down.');
        }
        return response;
    } catch (error) {
        // Server 1 is down, redirect traffic to Server 2
        console.error(error.message);
        return fetch(`http://${SERVER_2_IP}`, { cf: { cacheTtl: 1 } });
    }
}
