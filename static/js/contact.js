// Contact form functionality
// Contact form functionality
// contact.js - Contact page terminal animation and email form
document.addEventListener("DOMContentLoaded", function() {
    const animationContainer = document.getElementById('terminal-animation');
    const formContainer = document.getElementById('email-form-container');
    const form = document.getElementById('email-form');
    const responseMessage = document.getElementById('response-message');
    
    // Terminal animation sequence
    const terminalSequence = [
        { delay: 500, text: '$ pwd', className: 'command-line' },
        { delay: 300, text: '/home/user/contact', className: 'output-line' },
        { delay: 500, text: '$ ls -la', className: 'command-line' },
        { delay: 300, text: 'total 16', className: 'output-line' },
        { delay: 100, text: 'drwxr-xr-x 2 user user 4096 Nov  5 14:30 .', className: 'output-line' },
        { delay: 100, text: 'drwxr-xr-x 8 user user 4096 Nov  5 14:30 ..', className: 'output-line' },
        { delay: 100, text: '-rw-r--r-- 1 user user  220 Nov  5 14:30 email.sh', className: 'output-line' },
        { delay: 100, text: '-rw-r--r-- 1 user user  807 Nov  5 14:30 info.txt', className: 'output-line' },
        { delay: 500, text: '$ cat info.txt', className: 'command-line' },
        { delay: 300, text: '╔════════════════════════════════════════════════╗', className: 'info-box' },
        { delay: 50, text: '║             CONTACT INFORMATION                ║', className: 'info-box' },
        { delay: 50, text: '╠════════════════════════════════════════════════╣', className: 'info-box' },
        { delay: 50, text: '║  Email:     xurxo@mail.com                     ║', className: 'info-box' },
        { delay: 50, text: '║  GitHub:    github.com/Xurxxo                  ║', className: 'info-box' },
        { delay: 50, text: '║  LinkedIn:  linkedin.com/in/xurxo.astorgano    ║', className: 'info-box' },
        { delay: 50, text: '╚════════════════════════════════════════════════╝', className: 'info-box' },
        { delay: 500, text: '$ cd mail/', className: 'command-line' },
        { delay: 300, text: '$ ./mail-client', className: 'command-line' },
        { delay: 500, text: 'Opening mail client...', className: 'output-line' },
        { delay: 300, text: '', className: 'blank-line' }
    ];
    
    let currentStep = 0;
    
    function displayNextStep() {
        if (currentStep < terminalSequence.length) {
            const step = terminalSequence[currentStep];
            
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = step.className;
                line.textContent = step.text;
                animationContainer.appendChild(line);
                
                // Scroll to bottom
                animationContainer.scrollTop = animationContainer.scrollHeight;
                
                currentStep++;
                displayNextStep();
            }, step.delay);
        } else {
            // Animation complete, show form
            setTimeout(() => {
                formContainer.style.display = 'block';
            }, 500);
        }
    }
    
    // Start animation
    displayNextStep();
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        const data = {
            email: emailInput.value,
            message: messageInput.value
        };
        
        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Hide form
                form.style.display = 'none';
                
                // Show success message
                responseMessage.className = 'success-message';
                responseMessage.innerHTML = `
<div class="command-line">$ echo "Message sent"</div>
<div class="success-output">✓ Message has been sent successfully!</div>
<div class="output-line">Thank you for reaching out. I'll get back to you soon.</div>
                `;
                responseMessage.style.display = 'block';
            } else {
                responseMessage.className = 'error-message';
                responseMessage.textContent = '✗ Error: ' + result.message;
                responseMessage.style.display = 'block';
            }
        } catch (error) {
            responseMessage.className = 'error-message';
            responseMessage.textContent = '✗ Error sending message. Please try again.';
            responseMessage.style.display = 'block';
        }
    });
});
