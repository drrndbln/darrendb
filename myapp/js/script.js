
document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------
     Typing Effect Below Hero Title
  --------------------------------- */
  const typedText = document.querySelector(".typed-text");
  const words = ["Developer", "Creator", "Technopreneur", "Leader", "Critical Thinker"];
  let wordIndex = 0;
  let charIndex = 0;

  const typingDelay = 100;
  const erasingDelay = 50;
  const newWordDelay = 1200;

  function type() {
    if (charIndex < words[wordIndex].length) {
      typedText.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingDelay + 300);
    }
  }

  // Start typing effect after initial delay
  setTimeout(type, 1600);

  /* -------------------------------
     Flowing Wave Background Animation
  --------------------------------- */
  const canvas = document.getElementById("waveCanvas");
  const ctx = canvas.getContext("2d");

  let width = window.innerWidth;
  let height = window.innerHeight; 
  let t = 0;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function animateWaves() {
    ctx.clearRect(0, 0, width, height);

    const lineCount = 10;
    const baseY = height * 0.65;

    for (let i = 0; i < lineCount; i++) {
      const amplitude1 = 60 + i * 15;
      const amplitude2 = 30 + i * 8;
      const amplitude3 = 15 + i * 4;
      const frequency1 = 0.003 + i * 0.0002;
      const frequency2 = 0.006 + i * 0.0003;
      const frequency3 = 0.012 + i * 0.0004;
      const timeOffset = i * 0.3;
      const verticalOffset = i * 20;

      let points = [];

      for (let x = 0; x <= width; x += 2) {
        let y =
          baseY - verticalOffset +
          Math.sin(x * frequency1 + t * 0.4 + timeOffset) * amplitude1 +
          Math.sin(x * frequency2 + t * 0.6 + timeOffset * 1.5) * amplitude2 +
          Math.sin(x * frequency3 + t * 0.8 + timeOffset * 2) * amplitude3 +
          Math.sin(x * 0.001 + t * 0.2 + timeOffset * 0.5) * 20;

        points.push([x, y]);
      }

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);

      for (let p = 1; p < points.length - 2; p++) {
        let xc = (points[p][0] + points[p + 1][0]) / 2;
        let yc = (points[p][1] + points[p + 1][1]) / 2;
        ctx.quadraticCurveTo(points[p][0], points[p][1], xc, yc);
      }

      ctx.quadraticCurveTo(
        points[points.length - 2][0],
        points[points.length - 2][1],
        points[points.length - 1][0],
        points[points.length - 1][1]
      );

       const opacity = Math.max(0.1, 0.6 - i * 0.06);
      const gradient = ctx.createLinearGradient(
        0,
        baseY - verticalOffset - 100,
        0,
        baseY - verticalOffset + 100
      );
      gradient.addColorStop(0, `rgba(0,255,255,${opacity * 0.2})`);
      gradient.addColorStop(0.5, `rgba(0,255,255,${opacity})`);
      gradient.addColorStop(1, `rgba(0,255,255,${opacity * 0.3})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5 - i * 0.1;
      ctx.shadowBlur = 8 + i;
      ctx.shadowColor = `rgba(0,255,255,${opacity * 0.5})`; // glow cyan
      ctx.stroke();
    }

    t += 0.01;
    requestAnimationFrame(animateWaves);
  }

  animateWaves();

/* -------------------------------
     Timeline Line Animation
  --------------------------------- */
const timeline = document.querySelector(".timeline-line");
const timelineTip = document.querySelector(".timeline-tip");
const experienceSection = document.querySelector("#experience");

const MAX_LINE_HEIGHT = 630; // set the maximum line length you want

function updateTimeline() {
  const sectionTop = experienceSection.offsetTop;
  const sectionHeight = experienceSection.offsetHeight;
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;

  // Calculate scroll progress relative to the section
  const progress = Math.min(Math.max((scrollY - sectionTop + viewportHeight / 2) / sectionHeight, 0), 1);

  // Set the line height with a maximum limit
  timeline.style.height = progress * MAX_LINE_HEIGHT + "px";

  // Position the tip at the center of the viewport
  timelineTip.style.top = (scrollY + viewportHeight / 2 - timeline.offsetTop) + "px";
}

window.addEventListener("scroll", updateTimeline);
updateTimeline(); // Run once on load

  /* -------------------------------
       Electric Border Animation
  --------------------------------- */
  const borders = document.querySelectorAll(".electric-border");

borders.forEach((border, index) => {
  const stroke = border.querySelector(".eb-stroke");

  // Unique filter ID
  const filterId = `turbulent-displace-${index}`;
  const svgNS = "http://www.w3.org/2000/svg";

  // Create SVG container
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "eb-svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  const defs = document.createElementNS(svgNS, "defs");
  const filter = document.createElementNS(svgNS, "filter");
  filter.setAttribute("id", filterId);
  filter.setAttribute("colorInterpolationFilters", "sRGB");
  filter.setAttribute("x", "-50%");
  filter.setAttribute("y", "-50%");
  filter.setAttribute("width", "200%");
  filter.setAttribute("height", "200%");

  // Utility: noise layer
  const createNoiseLayer = (seed, attr, values) => {
    const turbulence = document.createElementNS(svgNS, "feTurbulence");
    turbulence.setAttribute("type", "turbulence");
    turbulence.setAttribute("baseFrequency", "0.02");
    turbulence.setAttribute("numOctaves", "10");
    turbulence.setAttribute("seed", seed);
    turbulence.setAttribute("result", `noise${seed}`);

    const offset = document.createElementNS(svgNS, "feOffset");
    offset.setAttribute("in", `noise${seed}`);
    offset.setAttribute("dx", "0");
    offset.setAttribute("dy", "0");
    offset.setAttribute("result", `offsetNoise${seed}`);

    const animate = document.createElementNS(svgNS, "animate");
    animate.setAttribute("attributeName", attr);
    animate.setAttribute("values", values);
    animate.setAttribute("dur", "6s");
    animate.setAttribute("repeatCount", "indefinite");
    animate.setAttribute("calcMode", "linear");

    offset.appendChild(animate);
    return [turbulence, offset];
  };

  // Noise layers (X + Y directions)
  const [t1, o1] = createNoiseLayer("1a", "dy", "700; 0");
  const [t2, o2] = createNoiseLayer("1b", "dy", "0; -700");
  const [t3, o3] = createNoiseLayer("2a", "dx", "490; 0");
  const [t4, o4] = createNoiseLayer("2b", "dx", "0; -490");

  filter.append(t1, o1, t2, o2, t3, o3, t4, o4);

  // Merge all offsets
  const merge = document.createElementNS(svgNS, "feMerge");
  ["offsetNoise1a", "offsetNoise1b", "offsetNoise2a", "offsetNoise2b"].forEach(id => {
    const node = document.createElementNS(svgNS, "feMergeNode");
    node.setAttribute("in", id);
    merge.appendChild(node);
  });
  merge.setAttribute("result", "mergedNoise");
  filter.appendChild(merge);

  // Displacement
  const displacement = document.createElementNS(svgNS, "feDisplacementMap");
  displacement.setAttribute("in", "SourceGraphic");
  displacement.setAttribute("in2", "mergedNoise");
  displacement.setAttribute("scale", "30");
  displacement.setAttribute("xChannelSelector", "R");
  displacement.setAttribute("yChannelSelector", "B");

  filter.appendChild(displacement);
  defs.appendChild(filter);
  svg.appendChild(defs);

  // Insert SVG
  border.insertBefore(svg, border.firstChild);

  // Apply filter
  if (stroke) {
    stroke.style.filter = `url(#${filterId})`;
  }
});


  /* -------------------------------
       hover in projects card
  --------------------------------- */
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X inside card
    const y = e.clientY - rect.top;  // mouse Y inside card

    const rotateX = ((y / rect.height) - 0.5) * 20; // max 20deg
    const rotateY = ((x / rect.width) - 0.5) * -20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.classList.add("reset-tilt");
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    setTimeout(() => card.classList.remove("reset-tilt"), 500);
  });
});

 /* -------------------------------
       Carousel for conference 
  --------------------------------- */
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
let currentIndex = 0;

function updateCarousel() {
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  const nextIndex = (currentIndex + 1) % totalItems;

  items.forEach((item, i) => {
  item.classList.remove('active', 'prev', 'next', 'behind-prev', 'behind-next');

  if (i === currentIndex) {
    item.classList.add('active');
  } else if (i === prevIndex) {
    item.classList.add('prev');
  } else if (i === nextIndex) {
    item.classList.add('next');
  } else if (i < currentIndex) {
    item.classList.add('behind-prev');
  } else if (i > currentIndex) {
    item.classList.add('behind-next');
  }
});
}

// Add a tiny delay to allow CSS transition to run smoothly
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
});

// Initialize carousel
updateCarousel();
});
