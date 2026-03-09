(() => {
  const body = document.body;
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("primary-nav");

  if (!toggle || !navLinks) return;

  const closeNav = () => {
    body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openNav = () => {
    body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  const isOpen = () => body.classList.contains("nav-open");

  toggle.addEventListener("click", () => {
    if (isOpen()) closeNav();
    else openNav();
  });

  navLinks.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target instanceof HTMLElement && target.closest("a")) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (toggle.contains(target)) return;
    if (navLinks.contains(target)) return;
    closeNav();
  });

  const mq = window.matchMedia("(min-width: 769px)");
  const handleMq = () => {
    if (mq.matches) closeNav();
  };
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", handleMq);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(handleMq);
  }
})();

(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = Array.from(
    document.querySelectorAll(
      ".big-picture, .system-card, .why-card, .dashboard-section, .dashboard-feature, .hero"
    )
  );

  if (targets.length === 0) return;

  for (const el of targets) el.classList.add("reveal");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  for (const el of targets) observer.observe(el);
})();
