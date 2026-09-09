/**
 * LANI KOMPANI - High Performance Windows & Doors
 * Clean scripts matching met.mk layout + Visual Live In-Browser Editor (Text & Images)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer & Overlay Trigger
  const mobileTrigger = document.getElementById('metMobileTrigger');
  const metNav = document.getElementById('metNav');
  const metNavOverlay = document.getElementById('metNavOverlay');
  const btnCloseNav = document.getElementById('btnCloseNav');
  const menuLinks = document.querySelectorAll('.met-menu a, .nav-mobile-btn');
  const dropdownToggles = document.querySelectorAll('.has-dropdown > a');

  function openNav() {
    if (metNav) metNav.classList.add('open');
    if (metNavOverlay) metNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (mobileTrigger) {
      const icon = mobileTrigger.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      }
    }
  }

  function closeNav() {
    if (metNav) metNav.classList.remove('open');
    if (metNavOverlay) metNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (mobileTrigger) {
      const icon = mobileTrigger.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  }

  if (mobileTrigger) {
    mobileTrigger.addEventListener('click', () => {
      if (metNav && metNav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (btnCloseNav) {
    btnCloseNav.addEventListener('click', closeNav);
  }

  if (metNavOverlay) {
    metNavOverlay.addEventListener('click', closeNav);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && metNav && metNav.classList.contains('open')) {
      closeNav();
    }
  });

  // Mobile Accordion per Dropdown "Produktet"
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        const subMenu = toggle.parentElement.querySelector('.sub-menu');
        if (subMenu) {
          e.preventDefault();
          subMenu.classList.toggle('show-mobile');
          const icon = toggle.querySelector('i');
          if (icon) {
            icon.style.transform = subMenu.classList.contains('show-mobile') ? 'rotate(180deg)' : 'none';
          }
        }
      }
    });
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Nese eshte dropdown toggle ne celular, mos e mbyll menune menjehere
      if (window.innerWidth <= 991 && link.classList.contains('dropdown-toggle')) {
        return;
      }
      closeNav();
    });
  });

  // 2. WhatsApp & Email Rapid Quotation
  const submitWhatsapp = document.getElementById('submitWhatsapp');
  const submitEmail = document.getElementById('submitEmail');
  const userName = document.getElementById('userName');
  const userPhone = document.getElementById('userPhone');
  const userCity = document.getElementById('userCity');
  const userService = document.getElementById('userService');
  const userNotes = document.getElementById('userNotes');

  const WHATSAPP_NUMBER = '38971442821';
  const EMAIL_ADDRESS = 'lanikompani5@gmail.com';

  function validateInput() {
    if (!userName.value.trim()) {
      alert('Ju lutem shënoni Emrin dhe Mbiemrin.');
      userName.focus();
      return false;
    }
    if (!userPhone.value.trim()) {
      alert('Ju lutem shënoni Numrin e Telefonit.');
      userPhone.focus();
      return false;
    }
    if (!userService.value) {
      alert('Ju lutem zgjidhni produktin që kërkoni.');
      userService.focus();
      return false;
    }
    return true;
  }

  if (submitWhatsapp) {
    submitWhatsapp.addEventListener('click', () => {
      if (!validateInput()) return;

      const name = userName.value.trim();
      const phone = userPhone.value.trim();
      const city = userCity.value.trim() || 'I paspecifikuar';
      const service = userService.value;
      const notes = userNotes.value.trim() || 'Kërkoj më shumë informacion dhe matje në terren.';

      const message = `*KËRKESË PËR OFERTË - LANI KOMPANI*%0A%0A` +
                      `👤 *Klienti:* ${encodeURIComponent(name)}%0A` +
                      `📞 *Telefoni:* ${encodeURIComponent(phone)}%0A` +
                      `📍 *Qyteti:* ${encodeURIComponent(city)}%0A` +
                      `🪟 *Produkti:* ${encodeURIComponent(service)}%0A` +
                      `📝 *Përshkrimi:* ${encodeURIComponent(notes)}%0A%0A` +
                      `_Dërguar nga uebsajti zyrtar i LANI KOMPANI._`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(waUrl, '_blank');
    });
  }

  if (submitEmail) {
    submitEmail.addEventListener('click', () => {
      if (!validateInput()) return;

      const name = userName.value.trim();
      const phone = userPhone.value.trim();
      const city = userCity.value.trim() || 'I paspecifikuar';
      const service = userService.value;
      const notes = userNotes.value.trim() || 'Kërkoj më shumë informacion dhe ofertë.';

      const subject = encodeURIComponent(`Kërkesë për Ofertë: ${name} - ${service}`);
      const body = encodeURIComponent(
        `Përshëndetje LANI KOMPANI,\n\n` +
        `Kërkoj ofertë me këto të dhëna:\n` +
        `Emri: ${name}\n` +
        `Telefoni: ${phone}\n` +
        `Vendbanimi: ${city}\n` +
        `Produkti: ${service}\n` +
        `Përshkrimi: ${notes}\n\n` +
        `Ju faleminderit!`
      );

      window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
    });
  }

  // 3. Subnav Active State Tracking
  const subnavTabs = document.querySelectorAll('.subnav-tab');
  const sections = document.querySelectorAll('section[id], div[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 160;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        subnavTabs.forEach(tab => {
          if (tab.getAttribute('href') === `#${id}`) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
      }
    });
  });

  // ==========================================================================
  // 4. LIVE IN-BROWSER VISUAL EDITOR (Teksti & Fotot)
  // ==========================================================================
  const btnOpenEditor = document.getElementById('btnOpenEditor');
  const liveEditorBar = document.getElementById('liveEditorBar');
  const btnSaveEditor = document.getElementById('btnSaveEditor');
  const btnCloseEditor = document.getElementById('btnCloseEditor');
  const editorToast = document.getElementById('editorToast');

  // Elementet e modalit te fotos
  const imageModalBackdrop = document.getElementById('imageModalBackdrop');
  const btnCloseImgModal = document.getElementById('btnCloseImgModal');
  const btnCancelImgModal = document.getElementById('btnCancelImgModal');
  const btnApplyImage = document.getElementById('btnApplyImage');
  const uploadDropzone = document.getElementById('uploadDropzone');
  const localFileInput = document.getElementById('localFileInput');
  const imageUrlInput = document.getElementById('imageUrlInput');
  const imagePreviewHolder = document.getElementById('imagePreviewHolder');
  const imagePreviewImg = document.getElementById('imagePreviewImg');
  const btnChangeHeroBg = document.getElementById('btnChangeHeroBg');

  let isEditing = false;
  let currentTarget = null; // img ose element sfondi
  let currentPendingImageData = null;

  const editableTextSelectors = 'h1, h2, h3, h4, h5, p, span.feat-title, span.feat-text, span.feat-category, a.btn-met-primary, a.btn-met-bordered, a.btn-met-dark, a.btn-met-card, a.subnav-tab, .loc-desc, .quote-title, .quote-text, .logo-primary, .logo-accent, .logo-sub, .f-bold, .f-red';

  function showToast(message) {
    if (!editorToast) return;
    editorToast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> <span>${message}</span>`;
    editorToast.classList.add('show');
    setTimeout(() => {
      editorToast.classList.remove('show');
    }, 4500);
  }

  function enableEditing() {
    isEditing = true;
    document.body.classList.add('is-editing');
    if (liveEditorBar) liveEditorBar.classList.add('active');

    // Aktivizo tekstet
    const textEls = document.querySelectorAll(editableTextSelectors);
    textEls.forEach(el => {
      if (!el.closest('.live-editor-bar') && !el.closest('.live-editor-launcher') && !el.closest('.image-modal-backdrop')) {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('spellcheck', 'false');
      }
    });

    showToast('Modi i Editimit u aktivizua! Klikoni mbi tekst, mbi foto ose te butoni "Ndrysho Logon".');
  }

  function disableEditing() {
    isEditing = false;
    document.body.classList.remove('is-editing');
    if (liveEditorBar) liveEditorBar.classList.remove('active');

    const textEls = document.querySelectorAll('[contenteditable="true"]');
    textEls.forEach(el => {
      el.removeAttribute('contenteditable');
      el.removeAttribute('spellcheck');
    });
  }

  if (btnOpenEditor) {
    btnOpenEditor.addEventListener('click', () => {
      if (!isEditing) {
        enableEditing();
      } else {
        disableEditing();
      }
    });
  }

  if (btnCloseEditor) {
    btnCloseEditor.addEventListener('click', disableEditing);
  }

  // ==========================================================================
  // Logjika e Zevendesimit te Fotove Live & Logos
  // ==========================================================================
  function openImageModal(target) {
    currentTarget = target;
    currentPendingImageData = null;
    imageUrlInput.value = '';
    localFileInput.value = '';

    // Nese eshte img, merr src aktual per preview
    if (target && target.tagName === 'IMG') {
      imagePreviewImg.src = target.src;
      imagePreviewHolder.style.display = 'block';
    } else if (target === 'LOGO') {
      const existingLogoImg = document.querySelector('.site-logo-img');
      if (existingLogoImg) {
        imagePreviewImg.src = existingLogoImg.src;
        imagePreviewHolder.style.display = 'block';
      } else {
        imagePreviewHolder.style.display = 'none';
      }
    } else {
      imagePreviewHolder.style.display = 'none';
    }

    imageModalBackdrop.classList.add('active');
  }

  function closeImageModal() {
    imageModalBackdrop.classList.remove('active');
    currentTarget = null;
    currentPendingImageData = null;
  }

  if (btnCloseImgModal) btnCloseImgModal.addEventListener('click', closeImageModal);
  if (btnCancelImgModal) btnCancelImgModal.addEventListener('click', closeImageModal);

  // Klikimi mbi cdo foto, karte promo ose buton kamere gjate kohes kur editimi eshte aktiv
  document.addEventListener('click', (e) => {
    if (!isEditing) return;

    // Injoro klikimet brenda shiritit te editorit ose brenda modalit
    if (e.target.closest('.live-editor-bar') || e.target.closest('.live-editor-launcher') || e.target.closest('.image-modal-box')) {
      return;
    }

    // 1. Nese klikohet butoni specifik i ndryshimit te fotos se kartes promo
    const promoChangeBtn = e.target.closest('.btn-change-promo-photo');
    if (promoChangeBtn) {
      e.preventDefault();
      e.stopPropagation();
      const parentCard = promoChangeBtn.closest('.met-promo-card');
      const cardImg = parentCard ? parentCard.querySelector('img') : null;
      if (cardImg) {
        openImageModal(cardImg);
        return;
      }
    }

    // 2. Nese klikohet butoni i sfondit te Hero-s
    const heroBtn = e.target.closest('#btnChangeHeroBg');
    if (heroBtn) {
      e.preventDefault();
      e.stopPropagation();
      const heroSection = document.getElementById('ballina');
      openImageModal(heroSection);
      return;
    }

    // 3. Nese klikohet direkt mbi nje <img>
    const img = e.target.closest('img');
    if (img && !img.closest('.image-modal-box')) {
      e.preventDefault();
      e.stopPropagation();
      openImageModal(img);
      return;
    }

    // 4. Nese klikohet mbi nje karte promo (madje edhe mbi overlay), pervec nese po shkruan tekst
    const promoCard = e.target.closest('.met-promo-card');
    if (promoCard) {
      // Nese perdoruesi po klikon mbi titullin per te ndryshuar shkronjat, lejoje
      if (e.target.isContentEditable || e.target.tagName === 'H4' || e.target.tagName === 'A') {
        return;
      }
      const targetImg = promoCard.querySelector('img');
      if (targetImg) {
        e.preventDefault();
        e.stopPropagation();
        openImageModal(targetImg);
        return;
      }
    }

    // 5. Nese klikohet mbi ndonje mbajtes tjeter fotoje (psh. split-col-image ose diagram-img-wrap)
    const imgContainer = e.target.closest('.split-col-image, .diagram-img-wrap, .gallery-cell');
    if (imgContainer) {
      const containedImg = imgContainer.querySelector('img');
      if (containedImg) {
        e.preventDefault();
        e.stopPropagation();
        openImageModal(containedImg);
        return;
      }
    }
  });

  // Zgjedhja e skedarit nga kompjuteri
  if (uploadDropzone && localFileInput) {
    uploadDropzone.addEventListener('click', () => {
      localFileInput.click();
    });

    localFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          currentPendingImageData = event.target.result;
          imagePreviewImg.src = currentPendingImageData;
          imagePreviewHolder.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Vendosja e URL-se
  if (imageUrlInput) {
    imageUrlInput.addEventListener('input', () => {
      const url = imageUrlInput.value.trim();
      if (url) {
        currentPendingImageData = url;
        imagePreviewImg.src = url;
        imagePreviewHolder.style.display = 'block';
      }
    });
  }

  // Aplikimi i fotos se re
  if (btnApplyImage) {
    btnApplyImage.addEventListener('click', async () => {
      if (!currentTarget || !currentPendingImageData) {
        alert('Ju lutem zgjidhni një foto nga kompjuteri ose shënoni linkun e fotos.');
        return;
      }

      btnApplyImage.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Duke u aplikuar...';
      btnApplyImage.disabled = true;

      try {
        let finalUrl = currentPendingImageData;

        // Nese eshte ngarkuar skedar nga kompjuteri (Base64), e ruajme ne server
        if (currentPendingImageData.startsWith('data:image/')) {
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: currentPendingImageData })
          });
          const uploadData = await uploadRes.json();
          if (uploadData.success && uploadData.url) {
            finalUrl = uploadData.url;
          }
        }

        // Zevendesojme ne DOM
        if (currentTarget === 'LOGO') {
          const siteLogoImgs = document.querySelectorAll('.site-logo-img');
          const footerLogoImgs = document.querySelectorAll('.footer-logo-img');

          if (siteLogoImgs.length > 0) {
            siteLogoImgs.forEach(img => { img.src = finalUrl; });
          }
          if (footerLogoImgs.length > 0) {
            footerLogoImgs.forEach(img => { img.src = finalUrl; });
          }

          closeImageModal();
          showToast('Logoja u ndryshua me sukses! Klikoni "Ruaj Ndryshimet në Skedar" për ta ruajtur përgjithmonë.');
          return;
        } else if (currentTarget.tagName === 'IMG') {
          currentTarget.src = finalUrl;
          if (currentTarget.hasAttribute('srcset')) {
            currentTarget.removeAttribute('srcset'); // Shmang konfliktin me foton e vjeter
          }
        } else if (currentTarget.id === 'ballina' || currentTarget.classList.contains('met-hero-slider')) {
          currentTarget.style.backgroundImage = `linear-gradient(rgba(17, 17, 17, 0.72), rgba(17, 17, 17, 0.72)), url('${finalUrl}')`;
        }

        closeImageModal();
        showToast('Fotoja u ndryshua me sukses! Klikoni "Ruaj Ndryshimet në Skedar" për ta ruajtur përgjithmonë.');
      } catch (err) {
        console.error('Gabim gjatë zëvendësimit të fotos:', err);
        // Fallback: aplikojme direkt
        if (currentTarget.tagName === 'IMG') {
          currentTarget.src = currentPendingImageData;
        }
        closeImageModal();
      } finally {
        btnApplyImage.innerHTML = 'Apliko Foton';
        btnApplyImage.disabled = false;
      }
    });
  }

  // ==========================================================================
  // Ruajtja e HTML-it ne Skedar
  // ==========================================================================
  if (btnSaveEditor) {
    btnSaveEditor.addEventListener('click', async () => {
      // 1. Pastrojme atributet e editimit para ruajtjes
      const textEls = document.querySelectorAll('[contenteditable="true"]');
      textEls.forEach(el => {
        el.removeAttribute('contenteditable');
        el.removeAttribute('spellcheck');
      });
      document.body.classList.remove('is-editing');
      if (liveEditorBar) liveEditorBar.classList.remove('active');

      // 2. Marrim HTML-in e plote te faqes me fotot dhe tekstet e reja
      const fullHtml = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;

      // 3. Riatribuojme editimin
      textEls.forEach(el => {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('spellcheck', 'false');
      });
      document.body.classList.add('is-editing');
      if (liveEditorBar) liveEditorBar.classList.add('active');

      // 4. Dergojme ne server.js
      try {
        btnSaveEditor.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Duke u ruajtur...';
        btnSaveEditor.disabled = true;

        const response = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ html: fullHtml })
        });

        const resData = await response.json();
        if (resData.success) {
          showToast('Të gjitha tekstet dhe fotot u ruajtën me sukses në skedar!');
        } else {
          alert('Gabim gjatë ruajtjes: ' + (resData.error || 'Kontrolloni serverin'));
        }
      } catch (err) {
        console.error('Save error:', err);
        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'index.html';
        a.click();
        showToast('Skedari index.html me të gjitha fotot e reja u shkarkua në kompjuter!');
      } finally {
        btnSaveEditor.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Ruaj Ndryshimet në Skedar';
        btnSaveEditor.disabled = false;
      }
    });
  }

  // ==========================================================================
  // PVC WINDOWS PROFILE BRAND SWITCHER (SCHÜCO 82mm vs KÖMMERLING 76mm)
  // ==========================================================================
  window.switchPvcBrand = function(targetBrand) {
    const btns = document.querySelectorAll('.pvc-brand-btn');
    const panelSchuco = document.getElementById('panelSchuco');
    const panelKommerling = document.getElementById('panelKommerling');

    btns.forEach(btn => {
      const isTarget = btn.getAttribute('data-target') === targetBrand;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    if (targetBrand === 'schuco') {
      if (panelSchuco) panelSchuco.classList.add('active');
      if (panelKommerling) panelKommerling.classList.remove('active');
    } else if (targetBrand === 'kommerling') {
      if (panelKommerling) panelKommerling.classList.add('active');
      if (panelSchuco) panelSchuco.classList.remove('active');
    }
  };

  // Event listener për butonat e markës
  document.querySelectorAll('.pvc-brand-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const brand = this.getAttribute('data-target');
      if (brand) window.switchPvcBrand(brand);
    });
  });
});
