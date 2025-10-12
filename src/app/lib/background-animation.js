import React, { useEffect } from 'react';

export const initBackgroundAnimation = (canvas, starImages) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let width, height, points, mouseTarget, animateHeader = true;
  let amblingTarget = { x: 0, y: 0 };
  let amblingDestination = { x: 0, y: 0 };
  let isMovingToDestination = false;
  const JITTER_STRENGTH = 0;
  const AMBIENT_SPEED = 1;

  // Utility function to get distance between two points
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  // Function to draw lines between points
  function drawLines(p) {
    if (!p.active) return;
    
    const pRadius = p.isStar ? p.size / 2 : p.radius;
    const closestMultiplier = 4;
    const pMultiplier = 2;

    for (const i in p.closest) {
      const closestPoint = p.closest[i];
      const dist = Math.sqrt(getDistance(p, closestPoint));
      const closestRadius = closestPoint.isStar ? closestPoint.size / 2 : closestPoint.radius;
  
      if (dist > 0) {
        const unitX = (closestPoint.x - p.x) / dist;
        const unitY = (closestPoint.y - p.y) / dist;
  
        const startX = p.x + unitX * (pMultiplier * pRadius);
        const startY = p.y + unitY * (pMultiplier * pRadius);
  
        const endX = closestPoint.x - unitX * (closestMultiplier * closestRadius);
        const endY = closestPoint.y - unitY * (closestMultiplier * closestRadius);
  
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(156,217,249, ${p.active})`;
        ctx.stroke();
      }
    }
  }

  // Function to shift points over time
  function shiftPoint(p) {
    p.x += Math.random() * JITTER_STRENGTH - JITTER_STRENGTH / 2;
    p.y += Math.random() * JITTER_STRENGTH - JITTER_STRENGTH / 2;
  }

  // Main animation loop
  const animate = () => {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);

      // Determine which target to use (mouse or ambling)
      let currentTarget;
      if (width < 1024) {
        // Ambling target logic for mobile/tablet
        if (!isMovingToDestination || getDistance(amblingTarget, amblingDestination) < 50) {
          isMovingToDestination = true;
          amblingDestination.x = Math.random() * width;
          amblingDestination.y = Math.random() * height;
        }

        // Move towards the destination
        const dx = amblingDestination.x - amblingTarget.x;
        const dy = amblingDestination.y - amblingTarget.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          amblingTarget.x += (dx / dist) * AMBIENT_SPEED;
          amblingTarget.y += (dy / dist) * AMBIENT_SPEED;
        }

        currentTarget = amblingTarget;
      } else {
        // Mouse target logic for desktop
        currentTarget = mouseTarget;
      }

      for (const i in points) {
        const p = points[i];
        // Update points
        shiftPoint(p);

        // Calculate distance to current target
        const dist = getDistance(currentTarget, p);
        
        // Continuously set active opacity based on distance from target
        const maxDist = 25000;
        p.active = Math.max(0, 1 - dist / maxDist);
        p.drawOpacity = p.active * 2;

        // Add a twinkling effect based on sine wave
        const twinkle = (0.5 + Math.sin(Date.now() * 0.001 + p.twinkleOffset) * 0.5) * 0.15;
        p.drawOpacity += twinkle;

        drawLines(p);

        // Draw either a star or a circle based on the point's type
        if (p.isStar) {
          ctx.save();
          ctx.globalAlpha = p.drawOpacity;
          ctx.drawImage(p.starImage, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = `rgba(156,217,249, ${p.drawOpacity})`;
          ctx.fill();
        }
      }
    }
    requestAnimationFrame(animate);
  };

  // Initialization of the canvas and points
  const initHeader = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    mouseTarget = { x: width / 2, y: height / 2 };

    canvas.width = width;
    canvas.height = height;

    // Determine density based on screen size
    let densityFactor;
    if (width < 768) {
      densityFactor = 7; // Mobile
    } else if (width < 1024) {
      densityFactor = 9; // Tablet
    } else {
      densityFactor = 12; // Desktop
    }
    
    // Initialize ambling target and velocity for mobile/tablet
    amblingTarget = { x: Math.random() * width, y: Math.random() * height };
    amblingDestination = { x: Math.random() * width, y: Math.random() * height };

    // create points with reduced density
    points = [];
    const numStarImages = starImages.length;
    for (let x = 0; x < width; x = x + width / densityFactor) {
      for (let y = 0; y < height; y = y + height / densityFactor) {
        const px = x + (Math.random() * width) / densityFactor;
        const py = y + (Math.random() * height) / densityFactor;
        const p = { x: px, originX: px, y: py, originY: py, closest: [], active: 0, drawOpacity: 0, twinkleOffset: Math.random() * Math.PI * 2 };

        // 20% chance to be a star
        if (Math.random() < 0.2 && numStarImages > 0) {
          p.isStar = true;
          // Increase star size by 50%
          p.size = (2 + Math.random() * 2) * 7.5; 
          p.starImage = starImages[Math.floor(Math.random() * numStarImages)];
        } else {
          p.isStar = false;
          p.radius = 2 + Math.random() * 2;
        }

        points.push(p);
      }
    }

    // for each point find the 3 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 3; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 3; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      (p1).closest = closest;
    }
  };

  const mouseMove = (e) => {
    mouseTarget.x = e.pageX;
    mouseTarget.y = e.pageY;
  };

  const touchEnd = (e) => {
    console.log("Touch event fired. Target element:", e.target);
    console.log("Is target the canvas?", e.target === canvas);

    // Only handle touch events that originate from the canvas itself
    if (width < 1024 && e.target === canvas) {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const canvasRect = canvas.getBoundingClientRect();

      console.log("Canvas rect:", canvasRect);
      console.log("Touch clientX, clientY:", touch.clientX, touch.clientY);

      amblingTarget.x = touch.clientX - canvasRect.left;
      amblingTarget.y = touch.clientY - canvasRect.y;
      amblingDestination.x = amblingTarget.x;
      amblingDestination.y = amblingTarget.y;
      isMovingToDestination = true;

      console.log("New ambling target position:", amblingTarget.x, amblingTarget.y);
    }
  };

  const scrollCheck = () => {
    if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
      animateHeader = false;
    } else {
      animateHeader = true;
    }
  };
  
  const parallaxScroll = () => {
    // Apply a subtle parallax effect to the canvas background
    const scrollY = window.scrollY;
    canvas.style.transform = `translateY(${scrollY * 0.4}px)`;
  };

  const resize = () => {
    initHeader(); // Re-initialize the header on resize
  };

  // Initial setup and animation start
  initHeader();
  animate();

  // Add event listeners
  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("touchend", touchEnd);
  window.addEventListener("scroll", scrollCheck);
  window.addEventListener("scroll", parallaxScroll);
  window.addEventListener("resize", resize);

  // Return a cleanup function to remove event listeners
  return () => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("touchend", touchEnd);
    window.removeEventListener("scroll", scrollCheck);
    window.removeEventListener("scroll", parallaxScroll);
    window.removeEventListener("resize", resize);
  };
};
