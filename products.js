function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';
    
    const paginatedProducts = productsToRender.slice(startIndex, endIndex);
    
    if (paginatedProducts.length === 0) {
        productsGrid.innerHTML = '<p class="no-results">No products found. Try different filters.</p>';
        return;
    }
    
    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product-details.html?id=${product.id}" class="product-image-link">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </a>
            <div class="product-info">
                <h3 class="product-title"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-outline">View Details</a>
                    <button class="btn btn-sm btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}


// Product Details Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery
    function changeImage(src) {
        document.getElementById('mainImage').src = src;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }

    // Quantity Selector
    function updateQuantity(change) {
        const quantityInput = document.getElementById('quantity');
        let newValue = parseInt(quantityInput.value) + change;
        if (newValue < 1) newValue = 1;
        quantityInput.value = newValue;
    }

    // Tab Switching
    const tabLinks = document.querySelectorAll('.tabs-nav li');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabLinks.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Star Rating for Reviews
    const stars = document.querySelectorAll('.star-rating i');
    let currentRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateStarRating(currentRating);
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            updateStarRating(hoverRating, true);
        });
        
        star.addEventListener('mouseout', function() {
            updateStarRating(currentRating);
        });
    });
    
    function updateStarRating(rating, isHover = false) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add(isHover ? 'hover' : 'active');
                star.classList.remove(isHover ? 'active' : 'hover');
            } else {
                star.classList.remove('active', 'hover');
            }
        });
    }

    // Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (currentRating === 0) {
                alert('Please select a rating');
                return;
            }
            
            const reviewText = document.getElementById('reviewText').value;
            if (!reviewText.trim()) {
                alert('Please write your review');
                return;
            }
            
            // In a real app, you would send this to your backend
            alert('Thank you for your review!');
            reviewForm.reset();
            updateStarRating(0);
        });
    }

    // Add to Cart Functionality
    window.addToCart = function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        // In a real app, you would add the product to cart
        alert(`Added ${quantity} item(s) to your cart`);
        
        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + quantity;
        }
    };

    // Make global functions available
    window.changeImage = changeImage;
    window.updateQuantity = updateQuantity;
});
