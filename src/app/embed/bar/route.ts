const script = String.raw`(() => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const currentScript = document.currentScript;

  if (!(currentScript instanceof HTMLScriptElement)) {
    return;
  }

  const existingBar = document.getElementById("digital-deadman-bar");

  if (existingBar) {
    return;
  }

  const projectToken = currentScript.dataset.ddmProjectToken || "";

  if (!projectToken) {
    return;
  }

  const accent = currentScript.dataset.ddmAccent || "#ef4444";
  const textColor = currentScript.dataset.ddmTextColor || "#fff7ed";

  function renderBar(payload) {
    if (!payload || payload.status !== "pending") {
      return;
    }

    const bar = document.createElement("div");
    bar.id = "digital-deadman-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Payment reminder");

    bar.style.position = "fixed";
    bar.style.top = "0";
    bar.style.left = "0";
    bar.style.right = "0";
    bar.style.zIndex = "2147483647";
    bar.style.display = "flex";
    bar.style.alignItems = "center";
    bar.style.justifyContent = "space-between";
    bar.style.gap = "16px";
    bar.style.padding = "12px 18px";
    bar.style.boxSizing = "border-box";
    bar.style.fontFamily =
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    bar.style.background =
      "linear-gradient(90deg, rgba(127, 29, 29, 0.96), rgba(153, 27, 27, 0.94))";
    bar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.14)";
    bar.style.color = textColor;
    bar.style.backdropFilter = "blur(14px)";
    bar.style.boxShadow = "0 14px 35px rgba(0, 0, 0, 0.28)";

    const content = document.createElement("div");
    content.style.minWidth = "0";

    const title = document.createElement("div");
    title.textContent = "Final payment pending";
    title.style.fontSize = "14px";
    title.style.fontWeight = "700";
    title.style.letterSpacing = "0.01em";
    title.style.marginBottom = "2px";

    const message = document.createElement("div");
    message.textContent =
      payload.customMessage ||
      payload.projectName +
        " for " +
        payload.clientName +
        " remains under freelancer protection until the invoice is cleared.";
    message.style.fontSize = "13px";
    message.style.lineHeight = "1.45";
    message.style.opacity = "0.92";

    content.appendChild(title);
    content.appendChild(message);

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.alignItems = "center";
    actions.style.gap = "10px";
    actions.style.flexShrink = "0";

    const badge = document.createElement("div");
    badge.textContent = "Protected by Digital Deadman";
    badge.style.padding = "8px 12px";
    badge.style.borderRadius = "999px";
    badge.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    badge.style.background = "rgba(255, 255, 255, 0.08)";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "600";
    badge.style.whiteSpace = "nowrap";

    actions.appendChild(badge);

    if (payload.invoiceUrl) {
      const link = document.createElement("a");
      link.href = payload.invoiceUrl;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "View invoice";
      link.style.padding = "9px 14px";
      link.style.borderRadius = "999px";
      link.style.background = accent;
      link.style.color = "#ffffff";
      link.style.fontSize = "12px";
      link.style.fontWeight = "700";
      link.style.textDecoration = "none";
      link.style.whiteSpace = "nowrap";
      actions.appendChild(link);
    }

    if (payload.contactEmail) {
      const email = document.createElement("a");
      email.href = "mailto:" + payload.contactEmail;
      email.textContent = "Contact freelancer";
      email.style.color = textColor;
      email.style.fontSize = "12px";
      email.style.fontWeight = "600";
      email.style.textDecoration = "none";
      email.style.whiteSpace = "nowrap";
      actions.appendChild(email);
    }

    bar.appendChild(content);
    bar.appendChild(actions);
    document.body.appendChild(bar);

    const body = document.body;
    const currentOffset = parseFloat(body.dataset.ddmBodyOffset || "0");
    const barHeight = bar.getBoundingClientRect().height;
    body.dataset.ddmBodyOffset = String(currentOffset + barHeight);
    body.style.marginTop = currentOffset + barHeight + "px";

    if (!document.getElementById("digital-deadman-bar-style")) {
      const style = document.createElement("style");
      style.id = "digital-deadman-bar-style";
      style.textContent = "@media (max-width: 720px) { #digital-deadman-bar { align-items: flex-start !important; flex-direction: column !important; } }";
      document.head.appendChild(style);
    }
  }

  const baseUrl = new URL(currentScript.src).origin;
  const endpoint = baseUrl + "/api/projects/" + encodeURIComponent(projectToken);

  fetch(endpoint, {
    headers: {
      "X-Digital-Deadman-Host": window.location.host,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load project state");
      }

      return response.json();
    })
    .then((payload) => {
      renderBar(payload);
    })
    .catch(() => {
      return;
    });
})();`;

export function GET() {
  return new Response(script, {
    headers: {
      "content-type": "application/javascript; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
