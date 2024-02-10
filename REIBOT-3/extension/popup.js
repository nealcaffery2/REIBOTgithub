// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const apiEndpoint = 'https://nealcaffery2.github.io/REIBOTgithub/server/search';
    const searchForm = document.getElementById('searchForm');
    const cityInput = document.getElementById('cityInput');
    const stateInput = document.getElementById('stateInput');
    const loadingElement = document.getElementById('loading');
    const resultsElement = document.getElementById('results');
    const progressBar = document.getElementById('progressBar');
    const finishedContainer = document.getElementById('finishedContainer');
    const downloadButton = document.getElementById('downloadButton');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Show progress bar, hide other elements
        progressBar.style.display = 'block';
        loadingElement.style.display = 'none';
        resultsElement.style.display = 'none';
        finishedContainer.style.display = 'none';

        // Get the input values
        const city = cityInput.value;
        const state = stateInput.value;

        // Make an API call to your GitHub Pages-hosted server
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city, state })
        })
            .then(response => response.json())
            .then(data => {
                // Hide progress bar
                progressBar.style.display = 'none';

                if (data && data.success) {
                    // Display results and prepare download link
                    displayResults(data.data);
                    prepareDownload(data.data);
                    finishedContainer.style.display = 'block';
                } else {
                    // Handle errors
                    resultsElement.textContent = 'Failed to fetch data.';
                    resultsElement.style.display = 'block';
                }
            })
            .catch(error => {
                // Handle any errors that occur during the fetch
                console.error('Error fetching data:', error);
                resultsElement.textContent = 'Failed to fetch data.';
                resultsElement.style.display = 'block';
            });
    });

    function displayResults(data) {
        // Display the data in 'resultsElement'
        resultsElement.textContent = JSON.stringify(data, null, 2);
        resultsElement.style.display = 'block';
    }

    function prepareDownload(data) {
        // Convert data to CSV and set download link
        const csvData = convertDataToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        downloadButton.href = url;
        downloadButton.download = 'real_estate_data.csv';
        downloadButton.style.display = 'block';
    }

    function convertDataToCSV(data) {
        // Convert data to CSV format (Placeholder function)
        return "example,data,to,download\n";
    }
});
