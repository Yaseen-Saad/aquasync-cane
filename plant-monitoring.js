// Chart.js Configuration
Chart.defaults.font.family = "'Montserrat', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.title.font.size = 14;
Chart.defaults.plugins.title.font.weight = '600';

// Responsive chart configuration
const chartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 16/9,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                padding: 20,
                usePointStyle: true
            }
        }
    }
};

// Initialize Parameter Trends Chart
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00'],
        datasets: [{
            label: 'Water Level (m)',
            data: [2.5, 2.4, 2.6, 2.5, 2.3, 2.5],
            borderColor: '#2E7D32',
            tension: 0.4
        }, {
            label: 'Soil Humidity (%)',
            data: [65, 68, 62, 65, 68, 64],
            borderColor: '#1565C0',
            tension: 0.4
        }]
    },
    options: {
        ...chartConfig,
        scales: {
            y: {
                beginAtZero: false,
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: 'Parameter Values'
                }
            }
        }
    }
});

// Initialize Treatment Efficiency Chart
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['BOD', 'COD', 'TSS', 'TDS'],
        datasets: [{
            label: 'Removal Efficiency (%)',
            data: [92, 88, 95, 85],
            backgroundColor: '#1565C0'
        }]
    },
    options: {
        ...chartConfig,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Removal Efficiency (%)'
                }
            }
        }
    }
});

// Handle window resize
function handleResize() {
    [lineChart, barChart].forEach(chart => {
        if (chart) chart.resize();
    });
}

window.addEventListener('resize', handleResize);

// Simulate real-time data updates
function updateMonitoringData() {
    // Update treatment parameters
    const treatmentData = {
        bod: {
            removal: Math.floor(Math.random() * (95 - 85) + 85),
            status: 'optimal'
        },
        cod: {
            removal: Math.floor(Math.random() * (90 - 80) + 80),
            status: 'optimal'
        },
        tss: {
            removal: Math.floor(Math.random() * (98 - 90) + 90),
            status: 'optimal'
        },
        tds: {
            level: Math.floor(Math.random() * (3000 - 2000) + 2000),
            status: 'warning'
        }
    };

    // Update water and soil monitoring
    const monitoringData = {
        waterLevel: {
            value: (Math.random() * (3.0 - 2.0) + 2.0).toFixed(1),
            status: 'optimal',
            lastUpdate: '2 min ago'
        },
        soilHumidity: {
            value: Math.floor(Math.random() * (75 - 55) + 55),
            status: 'optimal',
            lastUpdate: '1 min ago'
        }
    };

    // Update environmental conditions
    const environmentalData = {
        temperature: Math.floor(Math.random() * (32 - 24) + 24),
        ph: (Math.random() * (8.0 - 6.5) + 6.5).toFixed(1),
        conductivity: Math.floor(Math.random() * (1000 - 600) + 600),
        dissolvedOxygen: (Math.random() * (8.0 - 5.0) + 5.0).toFixed(1)
    };

    // Update treatment parameters display
    document.getElementById('bod-removal').textContent = treatmentData.bod.removal;
    document.getElementById('cod-removal').textContent = treatmentData.cod.removal;
    document.getElementById('tss-removal').textContent = treatmentData.tss.removal;
    document.getElementById('tds-level').textContent = treatmentData.tds.level;

    // Update monitoring values
    document.getElementById('water-level').textContent = monitoringData.waterLevel.value;
    document.getElementById('water-update').textContent = monitoringData.waterLevel.lastUpdate;
    document.getElementById('soil-humidity').textContent = monitoringData.soilHumidity.value;
    document.getElementById('humidity-update').textContent = monitoringData.soilHumidity.lastUpdate;

    // Update environmental conditions
    document.getElementById('current-temp').textContent = environmentalData.temperature + '°C';
    document.getElementById('ph-level').textContent = environmentalData.ph;
    document.getElementById('conductivity').textContent = environmentalData.conductivity + ' µS/cm';
    document.getElementById('dissolved-oxygen').textContent = environmentalData.dissolvedOxygen + ' mg/L';

    // Update status indicators
    updateStatusIndicators(monitoringData);
    updateParameterStatus(treatmentData);

    // Update charts
    updateCharts(monitoringData, treatmentData);
}

