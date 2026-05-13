// ===========================
// GLAMOUR SALON – BOOKING JS
// ===========================

// Pre-select service from URL param or query
function initServiceFromURL() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  if (!service) return;

  const map = {
    'makeup': 'Makeup Artistry',
    'hairstyle': 'Hair Styling',
    'spa': 'Luxury Spa',
    'nails': 'Nail Art',
    'grooming': "Men's Grooming",
    'mens-facial': "Men's Facial"
  };

  const serviceValue = map[service] || service;
  const select = document.getElementById('serviceSelect');
  if (select) {
    for (let opt of select.options) {
      if (opt.value === serviceValue) {
        opt.selected = true;
        break;
      }
    }
  }

  // Scroll to booking section
  setTimeout(() => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 400);
}

// Select service and scroll to booking
function selectService(serviceName) {
  const select = document.getElementById('serviceSelect');
  if (select) {
    for (let opt of select.options) {
      if (opt.value === serviceName) {
        opt.selected = true;
        break;
      }
    }
  }
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Submit booking
function submitBooking(e) {
  e.preventDefault();

  const name = document.getElementById('clientName').value;
  const phone = document.getElementById('clientPhone').value;
  const email = document.getElementById('clientEmail').value;
  const service = document.getElementById('serviceSelect').value;
  const subService = document.getElementById('subService').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const notes = document.getElementById('specialRequest').value;

  // Format date nicely
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Build summary HTML
  const summary = document.getElementById('bookingSummary');
  summary.innerHTML = `
    <div class="booking-summary-line"><strong>Client:</strong> ${name}</div>
    <div class="booking-summary-line"><strong>Service:</strong> ${service}${subService ? ` – ${subService}` : ''}</div>
    <div class="booking-summary-line"><strong>Date:</strong> ${formattedDate}</div>
    <div class="booking-summary-line"><strong>Time:</strong> ${time}</div>
    <div class="booking-summary-line"><strong>Contact:</strong> ${phone}</div>
    <div class="booking-summary-line"><strong>Email:</strong> ${email}</div>
    ${notes ? `<div class="booking-summary-line"><strong>Notes:</strong> ${notes}</div>` : ''}
  `;

  // Store in localStorage
  const appointments = JSON.parse(localStorage.getItem('glamour_appointments') || '[]');
  appointments.push({ name, phone, email, service, subService, date, time, notes, bookedAt: new Date().toISOString() });
  localStorage.setItem('glamour_appointments', JSON.stringify(appointments));

  // Show modal
  document.getElementById('bookingModal').classList.add('active');
}

function closeModal() {
  document.getElementById('bookingModal').classList.remove('active');
  document.getElementById('bookingForm').reset();

  // Reset min date
  const dateInput = document.getElementById('appointmentDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('bookingModal');
  if (modal && e.target === modal) closeModal();
});

// Init on load
document.addEventListener('DOMContentLoaded', initServiceFromURL);
