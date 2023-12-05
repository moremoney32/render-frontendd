export function fetchData(url, data) {
    return new Promise((resolve, reject) => {
        const dataToSend = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        fetch(url, dataToSend)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 500) {
                        reject({ message: 'Erreur lors du paiement' });
                    } else {
                        reject({ message: `Erreur inconnue : ${response.statusText}` });
                    }
                } else {
                    return response.json();
                }
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject({ message: error.message });
            });
    });
}
