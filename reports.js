// Chart.js default configuration
Chart.defaults.font.family = 'Montserrat, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.plugins.title.font.size = 16;
Chart.defaults.plugins.title.font.weight = '600';

// Responsive chart configuration
const chartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.6,
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

// Initialize Charts
function initializeCharts() {
    // Initialize Performance Charts
    const efficiencyChart = new Chart(document.getElementById('efficiencyChart'), {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Treatment Efficiency',
                data: [92, 88, 95, 90, 93, 89],
                borderColor: '#2E7D32',
                tension: 0.4
            }]
        },
        options: getChartOptions('Percentage')
    });

    // Initialize Comparison Charts
    const treatmentChart = new Chart(document.getElementById('treatmentChart'), {
        type: 'bar',
        data: {
            labels: ['BOD', 'COD', 'TSS', 'pH'],
            datasets: [{
                label: 'Before Treatment',
                data: [1200, 2500, 800, 6.2],
                backgroundColor: '#FF6B6B'
            }, {
                label: 'After Treatment',
                data: [96, 300, 40, 7.2],
                backgroundColor: '#2E7D32'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Initialize Reports Table
    const table = document.querySelector('.modern-table');
    if (table) {
        // Add any table initialization code here
    }

    // Initialize Alerts
    const alerts = document.querySelectorAll('.alert-item');
    alerts.forEach(alert => {
        // Add alert handling code here
    });

    // Add Event Listeners
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            // Add button click handling code here
        });
    });
}

// Export Report Function
function exportReport() {
    // Implementation for exporting reports
    console.log('Exporting report...');
}

// Refresh Data Function
function refreshData() {
    // Implementation for refreshing data
    console.log('Refreshing data...');
}

// Update Date Range Function
function updateDateRange() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    // Implementation for updating date range
    console.log('Updating date range:', startDate, endDate);
}

// Show Help Function
function showHelp(topic) {
    const modal = document.getElementById('helpModal');
    const content = document.getElementById('helpContent');
    
    // Set help content based on topic
    switch(topic) {
        case 'performance':
            content.innerHTML = `
                <h3>Performance Analysis</h3>
                <p>This section shows the treatment efficiency and resource consumption metrics over time.</p>
                <ul>
                    <li>Treatment Efficiency: Shows the percentage of pollutants removed</li>
                    <li>Resource Consumption: Displays water and energy usage</li>
                </ul>
            `;
            break;
        case 'comparison':
            content.innerHTML = `
                <h3>Comparison Analysis</h3>
                <p>Compare treatment results before and after the process.</p>
                <ul>
                    <li>Treatment Comparison: Shows parameter changes</li>
                    <li>Quality Parameters: Displays water quality metrics</li>
                </ul>
            `;
            break;
    }
    
    modal.style.display = 'block';
}

// Close Modal Function
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('helpModal').style.display = 'none';
});

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

// Initialize Performance Charts
function initPerformanceCharts() {
    // Treatment Efficiency Chart
    const efficiencyChart = new Chart(document.getElementById('efficiencyChart'), {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Treatment Efficiency',
                data: [92, 88, 95, 90, 93, 89],
                borderColor: '#2E7D32',
                tension: 0.4
            }]
        },
        options: getChartOptions('Percentage')
    });

    // Energy Consumption Chart
    const consumptionChart = new Chart(document.getElementById('consumptionChart'), {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Energy Consumption',
                data: [1200, 1100, 1300, 1250, 1150, 1400],
                backgroundColor: '#1565C0'
            }]
        },
        options: getChartOptions('kWh')
    });
}

