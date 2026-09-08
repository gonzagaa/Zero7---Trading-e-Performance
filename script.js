
AOS.init(
  {
      duration: 1200,
  }
);

// Botão oficial Zero7 (z7-btnx): highlight/sombra seguem o cursor + ripple no clique
document.querySelectorAll(".z7-btnx").forEach((btn) => {
  btn.addEventListener("pointermove", (e) => {
    const r = btn.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;

    btn.style.setProperty("--mx", x + "%");
    btn.style.setProperty("--my", y + "%");
    btn.style.setProperty("--sh1x", ((x - 50) / -12).toFixed(2) + "rem");
    btn.style.setProperty("--sh1y", ((y - 50) / -12).toFixed(2) + "rem");
    btn.style.setProperty("--sh2x", ((x - 50) / -20).toFixed(2) + "rem");
    btn.style.setProperty("--sh2y", ((y - 50) / -20).toFixed(2) + "rem");
  });

  btn.addEventListener("pointerleave", () => {
    ["--mx", "--my", "--sh1x", "--sh1y", "--sh2x", "--sh2y"].forEach((v) =>
      btn.style.removeProperty(v)
    );
  });

  btn.addEventListener("click", (e) => {
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "z7x-ripple";
    ripple.style.left = e.clientX - r.left + "px";
    ripple.style.top = e.clientY - r.top + "px";
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});






// VSL: só carrega o YouTube depois do clique (mantém a home leve)
document.querySelectorAll("#vsl .capa").forEach((capa) => {
  capa.addEventListener("click", () => {
    const id = capa.dataset.video;
    if (!id) return;

    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube.com/embed/" +
      id +
      "?autoplay=1&playsinline=1&rel=0&modestbranding=1";
    iframe.title = "Zero7 Trading e Performance";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    // o iframe entra dentro de um slot div: a geometria 9/16 fica no slot,
    // porque aspect-ratio + width:auto não resolve igual em elemento substituído
    const slot = document.createElement("div");
    slot.className = "video";
    slot.appendChild(iframe);

    capa.replaceWith(slot);
  });
});
