// ============================================================
// Contact form handler.
//
// By default this opens the visitor's email app pre-filled, so it works
// with zero setup. To receive messages straight to your inbox instead,
// create a free form at https://formspree.io and paste its endpoint below
// (e.g. 'https://formspree.io/f/abcwxyz'). That's the only change needed.
// ============================================================
const FORMSPREE_ENDPOINT = ''; // <- paste your Formspree endpoint to enable inbox delivery
const CONTACT_EMAIL = 'umairdhami143@gmail.com';

const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('cf-status');
  const btn = form.querySelector('button[type="submit"]');

  const setStatus = (msg, cls) => {
    if (status) status.className = 'cf-status' + (cls ? ' ' + cls : '');
    if (status) status.textContent = msg;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (FORMSPREE_ENDPOINT) {
      setStatus('Sending…', '');
      btn.disabled = true;
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST', body: data, headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.reset();
          setStatus("Thanks! Your message is on its way — I'll get back to you soon.", 'ok');
        } else {
          setStatus('Something went wrong. Please email me directly at ' + CONTACT_EMAIL + '.', 'err');
        }
      } catch (_) {
        setStatus('Network error. Please email me directly at ' + CONTACT_EMAIL + '.', 'err');
      } finally {
        btn.disabled = false;
      }
    } else {
      const subject = encodeURIComponent('Project inquiry from ' + (name || 'your website'));
      const body = encodeURIComponent(message + '\n\n— ' + name + '\n' + email);
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
      setStatus('Opening your email app… if nothing happens, email me at ' + CONTACT_EMAIL + '.', 'ok');
    }
  });
}
