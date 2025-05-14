// Chart.js Configuration
Chart.defaults.font.family = "'Montserrat', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.title.font.size = 14;
Chart.defaults.plugins.title.font.weight = '600';

// Responsive chart configuration
const chartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.6,
    layout: {
        padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
    },
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                padding: 20,
                usePointStyle: true,
                boxWidth: 6
            }
        }
    }
};

// Line Chart specific config
const lineChartConfig = {
    ...chartConfig,
    aspectRatio: 2,
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: false,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)'
            }
        }
    }
};

// Pie Chart specific config
const pieChartConfig = {
    ...chartConfig,
    aspectRatio: 1.2
};

// Bar Chart specific config
const barChartConfig = {
    ...chartConfig,
    aspectRatio: 1.6
};

// Initialize Line Chart
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Water Level (m)',
            data: [2.5, 2.3, 2.4, 2.6, 2.4, 2.5],
            borderColor: '#2E7D32',
            tension: 0.4,
            fill: false
        }, {
            label: 'Soil Humidity (%)',
            data: [65, 68, 67, 69, 70, 68],
            borderColor: '#1565C0',
            tension: 0.4,
            fill: false
        }]
    },
    options: lineChartConfig
});

// Initialize Pie Chart
const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
        labels: ['Optimal', 'Warning', 'Critical'],
        datasets: [{
            data: [70, 20, 10],
            backgroundColor: ['#4CAF50', '#FF9800', '#F44336']
        }]
    },
    options: {
        ...pieChartConfig,
        cutout: '60%'
    }
});

// Initialize Bar Chart for Sugar Industry Parameters
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['BOD', 'COD', 'TDS', 'TSS'],
        datasets: [{
            label: 'Treatment Efficiency (%)',
            data: [85, 92, 88, 95],
            backgroundColor: '#2E7D32'
        }]
    },
    options: barChartConfig
});

// Handle window resize
function handleResize() {
    [lineChart, pieChart, barChart].forEach(chart => {
        if (chart) chart.resize();
    });
}

window.addEventListener('resize', handleResize);

// Update parameter values
function updateParameters() {
    // Update water treatment parameters
    document.getElementById('bod').textContent = '150 mg/L';
    document.getElementById('cod').textContent = '350 mg/L';
    document.getElementById('tds').textContent = '2500 mg/L';
    document.getElementById('tss').textContent = '100 mg/L';

    // Update irrigation parameters
    document.getElementById('water-level').textContent = '2.5 m';
    document.getElementById('soil-humidity').textContent = '65%';
    document.getElementById('ph').textContent = '7.2';
    document.getElementById('conductivity').textContent = '800 µS/cm';
}

// Initialize parameters on load
document.addEventListener('DOMContentLoaded', () => {
    updateParameters();
    setInterval(updateParameters, 5000); // Update every 5 seconds
});

// Control handlers
document.getElementById('water-level-control').addEventListener('input', function(e) {
    document.querySelector('#water-level-control + .slider-value').textContent = e.target.value + ' m';
    updateCharts();
});

document.getElementById('soil-humidity-control').addEventListener('input', function(e) {
    document.querySelector('#soil-humidity-control + .slider-value').textContent = e.target.value + '%';
    updateCharts();
});

document.getElementById('system-status').addEventListener('change', function(e) {
    updateSystemStatus(e.target.checked);
});

// Update charts with new data
function updateCharts() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    
    // Update line chart
    lineChart.data.labels.push(time);
    lineChart.data.datasets[0].data.push(document.getElementById('water-level-control').value);
    lineChart.data.datasets[1].data.push(document.getElementById('soil-humidity-control').value);
    
    if (lineChart.data.labels.length > 10) {
        lineChart.data.labels.shift();
        lineChart.data.datasets.forEach(dataset => dataset.data.shift());
    }
    
    // Update pie chart with treatment efficiency
    const efficiency = calculateTreatmentEfficiency();
    pieChart.data.datasets[0].data = [
        efficiency.optimal,
        efficiency.warning,
        efficiency.critical
    ];
    
    // Update bar chart with current treatment parameters
    barChart.data.datasets[0].data = [
        calculateRemovalEfficiency('bod'),
        calculateRemovalEfficiency('cod'),
        calculateRemovalEfficiency('tds'),
        calculateRemovalEfficiency('tss')
    ];
    
    // Update all charts
    lineChart.update();
    pieChart.update();
    barChart.update();
    
    // Update parameter displays
    updateParameterDisplays();
}

