document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    // Contador de caracteres
    messageTextarea.addEventListener('input', function () {
        const currentLength = this.value.length;
        charCount.textContent = currentLength + '/500';
        
        if (currentLength > 450) {
            charCount.style.color = '#dc3545'; // Rojo cuando se acerca al límite
        } else {
            charCount.style.color = '#8C7853'; // Color normal
        }
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            if (message.length > 500) {
                alert('El mensaje no puede exceder los 500 caracteres.');
                return;
            }
            alert('¡Gracias por tu mensaje!\n\nFormulario enviado (simulación).\n\nNombre: ' + name + '\nEmail: ' + email);
            contactForm.reset();
            charCount.textContent = '0/500';
            charCount.style.color = '#8C7853';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
});