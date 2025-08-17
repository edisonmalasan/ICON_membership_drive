const form = document.getElementById('membershipForm');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');
const memberCountEl = document.getElementById('memberCount');

// Load member count on page load
loadMemberCount();

async function loadMemberCount() {
    try {
        const response = await fetch('/api/v2/members/count');
        const data = await response.json();
        memberCountEl.textContent = data.count;
    } catch (error) {
        memberCountEl.textContent = 'Error loading';
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable submit button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading"></span>Joining...';
    messageDiv.innerHTML = '';

    // Collect form data
    const formData = new FormData(form);
    const memberData = {
        name: formData.get('name').trim(),
        year: formData.get('year'),
        course: formData.get('course').trim(),
        email: formData.get('email').trim()
    };

    try {
        const response = await fetch('/api/v2/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberData)
        });

        const data = await response.json();

        if (response.ok) {
            // Success
            messageDiv.innerHTML = `
                        <div class="message success">
                            🎉 Welcome to the organization, ${memberData.name}! 
                            You've been successfully registered.
                        </div>
                    `;
            form.reset();
            loadMemberCount(); // Refresh member count
        } else {
            // Error
            messageDiv.innerHTML = `
                        <div class="message error">
                            ❌ ${data.error}
                        </div>
                    `;
        }
    } catch (error) {
        messageDiv.innerHTML = `
                    <div class="message error">
                        ❌ Network error. Please try again later.
                    </div>
                `;
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Join Our Organization! 🚀';
    }
});

// Add some interactive effects
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});