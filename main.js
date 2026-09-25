/* Wa Methodist School for the Blind: interactions
   Accessibility-first: keyboard support, ARIA, reduced-motion aware. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation (slide-in drawer) ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    var backdrop = document.querySelector(".nav-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      document.body.appendChild(backdrop);
    }
    function setMenu(open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("open", open);
      backdrop.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close when the backdrop is clicked
    backdrop.addEventListener("click", function () { setMenu(false); });
    // Close on link click (mobile)
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    // Close on Escape and return focus to the toggle
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    // Reset if resized up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1080 && menu.classList.contains("open")) setMenu(false);
    });
  }

  /* ---------- Active nav link ---------- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === here) a.setAttribute("aria-current", "page");
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (reduceMotion || isNaN(target)) { el.textContent = prefix + target + suffix; return; }
    var start = 0, dur = 1400, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(eased * target);
      el.textContent = prefix + val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (!("IntersectionObserver" in window) || reduceMotion) {
      counters.forEach(animateCount);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { cio.observe(c); });
    }
  }

  /* ---------- Accordion ---------- */
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      // Close siblings within same accordion group
      var group = btn.closest(".acc-group");
      if (group) {
        group.querySelectorAll(".acc-btn").forEach(function (b) {
          if (b !== btn) {
            b.setAttribute("aria-expanded", "false");
            var p = document.getElementById(b.getAttribute("aria-controls"));
            if (p) p.style.maxHeight = null;
          }
        });
      }
      btn.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var idx = 0, lastFocus = null;
    function open(i) {
      idx = i; lastFocus = document.activeElement;
      var it = items[i];
      lbImg.src = it.getAttribute("data-full") || it.querySelector("img").src;
      lbImg.alt = it.getAttribute("data-caption") || it.querySelector("img").alt || "";
      lbCap.textContent = it.getAttribute("data-caption") || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    function nav(d) { open((idx + d + items.length) % items.length); }
    items.forEach(function (it, i) {
      it.addEventListener("click", function () { open(i); });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-next").addEventListener("click", function () { nav(1); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { nav(-1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    });
  }

  /* ---------- Donation amount selector ---------- */
  var amounts = document.querySelectorAll(".amount");
  var custom = document.getElementById("customAmount");
  amounts.forEach(function (a) {
    a.addEventListener("click", function () {
      amounts.forEach(function (x) { x.classList.remove("selected"); x.setAttribute("aria-pressed", "false"); });
      a.classList.add("selected");
      a.setAttribute("aria-pressed", "true");
      if (custom) custom.value = a.getAttribute("data-amount");
    });
  });

  /* ---------- Forms (demo handler) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var name = (form.querySelector("[name=name]") || {}).value || "";
      if (status) {
        status.textContent = "Thank you" + (name ? ", " + name.split(" ")[0] : "") +
          "! This is a demonstration form: your message has been recorded locally but not yet sent. Please connect it to the school's email or a form service to go live.";
      }
      form.reset();
      amounts.forEach(function (x) { x.classList.remove("selected"); });
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
