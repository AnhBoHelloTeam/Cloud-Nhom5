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
            if (result.data.length === 0) {
                itemsList.innerHTML = '<div class="empty-state"><p>Chưa có item nào. Hãy thêm item mới!</p></div>';
            } else {
                result.data.forEach(item => {
                    itemsList.appendChild(createItemCard(item));
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
    card.innerHTML = `
        <div class="item-info">
            <h3>${escapeHtml(item.name)}</h3>
            <p>${escapeHtml(item.description || 'Không có mô tả')}</p>
            <span class="status ${item.status}">${item.status}</span>
            <p style="font-size: 0.85em; color: #999; margin-top: 8px;">
                Tạo: ${new Date(item.created_at).toLocaleString('vi-VN')}
            </p>
        </div>
        <div class="item-actions">
            <button class="btn-edit" onclick="editItem(${item.id})">Sửa</button>
            <button class="btn-delete" onclick="deleteItem(${item.id})">Xóa</button>
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
            
            document.getElementById('form-title').textContent = 'Sửa Item';
            document.getElementById('submit-btn').textContent = 'Cập nhật';
            document.getElementById('cancel-btn').style.display = 'inline-block';
            
            // Scroll to form
            document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
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
    document.getElementById('form-title').textContent = 'Thêm Item Mới';
    document.getElementById('submit-btn').textContent = 'Thêm Item';
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


