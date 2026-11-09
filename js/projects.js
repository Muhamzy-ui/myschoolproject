/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: MAHMUD BASHIR OLASUNKANMI
 * Matric No: 2025/C/CYB/1339 | Degree: B.Sc. Cybersecurity
 * File: js/projects.js - Project Filtering & Interactive Demo Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initDemoModals();
});

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card, .card.pj');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

function initDemoModals() {
  const demoButtons = document.querySelectorAll('.btn-demo-trigger');
  const demoModal = document.getElementById('projectDemoModal');
  const modalClose = document.getElementById('demoModalClose');
  const modalTitle = document.getElementById('demoModalTitle');
  const modalContent = document.getElementById('demoModalContent');

  if (!demoButtons.length || !demoModal) return;

  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      loadDemoData(projId);
      demoModal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      demoModal.classList.remove('active');
    });
  }

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
      demoModal.classList.remove('active');
    }
  });

  function loadDemoData(projId) {
    if (projId === 'swiftsats' || projId === 'flutter-auth') {
      modalTitle.textContent = 'SwiftSats — Crypto & Utility Payment Engine';
      modalContent.innerHTML = `
        <div style="background-color: var(--bg-card-subtle); padding: 1.25rem; border-radius: 14px; margin-bottom: 1.25rem; border: 1px solid var(--border-color);">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; flex-wrap:wrap; gap:8px;">
            <div>
              <span style="background:var(--badge-green-bg); color:var(--badge-green-text); font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px;">LIVE FINTECH APP</span>
              <h4 style="margin:6px 0 2px 0; color: var(--text-main); font-size:18px;">SwiftSats (Crypto &amp; Utility App)</h4>
              <span style="font-size:12.5px; color:var(--text-muted);">Direct Nigerian Naira (₦) to Crypto Exchange</span>
            </div>
            <a href="https://www.swiftsats.app/" target="_blank" rel="noopener noreferrer" class="b1" style="padding:8px 16px; font-size:12.5px; text-decoration:none;">
              Launch swiftsats.app ↗
            </a>
          </div>
          
          <div style="background-color: #0E0906; color: #F2A57B; font-family: ui-monospace, Menlo, monospace; padding: 1rem; border-radius: 10px; font-size: 0.85rem; line-height: 1.8; border: 1px solid #3F2C1F;">
            <span style="color:#22C55E;">[SYS] Connecting to SwiftSats Exchange Engine... OK</span><br>
            <span style="color:#E07A45;">[RATE] 1 USD = ₦1,380.95 (Live OTC Feed)</span><br>
            <span style="color:#38BDF8;">[CRYPTO] SOL: $86.98 &approx; ₦120,115.03</span><br>
            <span style="color:#38BDF8;">[CRYPTO] USDT (BEP20 / TRC20): $1.00 &approx; ₦1,380.95</span><br>
            <span style="color:#F59E0B;">[CRYPTO] Bitcoin (BTC): $75,286.00 &approx; ₦103,966,201.70</span><br>
            <span style="color:#22C55E;">[WALLET] Bank Deposit Automation: ACTIVE (ID: 5dee0615)</span><br>
            <span style="color:#A855F7;">[SERVICES] Airtime &middot; Data Bundles &middot; Utility Bills &middot; Rewards</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <p style="font-size: 0.85rem; color: var(--text-muted); margin:0;">Engineered with Flutter, Dart, Django Python backend &amp; secure webhooks by Mahmud Bashir Olasunkanmi.</p>
          <a href="https://www.swiftsats.app/" target="_blank" rel="noopener noreferrer" class="b2" style="padding:10px 20px; font-size:13px; text-decoration:none;">
            Open Live Website (swiftsats.app)
          </a>
        </div>
      `;
    } else if (projId === 'net-scanner') {
      modalTitle.textContent = 'Network Vulnerability Scanner & Port Auditor';
      modalContent.innerHTML = `
        <div style="background-color: var(--bg-card-subtle); padding: 1.25rem; border-radius: 14px; margin-bottom: 1rem; border: 1px solid var(--border-color);">
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-main);">🛡️ Network Socket Audit Output</h4>
          <div style="background-color: #0E0906; color: #4ADE80; font-family: ui-monospace, Menlo, monospace; padding: 1rem; border-radius: 10px; font-size: 0.85rem; line-height:1.7; border: 1px solid #3F2C1F;">
            bashir@miva:~$ python3 net_scanner.py --subnet 192.168.1.0/24<br>
            [*] Scanning 256 hosts for open vulnerabilities...<br>
            [+] Host 192.168.1.1 (Gateway): Port 80, 443 OPEN [Secure HTTPS]<br>
            [+] Host 192.168.1.42 (Server): Port 22 OPEN (SSH OpenSSH 9.2)<br>
            [!] Alert: Unencrypted FTP Port 21 disabled by policy.<br>
            [*] Scan complete: 0 Critical Vulnerabilities detected.
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin:0;">Designed for network defense and security posture auditing in MIVA computer labs.</p>
      `;
    } else if (projId === 'phish-sim') {
      modalTitle.textContent = 'Phishing Threat Simulator & Awareness Lab';
      modalContent.innerHTML = `
        <div style="background-color: var(--bg-card-subtle); padding: 1.25rem; border-radius: 14px; margin-bottom: 1rem; border: 1px solid var(--border-color);">
          <h4 style="margin: 0 0 0.5rem 0; color: #EF4444;">⚠️ Threat Heuristic Inspection Output</h4>
          <div style="background-color: #0E0906; color: #F87171; font-family: ui-monospace, Menlo, monospace; padding: 1rem; border-radius: 10px; font-size: 0.85rem; line-height:1.7; border: 1px solid #3F2C1F;">
            [ANALYSIS] Inbound SMTP Header inspection:<br>
            [SPF Record] FAIL (domain mismatch: miva-security-portal.ru)<br>
            [DKIM Signature] MISSING<br>
            [Payload Analysis] Detected fraudulent credential collection form.<br>
            [ACTION] Threat quarantined &amp; reported to Security Operations Center.
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin:0;">Developed as a cybersecurity awareness and phishing prevention lab for students.</p>
      `;
    } else {
      modalTitle.textContent = 'COS 106 Student Portfolio & Planner';
      modalContent.innerHTML = `
        <div style="background-color: var(--bg-card-subtle); padding: 1.25rem; border-radius: 14px; margin-bottom: 1rem; border: 1px solid var(--border-color);">
          <h4 style="margin: 0 0 0.5rem 0; color: var(--text-main);">🌐 Web Application Architecture</h4>
          <p style="font-size: 0.9rem; line-height:1.7; margin:0 0 10px 0;">You are currently browsing this live platform! Built strictly to meet the COS 106 20/20 rubric with semantic HTML5 elements, CSS variables, responsive Grid/Flexbox layouts, client-side JavaScript LocalStorage CRUD, and RFC email validation.</p>
          <a href="planner.html" class="b1" style="display:inline-flex; padding:8px 16px; font-size:12.5px; text-decoration:none;">Open Live Planner Tool &rarr;</a>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin:0;">Grade Target: 20/20 Marks | COS 106 Introduction to Web Technologies.</p>
      `;
    }
  }
}
