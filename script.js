// Tomorrow Recycling Charts Dashboard - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading states for iframes
    const iframes = document.querySelectorAll('.chart-iframe');
    
    iframes.forEach((iframe, index) => {
        // Create loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-indicator';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading Chart ${index + 1}...</p>
        `;
        
        // Insert loading indicator before iframe
        iframe.parentNode.insertBefore(loadingDiv, iframe);
        
        // Hide iframe initially
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.5s ease';
        
        // Show iframe when loaded
        iframe.addEventListener('load', function() {
            loadingDiv.style.display = 'none';
            iframe.style.opacity = '1';
        });
        
        // Handle load errors
        iframe.addEventListener('error', function() {
            loadingDiv.innerHTML = `
                <div class="error-indicator">
                    <p>⚠️ Chart ${index + 1} failed to load</p>
                    <button onclick="location.reload()">Retry</button>
                </div>
            `;
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe chart containers
    document.querySelectorAll('.chart-container').forEach(container => {
        observer.observe(container);
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add responsive iframe resizing
    function resizeIframes() {
        iframes.forEach(iframe => {
            const container = iframe.closest('.chart-wrapper');
            const containerWidth = container.offsetWidth - 60; // Account for padding
            
            if (containerWidth < 797) {
                const scale = containerWidth / 797;
                iframe.style.transform = `scale(${scale})`;
                iframe.style.transformOrigin = 'top left';
                iframe.style.height = `${494 * scale}px`;
            } else {
                iframe.style.transform = 'none';
                iframe.style.height = '494px';
            }
        });
    }
    
    // Initial resize and on window resize
    resizeIframes();
    window.addEventListener('resize', resizeIframes);
    
    // Add print styles
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
});

// Add CSS for loading and animation states
const additionalStyles = `
    .loading-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 494px;
        background: #f8f9fa;
        border-radius: 8px;
        color: #1e73be;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e3f2fd;
        border-top: 4px solid #1e73be;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .error-indicator {
        text-align: center;
        color: #d32f2f;
    }
    
    .error-indicator button {
        background: #1e73be;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 8px;
    }
    
    .error-indicator button:hover {
        background: #0066cc;
    }
    
    .chart-container.animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .keyboard-navigation .chart-container:focus {
        outline: 3px solid #7ed321;
        outline-offset: 2px;
    }
    
    @media print {
        .printing .chart-container {
            break-inside: avoid;
            page-break-inside: avoid;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

