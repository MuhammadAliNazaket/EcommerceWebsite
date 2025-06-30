//   for product page
  // Star Rating Interaction
        const stars = document.querySelectorAll('.star-rating .star');
        let selectedRating = 0;
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                selectedRating = value;
                
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const value = parseInt(this.getAttribute('data-value'));
                
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.style.color = '#f39c12';
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                stars.forEach((s, index) => {
                    if (index >= selectedRating) {
                        s.style.color = '#ddd';
                    }
                });
            });
        });
        
        // Quantity Selector
        const minusBtn = document.querySelector('.quantity-selector .btn-outline:first-child');
        const plusBtn = document.querySelector('.quantity-selector .btn-outline:last-child');
        const quantityInput = document.querySelector('.quantity-selector input');
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });

