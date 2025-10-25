function main() {
  const vipButton = document.querySelector("a.btn.btn-sm.btn-gradient-primary");
  if (vipButton?.parentElement) {
    vipButton.parentElement.remove();
  }

  const div = document.querySelector("div.text-xs.text-slate-600");
  if (div) {
    const span = div.querySelector('span[style*="vertical-align"]');
    if (span && !span.textContent.includes("VIP")) {
      span.textContent = `${span.textContent} VIP`;
    }
  }

  const template = `<p style="display: flex; gap: 5px">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-calendar-check">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="m9 16 2 2 4-4" />
      </svg>
      Ngày mua VIP: <span style="font-weight: bold">02/06/2004 00:00</span>
    </p>
    <p style="display: flex; gap: 5px">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-calendar-off">
        <path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" />
        <path d="M21 15.5V6a2 2 0 0 0-2-2H9.5" />
        <path d="M16 2v4" />
        <path d="M3 10h7" />
        <path d="M21 10h-5.5" />
        <path d="m2 2 20 20" />
      </svg>
      Ngày hết hạn: <span style="font-weight: bold">02/08/2004 00:00 (62 ngày)</span>
    </p>
    <p style="display: flex; gap: 5px">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-monitor-smartphone">
        <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
        <path d="M10 19v-3.96 3.15" />
        <path d="M7 19h5" />
        <rect width="6" height="10" x="16" y="12" rx="2" />
      </svg>
      Số thiết bị: <span style="font-weight: bold">5</span>
    </p>`;

  const vipSetting = document.querySelector("setting-azota-vip");
  if (vipSetting) {
    const note = vipSetting.querySelector(".note");
    if (note) {
      const noteParent = note.parentElement;
      if (noteParent && !note.dataset.vipAdded) {
        note.remove();
        noteParent.style.display = "flex";
        noteParent.style.flexDirection = "column";
        noteParent.style.gap = "6px";
        noteParent.innerHTML = template;
        note.dataset.vipAdded = "true";
        return true;
      }
      return false;
    }
  }
}

const observer = new MutationObserver(() => {
  main();
});

observer.observe(document.body, { childList: true, subtree: true });
