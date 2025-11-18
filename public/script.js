const API_URL = window.location.origin + '/api';

// Load items on page load
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    
    document.getElementById('item-form').addEventListener('submit', handleSubmit);
});

// Load all items
async function loadItems() {
    const loading = document.getElementById('loading');
    const itemsList = document.getElementById('items-list');
    
    loading.style.display = 'block';
    itemsList.innerHTML = '';
    
    try {
        const response = await fetch(`${API_URL}/items`);
        const result = await response.json();
        
        loading.style.display = 'none';
        
        if (result.success) {
            updateTotalItems(result.data.length);
            if (result.data.length === 0) {
                itemsList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📭</div>
                        <p>Chưa có item nào. Hãy thêm item mới!</p>
                    </div>
                `;
            } else {
                result.data.forEach((item, index) => {
                    const card = createItemCard(item);
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.style.opacity = '0';
                    card.style.animation = 'slideUp 0.5s ease-out forwards';
                    itemsList.appendChild(card);
                });
            }
        } else {
            showError('Lỗi khi tải danh sách items: ' + result.error);
        }
    } catch (error) {
        loading.style.display = 'none';
        showError('Lỗi kết nối: ' + error.message);
    }
}

// Create item card element
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    const statusIcons = {
        active: '✅',
        inactive: '⏸️',
        pending: '⏳'
    };
    
    const statusLabels = {
        active: 'Active',
        inactive: 'Inactive',
        pending: 'Pending'
    };
    
    card.innerHTML = `
        <div class="item-info">
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.description || 'Không có mô tả')}</p>
            <span class="status ${item.status}">
                ${statusIcons[item.status] || '⚪'} ${statusLabels[item.status] || item.status}
            </span>
            <div class="item-meta">
                <span>📅 ${new Date(item.created_at).toLocaleDateString('vi-VN')}</span>
                <span>🕐 ${new Date(item.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
        <div class="item-actions">
            <button class="btn-edit" onclick="editItem(${item.id})">
                <span>✏️</span>
                <span>Sửa</span>
            </button>
            <button class="btn-delete" onclick="deleteItem(${item.id})">
                <span>🗑️</span>
                <span>Xóa</span>
            </button>
        </div>
    `;
    return card;
}

// Handle form submit
async function handleSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('item-id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    
    const itemData = { name, description, status };
    
    try {
        let response;
        if (id) {
            // Update
            response = await fetch(`${API_URL}/items/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });
        } else {
            // Create
            response = await fetch(`${API_URL}/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData)
            });
        }
        
        const result = await response.json();
        
        if (result.success) {
            showSuccess(id ? 'Cập nhật item thành công!' : 'Thêm item thành công!');
            resetForm();
            loadItems();
        } else {
            showError('Lỗi: ' + result.error);
        }
    } catch (error) {
        showError('Lỗi kết nối: ' + error.message);
    }
}

// Update total items count
function updateTotalItems(count) {
    const totalItemsEl = document.getElementById('total-items');
    if (totalItemsEl) {
        totalItemsEl.textContent = count;
        // Animate number change
        totalItemsEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            totalItemsEl.style.transform = 'scale(1)';
        }, 200);
    }
}

// Edit item
async function editItem(id) {
    try {
        const response = await fetch(`${API_URL}/items/${id}`);
        const result = await response.json();
        
        if (result.success) {
            const item = result.data;
            document.getElementById('item-id').value = item.id;
            document.getElementById('name').value = item.name;
            document.getElementById('description').value = item.description || '';
            document.getElementById('status').value = item.status;
            
            const formTitle = document.getElementById('form-title');
            formTitle.innerHTML = '<span class="icon">✏️</span> Sửa Item';
            
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.querySelector('.btn-text').textContent = 'Cập nhật';
            
            document.getElementById('cancel-btn').style.display = 'flex';
            
            // Scroll to form
            document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            showError('Lỗi khi tải item: ' + result.error);
        }
    } catch (error) {
        showError('Lỗi kết nối: ' + error.message);
    }
}

// Delete item
async function deleteItem(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa item này?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/items/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccess('Xóa item thành công!');
            loadItems();
        } else {
            showError('Lỗi: ' + result.error);
        }
    } catch (error) {
        showError('Lỗi kết nối: ' + error.message);
    }
}

// Cancel edit
function cancelEdit() {
    resetForm();
}

// Reset form
function resetForm() {
    document.getElementById('item-form').reset();
    document.getElementById('item-id').value = '';
    
    const formTitle = document.getElementById('form-title');
    formTitle.innerHTML = '<span class="icon">➕</span> Thêm Item Mới';
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.querySelector('.btn-text').textContent = 'Thêm Item';
    
    document.getElementById('cancel-btn').style.display = 'none';
}

// Show error message
function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    container.insertBefore(errorDiv, container.firstChild);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

// Show success message
function showSuccess(message) {
    const container = document.querySelector('.container');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    container.insertBefore(successDiv, container.firstChild);
    
    setTimeout(() => successDiv.remove(), 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


