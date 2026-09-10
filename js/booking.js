/* ==========================================================================
   ALEKSANDRA BOCHENEK - NAIL DESIGN | BOOKING SYSTEM JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBookingModal();
  initBookingForms();
});

const STUDIO_PHONE = '+44 7721 676760';
const STUDIO_PHONE_DIGITS = '447721676760';
const STUDIO_EMAIL = 'ola1292@gmail.com';

function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const openBtns = document.querySelectorAll('[data-open-booking]');
  const closeBtns = modal.querySelectorAll('.modal-close-btn, .modal-backdrop-close');

  const openModal = (serviceName = '') => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // If a service name was passed, auto-select it in the modal form
    if (serviceName) {
      const select = modal.querySelector('select[name="service"]');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) || 
              select.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  window.openBookingModal = openModal;
}

function initBookingForms() {
  const forms = document.querySelectorAll('.booking-appointment-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value || 'Client';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || '';
      const service = form.querySelector('[name="service"]')?.value || 'Haute Nail Service';
      const date = form.querySelector('[name="date"]')?.value || 'Flexible Date';
      const time = form.querySelector('[name="time"]')?.value || 'Anytime';
      const notes = form.querySelector('[name="notes"]')?.value || 'None';

      const messageText = `Hello Aleksandra! ✨ I would like to request an appointment at your Edinburgh Studio:%0A%0A` +
        `💅 *Service:* ${encodeURIComponent(service)}%0A` +
        `📅 *Preferred Date:* ${encodeURIComponent(date)}%0A` +
        `⏰ *Preferred Time:* ${encodeURIComponent(time)}%0A` +
        `👤 *Name:* ${encodeURIComponent(name)}%0A` +
        `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
        `✉️ *Email:* ${encodeURIComponent(email)}%0A` +
        `📝 *Notes/Ideas:* ${encodeURIComponent(notes)}%0A%0A` +
        `Looking forward to confirming my booking!`;

      const whatsappUrl = `https://wa.me/${STUDIO_PHONE_DIGITS}?text=${messageText}`;

      // Render Confirmation state
      const formCard = form.closest('.booking-form-card, .modal-dialog');
      if (formCard) {
        formCard.innerHTML = `
          <div style="text-align: center; padding: 24px 12px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(201, 162, 75, 0.15); border: 1px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; color: var(--gold-light);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 2rem; color: var(--text-cream); margin-bottom: 12px;">Appointment Request Prepared</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 0.95rem;">
              Thank you, <strong>${name}</strong>. Aleksandra's studio operates on private appointment reservations. Click below to instantly send your appointment details via WhatsApp or Email:
            </p>
            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 360px; margin: 0 auto;">
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold shimmer-btn" style="width: 100%;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.301-.15-1.781-.878-2.057-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.178-.176.2-.351.226-.652.075-.3-.15-1.268-.468-2.416-1.492-.893-.797-1.496-1.781-1.672-2.082-.175-.3-.019-.462.132-.612.135-.135.301-.351.451-.527.151-.175.201-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.676-1.63-.926-2.232-.244-.587-.492-.507-.676-.516l-.576-.01c-.2 0-.526.075-.802.375-.276.3-1.053 1.029-1.053 2.509 0 1.48 1.078 2.909 1.228 3.11.15.2 2.121 3.24 5.138 4.544.718.31 1.278.496 1.715.635.72.229 1.376.197 1.895.119.578-.087 1.781-.728 2.032-1.431.25-.702.25-1.304.175-1.43-.075-.126-.275-.202-.576-.352z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.006L2 22l5.12-1.31A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.17 8.17 0 0 1-4.364-1.257l-.313-.186-3.04.777.81-2.963-.204-.325A8.177 8.177 0 1 1 12 20.2z"/>
                </svg>
                Send via WhatsApp
              </a>
              <a href="mailto:${STUDIO_EMAIL}?subject=Appointment%20Request%20-%20${encodeURIComponent(name)}&body=Service:%20${encodeURIComponent(service)}%0ADate:%20${encodeURIComponent(date)}%0ATime:%20${encodeURIComponent(time)}%0APhone:%20${encodeURIComponent(phone)}" class="btn btn-outline" style="width: 100%;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Send via Email
              </a>
            </div>
            <button type="button" onclick="location.reload()" style="background: none; border: none; color: var(--gold-light); font-size: 0.8rem; margin-top: 20px; cursor: pointer; text-decoration: underline;">
              Book Another Appointment
            </button>
          </div>
        `;
      }

      if (window.showToast) {
        window.showToast("Appointment details ready! Click WhatsApp to confirm.");
      }
    });
  });
}
