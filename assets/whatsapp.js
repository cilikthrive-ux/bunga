// A floating WhatsApp button on every page, for quick questions.
(() => {
  const NUMBER = "60134478918";
  // Emoji are left out of the prefilled text: WhatsApp's link redirect garbles them.
  const TEXT = "Hi Precious Nuha! I have a question about the flower lamps: ";

  // Floating buttons share one stack in the bottom-right corner, above the catalogue's order bar.
  function floatStack() {
    let stack = document.querySelector(".float-stack");
    if (stack) return stack;
    stack = document.createElement("div");
    stack.className = "float-stack";
    const css = document.createElement("style");
    css.textContent = `.float-stack { position: fixed; right: 14px; bottom: 16px; z-index: 15; display: flex; flex-direction: column; gap: 10px; align-items: center; }`;
    document.head.appendChild(css);
    document.body.appendChild(stack);
    const bar = document.querySelector(".order");
    if (bar && window.ResizeObserver) {
      new ResizeObserver(() => { stack.style.bottom = bar.offsetHeight + 14 + "px"; }).observe(bar);
    }
    return stack;
  }

  const style = document.createElement("style");
  style.textContent = `
    .wa-float {
      order: 2; display: flex; align-items: center; justify-content: center;
      width: 54px; height: 54px; border-radius: 50%;
      background: #25d366; color: #fff; text-decoration: none;
      box-shadow: 0 6px 18px rgba(37, 211, 102, .4);
    }
    .wa-float:hover { background: #1da851; }
    .wa-float svg { width: 30px; height: 30px; fill: currentColor; }
  `;
  document.head.appendChild(style);

  const link = document.createElement("a");
  link.className = "wa-float";
  link.href = `https://wa.me/${NUMBER}?text=${encodeURIComponent(TEXT)}`;
  link.target = "_blank";
  link.rel = "noopener";
  link.title = "Chat with us on WhatsApp";
  link.setAttribute("aria-label", "Chat with us on WhatsApp");
  link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.28l5.7-1.5a11.3 11.3 0 0 0 5.74 1.47h.01c6.25 0 11.34-5.08 11.35-11.33 0-3.03-1.18-5.88-3.32-8.02"/></svg>';
  link.addEventListener("click", () => window.goatcounter?.count?.({ path: "whatsapp-chat", title: "Floating WhatsApp button", event: true }));
  floatStack().appendChild(link);
})();
