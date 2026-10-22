(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conn = navigator.connection || {};
  const small = innerWidth <= 860 || conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");

  /* ================= Flip clock — 1 Nov 2026, 12:00 am AEDT ================= */
  const LAUNCH = new Date("2026-11-01T00:00:00+11:00").getTime();
  const units = {};
  $$(".clock__unit").forEach((u) => {
    const f = $(".flip", u);
    units[u.dataset.unit] = {
      flip: f, top: $(".flip__top span", f), bottom: $(".flip__bottom span", f),
      front: $(".flip__leaf-front span", f), back: $(".flip__leaf-back span", f), val: null, timer: 0,
    };
  });
  const setUnit = (key, v) => {
    const u = units[key];
    if (u.val === v) return;
    const old = u.val === null ? v : u.val;
    u.val = v;
    if (reduce || old === v) { u.top.textContent = u.bottom.textContent = u.front.textContent = u.back.textContent = v; return; }
    clearTimeout(u.timer);
    u.flip.classList.remove("is-flipping");
    u.front.textContent = old; u.back.textContent = v; u.bottom.textContent = old; u.top.textContent = v;
    void u.flip.offsetWidth;
    u.flip.classList.add("is-flipping");
    u.timer = setTimeout(() => { u.bottom.textContent = v; u.flip.classList.remove("is-flipping"); }, 640);
  };
  const pad = (n) => String(n).padStart(2, "0");
  let clockTimer;
  const tick = () => {
    let t = Math.max(0, LAUNCH - Date.now());
    const d = Math.floor(t / 864e5); t -= d * 864e5;
    const h = Math.floor(t / 36e5); t -= h * 36e5;
    const m = Math.floor(t / 6e4); t -= m * 6e4;
    const s = Math.floor(t / 1e3);
    setUnit("d", pad(d)); setUnit("h", pad(h)); setUnit("m", pad(m)); setUnit("s", pad(s));
    if (LAUNCH <= Date.now()) { clearInterval(clockTimer); $("#clock").hidden = true; $("#launched").hidden = false; }
  };
  tick();
  clockTimer = setInterval(tick, 1000);

  /* ================= Videos ================= */
  const startVideo = (v) => {
    if (reduce || v.dataset.started) return;
    v.dataset.started = "1";
    v.src = small ? v.dataset.sd : v.dataset.hd;
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  };
  startVideo($("#heroVideo"));
  const reel = $(".reel__video");
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { startVideo(reel); reel.play().catch(() => {}); } else if (reel.dataset.started) reel.pause();
  }, { rootMargin: "300px 0px" }).observe(reel);

  /* ================= Header ================= */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > innerHeight * 0.6);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ================= Subtle fade-in ================= */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$(".fade").forEach((el) => io.observe(el));
  setTimeout(() => $$(".fade").forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); }), 50);

  /* ================= Lightbox ================= */
  const lb = $("#lightbox"), lbImg = $("img", lb), lbCap = $(".lightbox__cap", lb);
  const items = $$(".g");
  let idx = 0;
  const show = (i) => {
    idx = (i + items.length) % items.length;
    lbImg.src = items[idx].dataset.full;
    lbImg.alt = lbCap.textContent = $("figcaption", items[idx]).textContent;
  };
  const open = (i) => { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lightbox__close", lb).focus(); };
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
  items.forEach((it, i) => { it.tabIndex = 0; it.addEventListener("click", () => open(i)); it.addEventListener("keydown", (e) => { if (e.key === "Enter") open(i); }); });
  $(".lightbox__close", lb).addEventListener("click", close);
  $(".lightbox__prev", lb).addEventListener("click", () => show(idx - 1));
  $(".lightbox__next", lb).addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  /* ================= Form ================= */
  const form = $("#notifyForm"), input = $("#email"), msg = $("#formMsg"), btn = form.querySelector("button"), toast = $("#toast");
  let tt;
  const say = (t, err) => { msg.textContent = t; msg.classList.toggle("err", !!err); };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { say("Please enter a valid email address.", true); input.focus(); return; }
    btn.disabled = true; btn.firstElementChild.textContent = "Sending…"; say("");
    try {
      const res = await fetch("notify.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ email, website: form.website.value }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      form.reset(); say("You’re on the guest list — see you at the grand opening.");
      toast.textContent = "✦ Welcome to the guest list"; toast.classList.add("show");
      clearTimeout(tt); tt = setTimeout(() => toast.classList.remove("show"), 4000);
    } catch { say("Something went wrong — please try again shortly.", true); }
    finally { btn.disabled = false; btn.firstElementChild.textContent = "Notify Me"; }
  });

  $("#year").textContent = new Date().getFullYear();
})();
