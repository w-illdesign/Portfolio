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