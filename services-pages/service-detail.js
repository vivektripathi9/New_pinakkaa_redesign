// Service Detail Page Handler
document.addEventListener('DOMContentLoaded', function() {
    // Get service ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    
    if (!serviceId) {
        // Redirect to services page if no service ID
        window.location.href = 'services.html';
        return;
    }
    
    // Check if servicesData is available
    if (typeof servicesData === 'undefined') {
        console.error('servicesData is not defined. Make sure services-pages.js is loaded before service-detail.js');
        return;
    }
    
    // Find service data
    const service = servicesData.find(s => s.id === serviceId);
    
    if (!service) {
        console.error('Service not found:', serviceId);
        // Redirect if service not found
        window.location.href = 'services.html';
        return;
    }
    
    console.log('Service found:', service.title);
    console.log('Features:', service.features);
    console.log('Benefits:', service.benefits);
    console.log('FAQs:', service.faqs);
    
    // Update page title
    document.title = `${service.title} - Pinakkaa`;
    
    // Update hero section
    const serviceTitleText = document.getElementById('serviceTitleText');
    const serviceBreadcrumbName = document.getElementById('serviceBreadcrumbName');
    const serviceDetailSubtitle = document.getElementById('serviceDetailSubtitle');
    
    if (serviceTitleText) {
        serviceTitleText.textContent = service.title;
    }
    
    if (serviceBreadcrumbName) {
        serviceBreadcrumbName.textContent = service.title;
    }
    
    if (serviceDetailSubtitle) {
        serviceDetailSubtitle.textContent = service.shortDescription;
    }
    
    // Update service video/image
    const serviceVideoSrc = document.getElementById('serviceVideoSrc');
    const serviceImageSrc = document.getElementById('serviceImageSrc');
    const serviceBannerSlogan = document.getElementById('serviceBannerSlogan');
    
    if (serviceVideoSrc && serviceImageSrc) {
        if (service.video) {
            // Use video if available
            const source = serviceVideoSrc.querySelector('source');
            if (source) {
                source.src = service.video;
                serviceVideoSrc.load();
            }
            serviceVideoSrc.setAttribute('aria-label', service.title);
            serviceVideoSrc.style.display = 'block';
            serviceImageSrc.style.display = 'none';
        } else if (service.image) {
            // Fallback to image if no video
            serviceImageSrc.src = service.image;
            serviceImageSrc.alt = service.title;
            serviceImageSrc.style.display = 'block';
            serviceVideoSrc.style.display = 'none';
        }
    }
    
    // Update banner slogan
    if (serviceBannerSlogan && service.bannerSlogan) {
        serviceBannerSlogan.textContent = service.bannerSlogan;
        serviceBannerSlogan.style.display = 'block';
    } else if (serviceBannerSlogan) {
        serviceBannerSlogan.style.display = 'none';
    }
    
    // Update service description
    const serviceDetailDescription = document.getElementById('serviceDetailDescription');
    if (serviceDetailDescription) {
        serviceDetailDescription.innerHTML = `
            <p>${service.fullDescription}</p>
        `;
    }
    
    // Helper function to check if feature/benefit is object or string
    const isObject = (item) => typeof item === 'object' && item !== null && !Array.isArray(item) && item.hasOwnProperty('title');
    
    // Update features
    const serviceFeatures = document.getElementById('serviceFeatures');
    if (serviceFeatures && service.features && service.features.length > 0) {
        const firstFeature = service.features[0];
        const useGridLayout = isObject(firstFeature);
        
        // Limit to 4 features max and shorten descriptions
        const limitedFeatures = service.features.slice(0, 4);
        const featuresHTML = limitedFeatures.map((feature, index) => {
            if (isObject(feature)) {
                // Shorten description to max 100 characters
                const shortDesc = feature.description.length > 100 
                    ? feature.description.substring(0, 100) + '...' 
                    : feature.description;
                return `
                    <div class="feature-item fade-in" style="animation-delay: ${index * 0.1}s">
                        <div class="feature-header">
                            <h4 class="feature-title">${feature.title}</h4>
                        </div>
                        <p class="feature-description">${shortDesc}</p>
                    </div>
                `;
            } else {
                return `<li class="fade-in" style="animation-delay: ${index * 0.1}s">${feature}</li>`;
            }
        }).join('');
        
        serviceFeatures.innerHTML = `
            <h3><span class="text-purple">Key</span> Features</h3>
            ${useGridLayout ? `<div class="features-grid">${featuresHTML}</div>` : `<ul>${featuresHTML}</ul>`}
        `;
        
        // Make sure it's visible
        serviceFeatures.style.display = 'block';
        serviceFeatures.style.opacity = '1';
    } else if (serviceFeatures) {
        serviceFeatures.innerHTML = '<p>Features information coming soon.</p>';
    }
    
    // Update benefits
    const serviceBenefits = document.getElementById('serviceBenefits');
    if (serviceBenefits && service.benefits && service.benefits.length > 0) {
        const firstBenefit = service.benefits[0];
        const useGridLayout = isObject(firstBenefit);
        
        // Limit to 4 benefits max and shorten descriptions
        const limitedBenefits = service.benefits.slice(0, 4);
        const benefitsHTML = limitedBenefits.map((benefit, index) => {
            if (isObject(benefit)) {
                // Shorten description to max 100 characters
                const shortDesc = benefit.description.length > 100 
                    ? benefit.description.substring(0, 100) + '...' 
                    : benefit.description;
                return `
                    <div class="benefit-item fade-in" style="animation-delay: ${index * 0.1}s">
                        <div class="benefit-header">
                            <h4 class="benefit-title">${benefit.title}</h4>
                        </div>
                        <p class="benefit-description">${shortDesc}</p>
                    </div>
                `;
            } else {
                return `<li class="fade-in" style="animation-delay: ${index * 0.1}s">${benefit}</li>`;
            }
        }).join('');
        
        serviceBenefits.innerHTML = `
            <h3><span class="text-purple">Key</span> Benefits</h3>
            ${useGridLayout ? `<div class="benefits-grid">${benefitsHTML}</div>` : `<ul>${benefitsHTML}</ul>`}
        `;
        
        // Make sure it's visible
        serviceBenefits.style.display = 'block';
        serviceBenefits.style.opacity = '1';
    } else if (serviceBenefits) {
        serviceBenefits.innerHTML = '<p>Benefits information coming soon.</p>';
    }
    
    // Update FAQ
    const serviceFAQ = document.getElementById('serviceFAQ');
    if (serviceFAQ && service.faqs && service.faqs.length > 0) {
        serviceFAQ.innerHTML = `
            <h3><span class="text-purple">Frequently Asked</span> Questions</h3>
            <div class="faq-container">
                ${service.faqs.map((faq, index) => `
                    <div class="faq-item fade-in" style="animation-delay: ${index * 0.1}s">
                        <div class="faq-question">
                            <h4>${faq.question}</h4>
                            <span class="faq-icon">+</span>
                        </div>
                        <div class="faq-answer">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Make sure it's visible
        serviceFAQ.style.display = 'block';
        serviceFAQ.style.opacity = '1';
        
        // Initialize FAQ accordion after a short delay to ensure DOM is ready
        setTimeout(() => {
            initializeFAQ();
        }, 100);
    } else if (serviceFAQ) {
        serviceFAQ.innerHTML = '<p>FAQ information coming soon.</p>';
    }
    
    // Update sidebar services list
    const sidebarServicesList = document.getElementById('sidebarServicesList');
    if (sidebarServicesList) {
        // Get other services (exclude current)
        const otherServices = servicesData.filter(s => s.id !== serviceId).slice(0, 5);
        
        sidebarServicesList.innerHTML = otherServices.map(s => 
            `<li><a href="service-detail.html?service=${s.id}">${s.title}</a></li>`
        ).join('');
    }
    
    // Load related services section
    loadRelatedServices(service);
    
    // Ensure content sections are visible
    const contentSections = document.querySelectorAll('.service-features, .service-benefits, .service-faq');
    contentSections.forEach(section => {
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
    
    // Add fade-in animation with scroll observer
    const elements = document.querySelectorAll('.service-detail-main, .service-detail-sidebar');
    elements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`;
        el.style.opacity = '1';
    });
    
    // Initialize scroll observer for animations (but don't hide content)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
    
    // Add interactive features to features and benefits lists
    const listItems = document.querySelectorAll('.service-features li, .service-benefits li');
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 50);
        
        // Add click interaction
        item.addEventListener('click', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateX(0) scale(1)';
            }, 200);
        });
    });
    
    // Add image zoom effect
    const serviceImage = document.getElementById('serviceImageSrc');
    if (serviceImage) {
        serviceImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        serviceImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add sidebar card animations
    const sidebarCards = document.querySelectorAll('.service-sidebar-card');
    sidebarCards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Initialize scroll progress
    const addScrollProgress = () => {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    addScrollProgress();
});

// Load Related Services Section
function loadRelatedServices(currentService) {
    const relatedServicesSection = document.getElementById('relatedServicesSection');
    if (!relatedServicesSection) return;
    
    // Get other services with videos only (exclude current) and limit to 6
    const otherServices = servicesData
        .filter(s => s.id !== currentService.id && s.video)
        .slice(0, 6);
    
    if (otherServices.length === 0) {
        relatedServicesSection.style.display = 'none';
        return;
    }
    
    relatedServicesSection.innerHTML = `
        <h3 class="related-services-title">
            <span class="text-purple">Explore</span> Other Services
        </h3>
        <div class="related-services-grid">
            ${otherServices.map((service, index) => `
                <a href="service-detail.html?service=${service.id}" class="related-service-card fade-in" style="animation-delay: ${index * 0.1}s">
                    <div class="related-service-image">
                        ${service.video ? `
                            <video autoplay loop muted playsinline>
                                <source src="${service.video}" type="video/mp4">
                            </video>
                        ` : service.image ? `
                            <img src="${service.image}" alt="${service.title}">
                        ` : ''}
                    </div>
                    <div class="related-service-content">
                        <h4 class="related-service-name">${service.title}</h4>
                        <p class="related-service-description">${service.shortDescription}</p>
                        <span class="related-service-link">Learn More →</span>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
    
    // Make sure it's visible
    relatedServicesSection.style.display = 'block';
    relatedServicesSection.style.opacity = '1';
}

// FAQ Accordion Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        // Set initial state
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        item.classList.remove('active');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                    otherIcon.textContent = '+';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                icon.textContent = '−';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}
