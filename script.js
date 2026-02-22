
// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinksList = navLinks.querySelectorAll('a');

function updateActiveLink() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinksList.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// Animated Counter
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ========================================
// DNA Double Helix Background
// ========================================
(function initCanvas() {
    const canvas = document.getElementById('dna-canvas');
    const heroEl = document.getElementById('hero');
    if (!canvas || !heroEl) return;
    const ctx = canvas.getContext('2d');

    let W, H, phase = 0;

    const SPEED      = 0.013;
    const WAVELENGTH = 320;
    const AMPLITUDE  = 80;
    const RUNG_STEP  = 22;
    const SEG_STEP   = 2;
    const MAX_UNWIND = 60;   // max extra vertical separation when fully scrolled

    // Base pairs for ATCG reveal
    const BASES = ['A–T', 'T–A', 'C–G', 'G–C'];

    function isDark() { return document.documentElement.classList.contains('dark'); }
    function COL1()     { return isDark() ? [100, 140, 255] : [70, 70, 70]; }
    function COL2()     { return isDark() ? [60,  90,  255] : [120, 120, 120]; }
    function COL_RUNG() { return isDark() ? [80,  120, 255] : [100, 100, 100]; }

    // Scroll-based unwind amount (0 = normal, 1 = fully unwound)
    let unwind = 0;

    // Mouse position in canvas-local coords for ATCG hover
    let hoverX = -9999, hoverY = -9999;
    const HOVER_RADIUS = 40;  // px proximity to show labels

    function rgba([r, g, b], a) {
        return `rgba(${r},${g},${b},${Math.max(0, a).toFixed(3)})`;
    }

    function setup() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    setup();
    let resizeId;
    window.addEventListener('resize', () => {
        clearTimeout(resizeId);
        resizeId = setTimeout(setup, 150);
    });

    // Track scroll for unwind effect
    window.addEventListener('scroll', () => {
        const rect = heroEl.getBoundingClientRect();
        const heroH = rect.height;
        // unwind goes 0→1 as the hero scrolls out of view
        unwind = Math.max(0, Math.min(1, -rect.top / (heroH * 0.6)));
    }, { passive: true });

    // Track mouse for ATCG hover reveal
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        hoverX = e.clientX - rect.left;
        hoverY = e.clientY - rect.top;
    });

    // Helper: get strand Y with unwind separation
    function strandY(cy, k, x, phaseVal, offset, unwindAmt) {
        const base = cy + AMPLITUDE * Math.sin(k * x + phaseVal + offset);
        // Unwind pushes strand 1 up and strand 2 down
        const dir = offset === 0 ? -1 : 1;
        return base + dir * unwindAmt * MAX_UNWIND;
    }

    // ---- Magnifying glass ----
    const ATCG_CHARS = ['A', 'T', 'C', 'G'];
    const MAG_SEQ_LEN = 11; // top strand only — bottom is always the complement
    let magSeq = Array.from({length: MAG_SEQ_LEN}, () => ATCG_CHARS[Math.floor(Math.random() * 4)]);
    function complement(b) { return b==='A'?'T' : b==='T'?'A' : b==='C'?'G' : 'C'; }
    let magAlpha = 0, magTargetAlpha = 0, magFrame = 0;

    function drawMagnifier(mx, my, alpha) {
        if (alpha < 0.01) return;

        const ROW_LEN = 11, ROWS = 2;
        const PAD_X = 14, PAD_Y = 10, LINE_H = 16;
        const RADIUS = 8; // border radius

        ctx.save();
        ctx.font = '600 12px "JetBrains Mono","Courier New",monospace';

        // Measure width from the top strand
        const sampleW = ctx.measureText(magSeq.join(' ')).width;
        const bw = sampleW + PAD_X * 2;
        const bh = ROWS * LINE_H + PAD_Y * 2;

        // Position directly above cursor, centered horizontally
        let ox = mx - bw / 2;
        let oy = my - bh - 14;
        ox = Math.max(4, Math.min(W - bw - 4, ox));
        oy = Math.max(4, Math.min(H - bh - 4, oy));

        const dk = isDark();
        const borderCol = dk ? '80,120,255'  : '100,100,100';
        const bgCol     = dk ? '5,8,20'      : '248,248,248';
        const textCol   = dk ? '120,160,255' : '45,45,45';

        // Rounded rectangle background
        ctx.beginPath();
        ctx.roundRect(ox, oy, bw, bh, RADIUS);
        ctx.fillStyle = `rgba(${bgCol},${(alpha * 0.88).toFixed(3)})`;
        ctx.fill();

        // Border
        ctx.strokeStyle = `rgba(${borderCol},${(alpha * 0.45).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // ATCG sequence — row 0: top strand, row 1: Watson-Crick complement
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        const rows = [magSeq, magSeq.map(complement)];
        for (let r = 0; r < ROWS; r++) {
            ctx.fillStyle = `rgba(${textCol},${(alpha * (0.88 - r * 0.1)).toFixed(3)})`;
            ctx.fillText(
                rows[r].join(' '),
                ox + PAD_X,
                oy + PAD_Y + r * LINE_H + LINE_H / 2
            );
        }

        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        phase += SPEED;

        const k  = (2 * Math.PI) / WAVELENGTH;
        const cy = H / 2;
        const uw = unwind;

        // Cache colors per frame (dark mode aware)
        const c1 = COL1(), c2 = COL2(), cR = COL_RUNG();

        // ---- Pass 1: back rungs ----
        for (let x = 0; x <= W; x += RUNG_STEP) {
            const depth = Math.sin(k * x + phase);
            if (depth >= 0) continue;
            const y1 = strandY(cy, k, x, phase, 0, uw);
            const y2 = strandY(cy, k, x, phase, Math.PI, uw);
            const a  = (0.04 + (1 + depth) * 0.05) * (1 - uw * 0.8);
            if (a < 0.005) continue;
            ctx.strokeStyle = rgba(cR, a);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
        }

        // ---- Pass 2: strand segments ----
        for (let x = 0; x <= W - SEG_STEP; x += SEG_STEP) {
            const angle  = k * x + phase;
            const depth1 = Math.sin(angle);
            const depth2 = -depth1;

            const xa = x, xb = x + SEG_STEP;

            // Strand 1
            const y1a = strandY(cy, k, xa, phase, 0, uw);
            const y1b = strandY(cy, k, xb, phase, 0, uw);
            ctx.strokeStyle = rgba(c1, 0.12 + depth1 * 0.22);
            ctx.lineWidth   = 1.2 + depth1 * 0.6;
            ctx.beginPath();
            ctx.moveTo(xa, y1a);
            ctx.lineTo(xb, y1b);
            ctx.stroke();

            // Strand 2
            const y2a = strandY(cy, k, xa, phase, Math.PI, uw);
            const y2b = strandY(cy, k, xb, phase, Math.PI, uw);
            ctx.strokeStyle = rgba(c2, 0.12 + depth2 * 0.22);
            ctx.lineWidth   = 1.2 + depth2 * 0.6;
            ctx.beginPath();
            ctx.moveTo(xa, y2a);
            ctx.lineTo(xb, y2b);
            ctx.stroke();
        }

        // ---- Pass 3: front rungs + dots + ATCG hover labels ----
        let minDistToRung = Infinity;
        for (let x = 0; x <= W; x += RUNG_STEP) {
            const depth = Math.sin(k * x + phase);
            if (depth < 0) continue;
            const y1   = strandY(cy, k, x, phase, 0, uw);
            const y2   = strandY(cy, k, x, phase, Math.PI, uw);
            const a    = (0.10 + depth * 0.18) * (1 - uw * 0.8);
            const dotR = 2 + depth * 1.5;

            // Rung line (fades with unwind)
            if (a > 0.005) {
                ctx.strokeStyle = rgba(cR, a);
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x, y1);
                ctx.lineTo(x, y2);
                ctx.stroke();
            }

            // Endpoint dots (always visible)
            const dotA = 0.10 + depth * 0.18 + 0.1;
            ctx.fillStyle = rgba(c1, dotA);
            ctx.beginPath();
            ctx.arc(x, y1, dotR, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = rgba(c2, dotA);
            ctx.beginPath();
            ctx.arc(x, y2, dotR, 0, Math.PI * 2);
            ctx.fill();

            // Track closest rung for magnifier trigger
            const midX = x;
            const midY = (y1 + y2) / 2;
            const dx = hoverX - midX;
            const dy = hoverY - midY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDistToRung) minDistToRung = dist;
        }

        // ---- Magnifying glass update & draw ----
        magFrame++;
        if (magFrame % 12 === 0) {          // scroll one letter every ~12 frames
            magSeq.shift();
            magSeq.push(ATCG_CHARS[Math.floor(Math.random() * 4)]);
        }
        const MAG_TRIGGER = 130;
        magTargetAlpha = (minDistToRung < MAG_TRIGGER && uw < 0.3)
            ? Math.max(0, 1 - minDistToRung / MAG_TRIGGER) : 0;
        magAlpha += (magTargetAlpha - magAlpha) * 0.08; // smooth fade
        drawMagnifier(hoverX, hoverY, magAlpha);

        requestAnimationFrame(draw);
    }

    draw();
})();

// ========================================
// Floating Mini DNA Helices
// ========================================
(function initFloatingDNA() {
    const canvas = document.getElementById('particles-canvas');
    const heroEl = document.getElementById('hero');
    if (!canvas || !heroEl) return;
    const ctx = canvas.getContext('2d');

    const NUM          = 18;
    const REPEL_RADIUS = 55;   // px — cursor repulsion range
    const REPEL_FORCE  = 0.25; // push strength
    const FRICTION     = 0.94; // velocity damping after repulsion
    let W, H, helices = [];
    let mouseX = -9999, mouseY = -9999;  // in canvas-local coords

    function rnd(a, b) { return a + Math.random() * (b - a); }

    // Exclusion zone: center of hero (local canvas coords)
    function inExclusionZone(x, y) {
        const cx = W / 2;
        const cy = H / 2;
        const halfW = W * 0.35;
        const halfH = H * 0.35;
        return Math.abs(x - cx) < halfW && Math.abs(y - cy) < halfH;
    }

    function randomTarget() {
        let x, y, attempts = 0;
        do {
            x = rnd(0, W);
            y = rnd(0, H);
            attempts++;
        } while (inExclusionZone(x, y) && attempts < 50);
        return { x, y };
    }

    function spawn(fromX, fromY) {
        const target = randomTarget();
        const traveling = (fromX !== undefined && fromY !== undefined);
        const startX = traveling ? fromX : target.x;
        const startY = traveling ? fromY : target.y;
        return {
            x: startX, y: startY,
            vx:    rnd(-0.2, 0.2),
            vy:    rnd(-0.2, 0.2),
            rot:   rnd(0, Math.PI * 2),
            spin:  rnd(-0.003, 0.003),
            phase: rnd(0, Math.PI * 2),
            speed: rnd(0.008, 0.018),
            len:   rnd(30, 55),
            amp:   rnd(6, 10),
            alpha: rnd(0.12, 0.28),
            rungs: Math.floor(rnd(3, 6)),
            colorIdx: Math.floor(Math.random() * 3),
            mutating: 0,
            traveling,
            travelT: 0,
            travelSX: startX, travelSY: startY,
            travelEX: target.x, travelEY: target.y,
        };
    }

    function setup() {
        W = canvas.width  = heroEl.offsetWidth;
        H = canvas.height = heroEl.offsetHeight;
        if (helices.length === 0) helices = Array.from({ length: NUM }, spawn);
    }

    setup();

    let rid;
    window.addEventListener('resize', () => {
        clearTimeout(rid);
        rid = setTimeout(() => {
            W = canvas.width  = heroEl.offsetWidth;
            H = canvas.height = heroEl.offsetHeight;
        }, 200);
    });

    // Track mouse — convert to canvas-local coords
    window.addEventListener('mousemove', (e) => {
        const rect = heroEl.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    window.addEventListener('mouseleave', () => {
        mouseX = -9999;
        mouseY = -9999;
    });

    // Click-to-mutate: detect clicks near mini helices
    // Use mousedown to catch before repulsion moves them away
    window.addEventListener('mousedown', (e) => {
        const rect = heroEl.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        if (cx < 0 || cy < 0 || cx > W || cy > H) return;
        for (const h of helices) {
            const dx = h.x - cx;
            const dy = h.y - cy;
            if (Math.sqrt(dx * dx + dy * dy) < h.len) {
                h.mutating = 1.0;
                // Give a little kick outward on mutate
                const d = Math.sqrt(dx * dx + dy * dy) || 1;
                h.vx += (dx / d) * 1.5;
                h.vy += (dy / d) * 1.5;
                break;
            }
        }
    });

    function drawMiniHelix(h) {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rot);

        // Travel scale
        const ts = h.travelScale !== undefined ? h.travelScale : 1;
        if (ts !== 1) ctx.scale(ts, ts);

        // Shine glow during spawn phase
        const shine = h.shineAlpha || 0;
        if (shine > 0) {
            ctx.shadowBlur = 35 * shine;
            ctx.shadowColor = `rgba(80, 130, 255, ${(shine * 1.0).toFixed(3)})`;
        }

        const m = h.mutating;  // 1→0 mutation progress
        // During mutation: scale pulse, extra amplitude wobble, glow
        const scale = 1 + m * 0.9 * Math.sin(m * Math.PI * 3);
        if (m > 0) ctx.scale(scale, scale);

        const ampMod = m > 0 ? h.amp * (1 + m * 0.5 * Math.sin(m * 20)) : h.amp;
        const steps = 24;
        const stepH = h.len / steps;
        const k     = (2 * Math.PI) / h.len;

        // Dark mode: jellyfish colour palette — cyan / blue / purple variants
        const dk = document.documentElement.classList.contains('dark');
        const JELLY_BLUE = { s0: [100, 140, 255], s1: [60, 90, 255], rung: [80, 120, 255], dot: [120, 160, 255], glow: 'rgba(80,120,255,0.65)' };
        const jpal = dk ? JELLY_BLUE : null;
        const alphaBoost = dk ? 2.2 : 1.0;

        // (no glow ring on mutation)

        // Draw two strands
        ctx.lineWidth = 1.2;
        if (dk && jpal) {
            ctx.shadowBlur = 14 + m * 40;
            ctx.shadowColor = jpal.glow;
        }
        for (let strand = 0; strand < 2; strand++) {
            const offset = strand * Math.PI;
            const col = dk ? (strand === 0 ? jpal.s0 : jpal.s1)
                           : (strand === 0 ? [80, 80, 80] : [130, 130, 130]);
            ctx.beginPath();
            for (let i = 0; i <= steps; i++) {
                const yy    = -h.len / 2 + i * stepH;
                const depth = Math.sin(k * (yy + h.len / 2) + h.phase + offset);
                const xx    = ampMod * depth;
                const a     = h.alpha * alphaBoost * (0.5 + 0.5 * Math.abs(depth)) + m * 0.5;
                if (i === 0) {
                    ctx.moveTo(xx, yy);
                } else {
                    ctx.lineTo(xx, yy);
                }
                ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${Math.min(1, a).toFixed(3)})`;
            }
            ctx.stroke();
        }

        // Draw rungs between strands
        const rungSpacing = h.len / (h.rungs + 1);
        ctx.lineWidth = 0.8;
        for (let r = 1; r <= h.rungs; r++) {
            const yy    = -h.len / 2 + r * rungSpacing;
            const depth = Math.sin(k * (yy + h.len / 2) + h.phase);
            const x1    = ampMod * depth;
            const x2    = ampMod * Math.sin(k * (yy + h.len / 2) + h.phase + Math.PI);
            const a     = h.alpha * alphaBoost * 0.6 + m * 0.15;
            const rc = dk ? jpal.rung : [110, 110, 110];
            ctx.strokeStyle = `rgba(${rc[0]},${rc[1]},${rc[2]},${Math.min(1, a).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(x1, yy);
            ctx.lineTo(x2, yy);
            ctx.stroke();

            // Tiny dots at rung endpoints
            const dotR = 1.2 + Math.abs(depth) * 0.6;
            const dc = dk ? jpal.dot : [100, 100, 100];
            ctx.fillStyle = `rgba(${dc[0]},${dc[1]},${dc[2]},${Math.min(1, a + 0.05).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(x1, yy, dotR, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x2, yy, dotR, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        for (const h of helices) {
            // Travel animation: shine near button, then glide to destination
            if (h.traveling) {
                h.travelT = Math.min(1, h.travelT + 0.009);
                const SHINE_END = 0.11;
                if (h.travelT <= SHINE_END) {
                    // Shine phase: stay at button, big and glowing
                    const sp = h.travelT / SHINE_END; // 0 → 1
                    h.x = h.travelSX;
                    h.y = h.travelSY;
                    h.travelScale = 2.8 - sp * 1.8; // 2.8 → 1.0
                    h.shineAlpha = 1 - sp;           // 1 → 0
                } else {
                    // Travel phase: ease-out cubic to destination
                    const tp = (h.travelT - SHINE_END) / (1 - SHINE_END); // 0 → 1
                    const ease = 1 - Math.pow(1 - tp, 3);
                    h.x = h.travelSX + (h.travelEX - h.travelSX) * ease;
                    h.y = h.travelSY + (h.travelEY - h.travelSY) * ease;
                    h.travelScale = 1.0;
                    h.shineAlpha = 0;
                }
                h.rot += h.spin;
                h.phase += h.speed;
                if (h.travelT >= 1) {
                    h.traveling = false;
                    h.travelScale = 1;
                    h.shineAlpha = 0;
                }
                drawMiniHelix(h);
                continue;
            }

            // Cursor repulsion
            const dx = h.x - mouseX;
            const dy = h.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < REPEL_RADIUS && dist > 0) {
                const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
                h.vx += (dx / dist) * force;
                h.vy += (dy / dist) * force;
            }

            // Apply friction to damp repulsion velocity
            h.vx *= FRICTION;
            h.vy *= FRICTION;

            // Soft push away from exclusion zone
            if (inExclusionZone(h.x, h.y)) {
                const ecx = W / 2;
                const ecy = H / 2;
                const ex = h.x - ecx;
                const ey = h.y - ecy;
                const ed = Math.sqrt(ex * ex + ey * ey) || 1;
                h.vx += (ex / ed) * 0.3;
                h.vy += (ey / ed) * 0.3;
            }

            // Tick mutation animation
            if (h.mutating > 0) h.mutating = Math.max(0, h.mutating - 0.032);

            // Normal movement
            h.x += h.vx;
            h.y += h.vy;
            h.rot   += h.spin;
            h.phase += h.speed;

            // Wrap around edges (with buffer for helix size)
            if (h.x < -60) h.x = W + 60;
            if (h.x > W + 60) h.x = -60;
            if (h.y < -60) h.y = H + 60;
            if (h.y > H + 60) h.y = -60;

            drawMiniHelix(h);
        }

        requestAnimationFrame(draw);
    }

    draw();

    // Expose API — add(fromX, fromY) spawns with travel animation from canvas coords
    window.floatingDNA = {
        add(fromX, fromY) {
            helices.push(spawn(fromX, fromY));
            return helices.length;
        },
        remove() {
            if (helices.length > 1) helices.pop();
            return helices.length;
        },
        count() { return helices.length; },
        // Returns canvas element for coordinate mapping
        canvas,
        heroEl,
    };
})();

