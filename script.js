const btns = document.querySelectorAll('.btn-detail');
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    document.getElementById(modalId).style.display = 'block';
    document.body.classList.add('modal-open'); // bloque le scroll
  });
});

closes.forEach(span => {
  span.addEventListener('click', () => {
    const modal = span.closest('.modal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open'); // réactive le scroll
  });
});

// Fermer modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open'); // réactive le scroll
    }
  });
});


(function(){
    document.addEventListener('DOMContentLoaded', function(){
      const groups = Array.from(document.querySelectorAll('.form-group'));

      function updateFilled(group){
        const field = group.querySelector('input, textarea');
        if(!field) return;
        if(field.value && field.value.trim() !== '') group.classList.add('filled');
        else group.classList.remove('filled');
      }

      groups.forEach(group => {
        const field = group.querySelector('input, textarea');
        const ph = group.querySelector('.ph');

        if(!field || !ph) return;

        // Focus / blur pour l'effet visuel
        field.addEventListener('focus', () => group.classList.add('focused'));
        field.addEventListener('blur', () => group.classList.remove('focused'));

        // Mise à jour au fur et à mesure de la saisie
        field.addEventListener('input', () => updateFilled(group));

        // Permet de cliquer sur le placeholder pour focus le champ
        ph.addEventListener('click', () => field.focus());

        // état initial (utile si valeur pré-remplie ou autofill)
        updateFilled(group);

        // Re-check after a short delay to catch browser autofill
        setTimeout(() => updateFilled(group), 50);
        setTimeout(() => updateFilled(group), 500);
      });
    });
  })();
  
  
  
  (function(){
  const btn = document.getElementById('themeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');
  const label = document.getElementById('themeLabel');
  const logoLink = document.querySelector('.logo img'); // ton logo

  if(label){ label.style.display = 'none'; }

  function updateIcons(isDark){
    if(iconSun) iconSun.style.display = isDark ? 'none' : 'inline-block';
    if(iconMoon) iconMoon.style.display = isDark ? 'inline-block' : 'none';
    if(btn) btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');

    // Changer le logo selon le thème
    if(logoLink){
      logoLink.src = isDark ? 'logo-light.png' : 'cv.png';
      // Tu peux aussi changer le alt si tu veux
      logoLink.alt = isDark ? 'Logo sombre' : 'Logo clair';
    }
  }

  let saved = null; try{ saved = localStorage.getItem('siteTheme'); }catch(e){ saved = null; }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = (saved === 'dark') || (saved === null && prefersDark);
  if(initialDark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
  updateIcons(initialDark);

  if(btn){
    btn.addEventListener('click', ()=>{
      const nowDark = document.body.classList.toggle('dark');
      updateIcons(nowDark);
      try{ localStorage.setItem('siteTheme', nowDark ? 'dark' : 'light'); }catch(e){}
    });
  }
  
  

  // Avatar initials fallback
  (function(){
    const img = document.getElementById('avatarImg');
    const initials = document.getElementById('avatarInitials');
    if(img && initials){
      img.addEventListener('error', ()=>{ initials.style.display='block'; });
      img.addEventListener('load', ()=>{ initials.style.display='none'; });
      setTimeout(()=>{
        if(img.complete && (!img.naturalWidth || img.naturalWidth === 0)) initials.style.display='block';
      }, 50);
    }
  })();
  
  
  

  // Contact form small UX: if FORM_ID not replaced, prevent submit and show message
  (function(){
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    if(!form) return;
    form.addEventListener('submit', function(e){
      const action = (form.getAttribute('action')||'').trim();
      if(action.includes('FORM_ID')){
        e.preventDefault();
        formMsg.style.display = 'block';
        formMsg.textContent = 'Le formulaire n\'est pas configuré : remplacez FORM_ID dans l\'attribut action du formulaire (Formspree).';
        formMsg.style.color = '#b91c1c';
        return;
      }
      formMsg.style.display = 'block';
      formMsg.textContent = 'Envoi en cours...';
    });
  })();

  // Smooth scroll for anchor links
  (function(){
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href.length>1){
          const el = document.querySelector(href);
          if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
        }
      });
    });
  })();

  // Extra guard against horizontal scroll
  try{ document.documentElement.style.overflowX = 'hidden'; document.body.style.overflowX = 'hidden'; }catch(e){}
})();





emailjs.init("vueylPFuPo4CtqLoi"); // ta clé publique

  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  form.addEventListener("submit", async function(event) {
    event.preventDefault();
    formMsg.style.display = "block";
    formMsg.style.color = "#374151";
    formMsg.textContent = "Envoi en cours...";

    const templateParams = {
  name: form.elements["name"].value,
  email: form.elements["email"].value,
  message: form.elements["message"].value
};

    try {
      await emailjs.send("service_to7c7cl", "template_xg06sy9", templateParams);
      formMsg.style.color = "green";
      formMsg.textContent = "Message envoyé avec succès ! Je vous réponds dès que possible par mail";
      form.reset();
    } catch (error) {
      formMsg.style.color = "red";
      formMsg.textContent = "Erreur lors de l'envoi : " + (error.text || "réessayez plus tard.");
      console.error("EmailJS error:", error);
    }
  });