// Update status indicators
function updateStatusIndicators(data) {
    // Water level status
    const waterStatus = document.querySelector('.monitoring-card:first-child .monitoring-status');
    if (data.waterLevel.value < 1.5 || data.waterLevel.value > 3.5) {
        waterStatus.className = 'monitoring-status critical';
        waterStatus.textContent = 'Critical';
    } else if (data.waterLevel.value < 2.0 || data.waterLevel.value > 3.0) {
        waterStatus.className = 'monitoring-status warning';
        waterStatus.textContent = 'Warning';
    } else {
        waterStatus.className = 'monitoring-status optimal';
        waterStatus.textContent = 'Normal';
    }

    // Soil humidity status
    const humidityStatus = document.querySelector('.monitoring-card:last-child .monitoring-status');
    if (data.soilHumidity.value < 50 || data.soilHumidity.value > 90) {
        humidityStatus.className = 'monitoring-status critical';
        humidityStatus.textContent = 'Critical';
    } else if (data.soilHumidity.value < 60 || data.soilHumidity.value > 80) {
        humidityStatus.className = 'monitoring-status warning';
        humidityStatus.textContent = 'Warning';
    } else {
        humidityStatus.className = 'monitoring-status optimal';
        humidityStatus.textContent = 'Optimal';
    }
}

// Update parameter status
function updateParameterStatus(data) {
    const parameters = ['bod', 'cod', 'tss', 'tds'];
    parameters.forEach(param => {
        const card = document.querySelector(`.parameter-card:has(#${param}-removal)`);
        if (card) {
            const status = card.querySelector('.parameter-status');
            if (param === 'tds') {
                const level = data[param].level;
                if (level > 2800) {
                    status.className = 'parameter-status critical';
                    status.textContent = 'Critical';
                } else if (level > 2500) {
                    status.className = 'parameter-status warning';
                    status.textContent = 'Monitor';
                } else {
                    status.className = 'parameter-status optimal';
                    status.textContent = 'Optimal';
                }
            } else {
                const removal = data[param].removal;
                if (removal < 80) {
                    status.className = 'parameter-status critical';
                    status.textContent = 'Critical';
                } else if (removal < 85) {
                    status.className = 'parameter-status warning';
                    status.textContent = 'Monitor';
                } else {
                    status.className = 'parameter-status optimal';
                    status.textContent = 'Optimal';
                }
            }
        }
    });
}

// Update charts with new data
function updateCharts(monitoringData, treatmentData) {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    // Update line chart
    lineChart.data.labels.push(time);
    lineChart.data.datasets[0].data.push(parseFloat(monitoringData.waterLevel.value));
    lineChart.data.datasets[1].data.push(monitoringData.soilHumidity.value);
    
    if (lineChart.data.labels.length > 6) {
        lineChart.data.labels.shift();
        lineChart.data.datasets.forEach(dataset => dataset.data.shift());
    }
    
    // Update bar chart
    barChart.data.datasets[0].data = [
        treatmentData.bod.removal,
        treatmentData.cod.removal,
        treatmentData.tss.removal,
        (treatmentData.tds.level / 3000 * 100).toFixed(1)
    ];
    
    // Update charts
    lineChart.update();
    barChart.update();
}

// Refresh monitoring data
function refreshMonitoringData() {
    updateMonitoringData();
    // Add loading animation
    const refreshBtn = document.querySelector('.monitoring-controls .btn');
    refreshBtn.classList.add('loading');
    setTimeout(() => refreshBtn.classList.remove('loading'), 1000);
}

// Adjust water level
function adjustWaterLevel() {
    console.log('Adjusting water level...');
    // Implement water level adjustment logic here
}

// Adjust irrigation
function adjustIrrigation() {
    console.log('Adjusting irrigation...');
    // Implement irrigation adjustment logic here
}

// Show help content
function showHelp(section) {
    const helpContent = document.getElementById('helpContent');
    const modal = document.getElementById('helpModal');
    
    const helpTexts = {
        treatment: `
            <h3>Treatment Parameters</h3>
            <p><strong>BOD (Biological Oxygen Demand):</strong> Measures the amount of dissolved oxygen needed by microorganisms to break down organic material.</p>
            <p><strong>COD (Chemical Oxygen Demand):</strong> Indicates the amount of oxygen required to chemically oxidize organic compounds in water.</p>
            <p><strong>TSS (Total Suspended Solids):</strong> Measures the total amount of suspended particles in the water.</p>
            <p><strong>TDS (Total Dissolved Solids):</strong> Indicates the total amount of dissolved substances in the water.</p>
        `
    };
    
    helpContent.innerHTML = helpTexts[section] || 'Help content not available';
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('helpModal').style.display = 'none';
});

// Initialize data on load
document.addEventListener('DOMContentLoaded', () => {
    updateMonitoringData();
    setInterval(updateMonitoringData, 30000); // Update every 30 seconds
});