// ========================================
// Dark Mode Toggle
// ========================================
(function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // Check saved preference or system preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Pulse hint on every visit
    setTimeout(() => {
        btn.classList.add('pulse-hint');
        btn.addEventListener('animationend', () => {
            btn.classList.remove('pulse-hint');
        }, { once: true });
    }, 1800);
})();

// ========================================
// DNA Spawn Button (hero bottom-right)
// ========================================
(function initDNASpawnBtn() {
    const btn = document.getElementById('dna-spawn-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        if (!window.floatingDNA) return;
        // Get button center in canvas-local coordinates
        const heroEl = window.floatingDNA.heroEl;
        const heroRect = heroEl.getBoundingClientRect();
        const btnRect  = btn.getBoundingClientRect();
        // Offset spawn point above-left of button so it's visible and not hidden under it
        const fromX = (btnRect.left + btnRect.width  / 2) - heroRect.left - 65;
        const fromY = (btnRect.top  + btnRect.height / 2) - heroRect.top  - 75;
        window.floatingDNA.add(fromX, fromY);
    });
})();

// ========================================
// Scroll Reveal
// ========================================
function setupReveal() {
    const elements = document.querySelectorAll(
        '.service-card, .skills-category, .project-card, .pubsoft-card, .highlight, .about-image, .about-text, .contact-info, .contact-form'
    );
    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

setupReveal();


// ========================================
// Typewriter Effect
// ========================================
// Each phrase is an array of segments: { t: 'text', cls: 'optional-class' }
const typewriterPhrases = [
    [{ t: 'Nice to meet you! :)' }],
    [
        { t: "I'm passionate about life sciences, " },
        { t: '<coding>', cls: 'tw-code' },
        { t: '\nand data visualization.' }
    ],
    [{ t: 'Fascinated by how data-driven approaches\ncan address biological questions.' }],
    [{ t: 'How can I help you unlock your data?' }],
];

(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    // Get flat plain text of all segments (for length counting)
    function flatText(segments) {
        return segments.map(s => s.t).join('');
    }

    // Build innerHTML showing only charCount characters, preserving segment styles
    function buildHTML(segments, charCount) {
        let remaining = charCount;
        let html = '';
        for (const seg of segments) {
            if (remaining <= 0) break;
            const shown = seg.t.slice(0, remaining);
            remaining -= seg.t.length;
            const escaped = shown.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            if (seg.cls) {
                html += `<span class="${seg.cls}">${escaped}</span>`;
            } else {
                html += escaped;
            }
        }
        return html;
    }

    function tick() {
        const phrases = typewriterPhrases;
        const segments = phrases[phraseIndex % phrases.length];
        const flat = flatText(segments);

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        el.innerHTML = buildHTML(segments, charIndex);

        let delay = isDeleting ? 30 : 50;

        if (!isDeleting && charIndex === flat.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }

        timer = setTimeout(tick, delay);
    }

    // Start after hero fade-in
    setTimeout(tick, 1000);
})();

// ========================================
// Contact Form
// ========================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill in all fields.';
        return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Message sent successfully. I will reply shortly.';
        contactForm.reset();
        btn.querySelector('span').textContent = originalText;
        btn.disabled = false;

        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';
        }, 5000);
    }, 1500);
});
