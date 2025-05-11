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
    const subscriptionDetail = document.getElementById('loyalty-details');
    const modal = document.getElementById('loyalty-modal');
    const closeButtons = document.querySelectorAll('.close-btn, .close-modal, .modal-backdrop');
    const benefitsList = document.querySelector('.benefits-list');

    // Initialize benefits
    let currentBenefitIndex = 0;
    
    // Create benefit elements
    loyaltyBenefits.forEach((benefit, index) => {
        const benefitElement = document.createElement('div');
        benefitElement.className = `benefit ${index === 0 ? 'active' : ''}`;
        benefitElement.innerHTML = `+${benefit.title}`;
        benefitContainer.appendChild(benefitElement);
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

    // Rotate benefits every 5 seconds
    function rotateBenefits() {
        const benefits = document.querySelectorAll('.benefit');
        
        // Remove active class from current benefit
        benefits[currentBenefitIndex].classList.remove('active');
        
        // Update index
        currentBenefitIndex = (currentBenefitIndex + 1) % benefits.length;
        
        // Add active class to new current benefit
        benefits[currentBenefitIndex].classList.add('active');
    }

    // Start rotating benefits
    const benefitInterval = setInterval(rotateBenefits, 5000);

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