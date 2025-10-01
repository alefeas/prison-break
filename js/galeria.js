document.addEventListener('DOMContentLoaded', function () {
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryDots = document.getElementById('galleryDots');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt
        };
    });

    function createDots() {
        galleryDots.innerHTML = '';
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'gallery-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => updateModal(index));
            galleryDots.appendChild(dot);
        });
    }

    function updateModal(index) {
        modalImage.style.opacity = '0';
        modalImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modalImage.src = images[index].src;
            modalImage.alt = images[index].alt;
            modalTitle.textContent = `${index + 1} / ${images.length}`;
            currentIndex = index;
            
            modalImage.style.opacity = '1';
            modalImage.style.transform = 'scale(1)';
            
            document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, 200);
    }

    function showNext() {
        const nextIndex = (currentIndex + 1) % images.length;
        updateModal(nextIndex);
    }

    function showPrev() {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        updateModal(prevIndex);
    }

    createDots();

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateModal(index);
            galleryModal.show();
        });
    });

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    document.addEventListener('keydown', (e) => {
        if (document.getElementById('galleryModal').classList.contains('show')) {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') galleryModal.hide();
        }
    });
});