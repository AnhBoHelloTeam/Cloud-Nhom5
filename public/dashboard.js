const API_URL = window.location.origin + '/api';

let statusChart = null;
let timeChart = null;

// Load dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    checkApiHealth();
    setInterval(checkApiHealth, 30000); // Check every 30 seconds
});

// Load all statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/items`);
        const result = await response.json();
        
        if (result.success) {
            const items = result.data;
            updateStats(items);
            updateCharts(items);
            updateRecentItems(items);
            updateQuickStats(items);
        } else {
            showError('Lỗi khi tải dữ liệu: ' + result.error);
        }
    } catch (error) {
        showError('Lỗi kết nối: ' + error.message);
    }
}

// Update statistics cards
function updateStats(items) {
    const total = items.length;
    const active = items.filter(item => item.status === 'active').length;
    const pending = items.filter(item => item.status === 'pending').length;
    const inactive = items.filter(item => item.status === 'inactive').length;

    animateNumber('total-items-stat', total);
    animateNumber('active-items-stat', active);
    animateNumber('pending-items-stat', pending);
    animateNumber('inactive-items-stat', inactive);
}

// Animate number change
function animateNumber(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const currentValue = parseInt(element.textContent) || 0;
    const increment = value > currentValue ? 1 : -1;
    const duration = 500;
    const steps = Math.abs(value - currentValue);
    const stepDuration = duration / steps;

    let current = currentValue;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === value) {
            clearInterval(timer);
        }
    }, stepDuration);
}

// Update charts
function updateCharts(items) {
    updateStatusChart(items);
    updateTimeChart(items);
}

// Status distribution chart
function updateStatusChart(items) {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;

    const statusCounts = {
        active: items.filter(item => item.status === 'active').length,
        inactive: items.filter(item => item.status === 'inactive').length,
        pending: items.filter(item => item.status === 'pending').length
    };

    if (statusChart) {
        statusChart.destroy();
    }

    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Inactive', 'Pending'],
            datasets: [{
                data: [statusCounts.active, statusCounts.inactive, statusCounts.pending],
                backgroundColor: [
                    '#10b981',
                    '#ef4444',
                    '#f59e0b'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            weight: '600'
                        }
                    }
                }
            }
        }
    });
}

// Time-based chart
function updateTimeChart(items) {
    const ctx = document.getElementById('timeChart');
    if (!ctx) return;

    // Group items by date
    const itemsByDate = {};
    items.forEach(item => {
        const date = new Date(item.created_at).toLocaleDateString('vi-VN');
        itemsByDate[date] = (itemsByDate[date] || 0) + 1;
    });

    const dates = Object.keys(itemsByDate).sort();
    const counts = dates.map(date => itemsByDate[date]);

    if (timeChart) {
        timeChart.destroy();
    }

    timeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Items Created',
                data: counts,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Update recent items
function updateRecentItems(items) {
    const recentItemsContainer = document.getElementById('recent-items');
    if (!recentItemsContainer) return;

    const recentItems = items
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    if (recentItems.length === 0) {
        recentItemsContainer.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 20px;">Chưa có items nào</p>';
        return;
    }

    recentItemsContainer.innerHTML = recentItems.map(item => {
        const statusColors = {
            active: { bg: '#d1fae5', color: '#065f46' },
            inactive: { bg: '#fee2e2', color: '#991b1b' },
            pending: { bg: '#fef3c7', color: '#92400e' }
        };
        const statusStyle = statusColors[item.status] || statusColors.active;

        return `
            <div class="recent-item">
                <div class="recent-item-info">
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>${new Date(item.created_at).toLocaleString('vi-VN')}</p>
                </div>
                <span class="recent-item-status" style="background: ${statusStyle.bg}; color: ${statusStyle.color};">
                    ${item.status}
                </span>
            </div>
        `;
    }).join('');
}

// Update quick statistics
function updateQuickStats(items) {
    const active = items.filter(item => item.status === 'active').length;
    const total = items.length;
    const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0;

    document.getElementById('active-percentage').textContent = `${activePercentage}%`;

    // Items today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayItems = items.filter(item => {
        const itemDate = new Date(item.created_at);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
    }).length;
    document.getElementById('today-items').textContent = todayItems;

    // Items this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekItems = items.filter(item => new Date(item.created_at) >= weekAgo).length;
    document.getElementById('week-items').textContent = weekItems;

    // Last update
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleTimeString('vi-VN');
}

// Check API health
async function checkApiHealth() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const result = await response.json();
        
        const statusEl = document.getElementById('api-status');
        if (statusEl) {
            if (result.success) {
                statusEl.textContent = 'Healthy';
                statusEl.className = 'info-value healthy';
            } else {
                statusEl.textContent = 'Error';
                statusEl.className = 'info-value error';
            }
        }
    } catch (error) {
        const statusEl = document.getElementById('api-status');
        if (statusEl) {
            statusEl.textContent = 'Error';
            statusEl.className = 'info-value error';
        }
    }
}

// Show error message
function showError(message) {
    const container = document.querySelector('.main-content');
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        background: #fee2e2;
        color: #991b1b;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 20px;
        border: 2px solid #fecaca;
    `;
    errorDiv.textContent = message;
    container.insertBefore(errorDiv, container.firstChild);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