// Get Chart Options
function getChartOptions(unit) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: unit
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw} ${unit}`;
                    }
                }
            }
        }
    };
}

// تهيئة رسوم بيانية الأداء
function initPerformanceCharts() {
    // رسم بياني لكفاءة المعالجة
    const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
    new Chart(efficiencyCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'كفاءة المعالجة',
                data: [85, 88, 90, 92, 95, 97],
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: getChartOptions('النسبة المئوية')
    });

    // رسم بياني لاستهلاك الطاقة
    const energyCtx = document.getElementById('energyChart').getContext('2d');
    new Chart(energyCtx, {
        type: 'bar',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'استهلاك الطاقة',
                data: [1200, 1150, 1100, 1050, 1000, 950],
                backgroundColor: '#1565C0',
                borderRadius: 5
            }]
        },
        options: getChartOptions('كيلوواط/ساعة')
    });

    // رسم بياني لجودة المياه
    const qualityCtx = document.getElementById('qualityChart').getContext('2d');
    new Chart(qualityCtx, {
        type: 'radar',
        data: {
            labels: ['درجة الحموضة', 'المواد الصلبة', 'الأكسجين', 'المواد العضوية', 'المعادن'],
            datasets: [{
                label: 'جودة المياه',
                data: [95, 90, 85, 88, 92],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: '#4CAF50',
                pointBackgroundColor: '#4CAF50'
            }]
        },
        options: getRadarOptions()
    });

    // رسم بياني لتكاليف التشغيل
    const costCtx = document.getElementById('costChart').getContext('2d');
    new Chart(costCtx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'تكاليف التشغيل',
                data: [5000, 4800, 4600, 4500, 4400, 4300],
                borderColor: '#FF6B6B',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: getChartOptions('ريال')
    });
}

// تهيئة رسوم بيانية المقارنة
function initComparisonCharts() {
    // رسم بياني للمقارنة
    const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
    new Chart(comparisonCtx, {
        type: 'bar',
        data: {
            labels: ['المعيار 1', 'المعيار 2', 'المعيار 3', 'المعيار 4'],
            datasets: [{
                label: 'قيمتنا',
                data: [85, 90, 88, 92],
                backgroundColor: '#2E7D32'
            }, {
                label: 'المعيار العالمي',
                data: [80, 85, 82, 88],
                backgroundColor: '#1565C0'
            }]
        },
        options: getComparisonOptions()
    });

    // رسم بياني للاتجاهات
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'أداؤنا',
                data: [75, 80, 85, 90],
                borderColor: '#2E7D32',
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'المتوسط العالمي',
                data: [70, 75, 80, 85],
                borderColor: '#1565C0',
                backgroundColor: 'rgba(21, 101, 192, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: getChartOptions('النسبة المئوية')
    });
}

// تهيئة جدول التقارير
function initReportTable() {
    const tableBody = document.querySelector('.report-table tbody');
    const sampleData = [
        { date: '2024-01-15', parameter: 'درجة الحموضة', value: '7.2', status: 'جيد', notes: 'ضمن النطاق المطلوب' },
        { date: '2024-01-15', parameter: 'المواد الصلبة', value: '150 mg/L', status: 'جيد', notes: 'أقل من الحد المسموح' },
        { date: '2024-01-15', parameter: 'الأكسجين', value: '6.5 mg/L', status: 'ممتاز', notes: 'أعلى من الحد الأدنى' },
        { date: '2024-01-15', parameter: 'المواد العضوية', value: '25 mg/L', status: 'جيد', notes: 'ضمن النطاق المطلوب' }
    ];

    sampleData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.parameter}</td>
            <td>${item.value}</td>
            <td><span class="status-badge ${getStatusClass(item.status)}">${item.status}</span></td>
            <td>${item.notes}</td>
        `;
        tableBody.appendChild(row);
    });
}

// تهيئة التنبيهات
function initAlerts() {
    const alertsList = document.querySelector('.alerts-list');
    const sampleAlerts = [
        { type: 'warning', message: 'انخفاض في ضغط النظام' },
        { type: 'success', message: 'تم إكمال الصيانة الدورية' },
        { type: 'error', message: 'ارتفاع في درجة الحرارة' }
    ];

    sampleAlerts.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.className = `alert-item ${alert.type}`;
        alertItem.innerHTML = `
            <i class="fas ${getAlertIcon(alert.type)}"></i>
            <span>${alert.message}</span>
        `;
        alertsList.appendChild(alertItem);
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمعي الأزرار
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // هنا يمكنك إضافة منطق لتبديل محتوى التبويبات
        });
    });

    // مستمعي التصفية
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            // هنا يمكنك إضافة منطق لتحديث البيانات بناءً على التصفية
            console.log(`${this.className} changed to ${this.value}`);
        });
    });

    // مستمعي الأزرار
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('export-btn')) {
                exportReport();
            } else if (this.classList.contains('print-btn')) {
                printReport();
            } else if (this.classList.contains('share-btn')) {
                shareReport();
            } else if (this.classList.contains('refresh-btn')) {
                refreshData();
            }
        });
    });
}

function getRadarOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                rtl: true
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    };
}

function getComparisonOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                rtl: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    };
}

function getStatusClass(status) {
    switch(status) {
        case 'جيد':
            return 'success';
        case 'ممتاز':
            return 'success';
        case 'تحذير':
            return 'warning';
        case 'خطير':
            return 'error';
        default:
            return '';
    }
}

function getAlertIcon(type) {
    switch(type) {
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'error':
            return 'fa-times-circle';
        case 'success':
            return 'fa-check-circle';
        default:
            return 'fa-info-circle';
    }
}

// وظائف الأزرار
function printReport() {
    window.print();
}

function shareReport() {
    // هنا يمكنك إضافة منطق مشاركة التقرير
    console.log('مشاركة التقرير');
}

// Handle window resize
function handleResize() {
    Chart.instances.forEach(chart => {
        chart.resize();
    });
}

// Date range handling
function changeDateRange(range) {
    const buttons = document.querySelectorAll('.date-range button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
    updateChartsData(range);
}

// Update charts data based on date range
function updateChartsData(range) {
    // Implement data update logic based on selected range
    console.log(`Updating charts for ${range} range`);
}

// Power Consumption Chart
function initializePowerChart() {
    const ctx = document.getElementById('powerConsumptionChart').getContext('2d');
    const data = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [{
            label: 'Power Consumption',
            data: [45, 50, 65, 75, 60, 55],
            borderColor: '#FF9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            ...chartConfig,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Power (kW)'
                    }
                }
            }
        }
    });
}

// Humidity Chart
function initializeHumidityChart() {
    const ctx = document.getElementById('humidityChart').getContext('2d');
    const data = {
        labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00'],
        datasets: [{
            label: 'Soil Humidity',
            data: [65, 63, 68, 64, 66, 65],
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            fill: true
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            ...chartConfig,
            scales: {
                y: {
                    min: 50,
                    max: 80,
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    }
                }
            }
        }
    });
}

// Water Level Chart
function initializeWaterLevelChart() {
    const ctx = document.getElementById('waterLevelChart').getContext('2d');
    const data = {
        labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00'],
        datasets: [{
            label: 'Clean Water Level',
            data: [75, 72, 70, 68, 65, 63],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: true
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            ...chartConfig,
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Level (%)'
                    }
                }
            }
        }
    });
}

// Update power meter
function updatePowerMeter(power) {
    const gauge = document.getElementById('power-gauge');
    const value = document.getElementById('current-power');
    const percentage = Math.min((power / 100) * 100, 100);
    
    gauge.style.width = `${percentage}%`;
    value.textContent = `${power.toFixed(1)} kW`;
    
    // Update gauge color based on power level
    if (power > 80) {
        gauge.style.backgroundColor = '#f44336';
    } else if (power > 60) {
        gauge.style.backgroundColor = '#ff9800';
    } else {
        gauge.style.backgroundColor = '#4caf50';
    }
}

// Update plant monitoring data
function refreshPlantData() {
    const refreshButton = event.target;
    refreshButton.disabled = true;
    refreshButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    
    // Simulate data refresh
    setTimeout(() => {
        refreshButton.disabled = false;
        refreshButton.innerHTML = '<i class="fas fa-sync"></i> Refresh Data';
        
        // Update humidity and water level
        const humidity = 60 + Math.random() * 20;
        const waterLevel = 60 + Math.random() * 30;
        
        document.getElementById('current-humidity').textContent = `${humidity.toFixed(1)}%`;
        document.getElementById('current-water-level').textContent = `${waterLevel.toFixed(1)}%`;
        
        // Update charts
        Chart.instances.forEach(chart => {
            if (chart.canvas.id === 'humidityChart' || chart.canvas.id === 'waterLevelChart') {
                chart.data.datasets[0].data = chart.data.datasets[0].data.map(() => 
                    chart.canvas.id === 'humidityChart' ? 60 + Math.random() * 20 : 60 + Math.random() * 30
                );
                chart.update();
            }
        });
    }, 1500);
}

// Initialize all charts
document.addEventListener('DOMContentLoaded', () => {
    initializeEfficiencyChart();
    initializeResourceChart();
    initializePowerChart();
    initializeHumidityChart();
    initializeWaterLevelChart();
    initializeComparisonChart();
    initializeQualityChart();
    
    // Add window resize handler for responsive charts
    window.addEventListener('resize', handleResize);
    
    // Initialize power meter
    updatePowerMeter(45);
}); 