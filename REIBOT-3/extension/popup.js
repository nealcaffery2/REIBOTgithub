// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');  // Ensure this matches your form ID in HTML
    const cityInput = document.getElementById('cityInput');
    const stateInput = document.getElementById('stateInput');
    const loadingElement = document.getElementById('loading');
    const resultsElement = document.getElementById('results');
    const progressBar = document.getElementById('progressBar'); // Ensure this ID is in your HTML
    const finishedContainer = document.getElementById('finishedContainer'); // Container for finished message and download button
    const downloadButton = document.getElementById('downloadButton'); // Ensure this ID is in your HTML

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

        // Simulate API call (Replace with your actual API call)
        chrome.runtime.sendMessage({ type: "SEARCH", city, state }, function (response) {
            // Hide progress bar
            progressBar.style.display = 'none';

            if (response && response.success) {
                // Display results and prepare download link
                displayResults(response.data);
                prepareDownload(response.data);
                finishedContainer.style.display = 'block';
            } else {
                // Handle errors
                resultsElement.textContent = 'Failed to fetch data.';
                resultsElement.style.display = 'block';
            }
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
