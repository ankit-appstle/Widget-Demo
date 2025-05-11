document.addEventListener('DOMContentLoaded', function() {
    // Define loyalty benefits
    const loyaltyBenefits = [
        {
            id: 1,
            title: "Free Testosterone Optimization E-book 📚",
            description: "A comprehensive guide to optimize your health"
        },
        {
            id: 2,
            title: "10% Discount on Next Purchase 🏷️",
            description: "Save on your next order with us"
        },
        {
            id: 3,
            title: "Free Health Consultation 🩺",
            description: "30-minute session with our experts"
        }
    ];

    // DOM elements
    const options = document.querySelectorAll('.option');
    const benefitContainer = document.querySelector('.benefit-container');
    const paginationDotsContainer = document.querySelector('.pagination-dots');
    const subscriptionDetail = document.getElementById('subscription-detail');
    const modal = document.getElementById('loyalty-modal');
    const closeButtons = document.querySelectorAll('.close-btn, .close-modal, .modal-backdrop');
    const benefitsList = document.querySelector('.benefits-list');

    // Initialize benefits
    let currentBenefitIndex = 0;
    let benefitInterval;
    
    // Create benefit elements
    loyaltyBenefits.forEach((benefit, index) => {
        const benefitElement = document.createElement('div');
        benefitElement.className = `benefit ${index === 0 ? 'active' : ''}`;
        benefitElement.innerHTML = `+${benefit.title}`;
        benefitContainer.appendChild(benefitElement);
        
        // Create pagination dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        paginationDotsContainer.appendChild(dot);
    });

    // Create benefit items in modal
    loyaltyBenefits.forEach(benefit => {
        const benefitItem = document.createElement('div');
        benefitItem.className = 'benefit-item';
        benefitItem.innerHTML = `
            <h4>${benefit.title}</h4>
            <p>${benefit.description}</p>
        `;
        benefitsList.appendChild(benefitItem);
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });

    // Function to show a specific benefit
    function showBenefit(index) {
        const benefits = document.querySelectorAll('.benefit');
        const dots = document.querySelectorAll('.dot');
        
        // Remove active class from all benefits and dots
        benefits.forEach(benefit => benefit.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to selected benefit and dot
        benefits[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current index
        currentBenefitIndex = index;
    }

    // Rotate benefits every 5 seconds
    function startRotation() {
        benefitInterval = setInterval(() => {
            const nextIndex = (currentBenefitIndex + 1) % loyaltyBenefits.length;
            showBenefit(nextIndex);
        }, 5000);
    }

    // Start rotating benefits
    startRotation();

    // Handle pagination dot clicks
    paginationDotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dot')) {
            // Clear the interval to prevent conflicts
            clearInterval(benefitInterval);
            
            // Show the clicked benefit
            const index = parseInt(e.target.dataset.index);
            showBenefit(index);
            
            // Restart the rotation
            startRotation();
        }
    });

    // Open modal when subscription detail is clicked
    subscriptionDetail.addEventListener('click', function() {
        modal.classList.add('active');
    });

    // Close modal when close buttons are clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Cleanup interval on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(benefitInterval);
    });
});