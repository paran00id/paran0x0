
if (document.getElementById('particles-js')) {
    particlesJS.load('particles-js', 'assets/particles-config.json');
}


document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
        });

        document.querySelectorAll('#mobileNav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }

    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .section-title');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll();
});

const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            const items = document.querySelectorAll('.gpu-card');
            items.forEach(item => {
                item.style.display = filter === 'all' || item.dataset.category === filter ? 'flex' : 'none';
            });
        });
    });
}

const compareButtons = document.querySelectorAll('.compare-btn');
const modal = document.getElementById('comparatorModal');
const closeModal = document.querySelector('.close-modal');
const compareLimitMessage = document.getElementById('compareLimitMessage');

if (compareButtons.length > 0 && modal && closeModal) {
    let gpuCount = 0;
    let selectedGPUs = [];

    compareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            
            if (gpuCount >= 2) {
                if (compareLimitMessage) {
                    compareLimitMessage.style.display = 'block';
                    setTimeout(() => compareLimitMessage.style.display = 'none', 3000);
                }
                return;
            }

            const gpuId = btn.dataset.gpu;
            const gpuCard = btn.closest('.gpu-card');
            if (gpuCard && !selectedGPUs.includes(gpuId)) {
           
                const clone = gpuCard.cloneNode(true);
                const iframe = clone.querySelector('iframe');
                if (iframe) {
                    const src = iframe.src;
                    iframe.remove();
                    const newIframe = document.createElement('iframe');
                    newIframe.src = src;
                    newIframe.width = '100%';
                    newIframe.height = '300px';
                    newIframe.loading = 'lazy';
                    clone.querySelector('.gpu-model').appendChild(newIframe);
                }
                clone.querySelector('.compare-btn')?.remove();
                clone.querySelector('.detail-btn')?.remove();

              
                selectedGPUs.push(gpuId);
                gpuCount++;

             
                if (gpuCount === 1) {
                    document.getElementById('gpu1').appendChild(clone);
                    
                } else if (gpuCount === 2) {
                    document.getElementById('gpu2').appendChild(clone);
                    modal.classList.add('active');
                }
            }
        });
    });

    const resetComparison = () => {
        modal.classList.remove('active');
        document.getElementById('gpu1').innerHTML = '';
        document.getElementById('gpu2').innerHTML = '';
        gpuCount = 0;
        selectedGPUs = [];
    };

    closeModal.addEventListener('click', resetComparison);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            resetComparison();
        }
    });
}

const detailButtons = document.querySelectorAll('.detail-btn');
const detailModals = document.querySelectorAll('.detail-modal');
const closeDetails = document.querySelectorAll('.close-detail');

if (detailButtons.length > 0 && detailModals.length > 0 && closeDetails.length > 0) {
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    closeDetails.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.detail-modal').classList.remove('active');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            detailModals.forEach(modal => modal.classList.remove('active'));
        }
    });
}