// Calculate treatment efficiency
function calculateTreatmentEfficiency() {
    const waterLevel = parseFloat(document.getElementById('water-level-control').value);
    const soilHumidity = parseFloat(document.getElementById('soil-humidity-control').value);
    
    let optimal = 0, warning = 0, critical = 0;
    
    // Water level efficiency
    if (waterLevel >= 2.0 && waterLevel <= 3.0) optimal++;
    else if (waterLevel >= 1.5 && waterLevel <= 3.5) warning++;
    else critical++;
    
    // Soil humidity efficiency
    if (soilHumidity >= 60 && soilHumidity <= 80) optimal++;
    else if (soilHumidity >= 50 && soilHumidity <= 90) warning++;
    else critical++;
    
    return {
        optimal: optimal * 50,
        warning: warning * 50,
        critical: critical * 50
    };
}

// Calculate removal efficiency for wastewater parameters
function calculateRemovalEfficiency(parameter) {
    const ranges = {
        bod: { min: 85, max: 95 },
        cod: { min: 80, max: 90 },
        tds: { min: 75, max: 85 },
        tss: { min: 90, max: 98 }
    };
    
    return Math.random() * (ranges[parameter].max - ranges[parameter].min) + ranges[parameter].min;
}

// Update parameter displays
function updateParameterDisplays() {
    const data = {
        waterLevel: document.getElementById('water-level-control').value,
        soilHumidity: document.getElementById('soil-humidity-control').value,
        bod: (Math.random() * 50 + 100).toFixed(0),
        cod: (Math.random() * 100 + 250).toFixed(0),
        tds: (Math.random() * 500 + 2000).toFixed(0),
        tss: (Math.random() * 50 + 50).toFixed(0),
        ph: (Math.random() * 1 + 6.5).toFixed(1),
        conductivity: (Math.random() * 200 + 700).toFixed(0)
    };
    
    document.getElementById('water-level').textContent = data.waterLevel + ' m';
    document.getElementById('soil-humidity').textContent = data.soilHumidity + '%';
    document.getElementById('bod').textContent = data.bod + ' mg/L';
    document.getElementById('cod').textContent = data.cod + ' mg/L';
    document.getElementById('tds').textContent = data.tds + ' mg/L';
    document.getElementById('tss').textContent = data.tss + ' mg/L';
    document.getElementById('ph').textContent = data.ph;
    document.getElementById('conductivity').textContent = data.conductivity + ' µS/cm';
    
    // Update status indicators
    updateStatusIndicators(data);
}

// Update status indicators
function updateStatusIndicators(data) {
    const indicators = document.querySelectorAll('.status-indicator');
    indicators.forEach(indicator => {
        const parameter = indicator.parentElement.id;
        const value = parseFloat(data[parameter]);
        let status = 'optimal';

        switch(parameter) {
            case 'waterLevel':
                if (value < 1.5 || value > 3.5) status = 'critical';
                else if (value < 2.0 || value > 3.0) status = 'warning';
                break;
            case 'soilHumidity':
                if (value < 50 || value > 90) status = 'critical';
                else if (value < 60 || value > 80) status = 'warning';
                break;
            case 'ph':
                if (value < 6.0 || value > 8.5) status = 'critical';
                else if (value < 6.5 || value > 8.0) status = 'warning';
                break;
        }

        const colors = {
            optimal: '#2ecc71',
            warning: '#f1c40f',
            critical: '#e74c3c'
        };
        indicator.style.backgroundColor = colors[status];
    });
}

// Update system status
function updateSystemStatus(isActive) {
    const statusText = isActive ? 'System Active' : 'System Inactive';
    const statusColor = isActive ? '#2ecc71' : '#e74c3c';
    document.querySelector('.toggle-group h3').textContent = statusText;
    document.querySelector('.toggle-slider').style.backgroundColor = statusColor;
}

// Initialize the system
updateCharts();
setInterval(updateCharts, 5000);