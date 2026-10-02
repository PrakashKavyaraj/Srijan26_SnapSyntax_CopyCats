"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DrinkVariant } from "@/types/drink";

interface SodaCan3DProps {
  activeVariant: DrinkVariant;
}

// Generate realistic 2D canvas texture for the soda can label
function generateCanTexture(variant: DrinkVariant): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // 1. Background vibrant color & gradient
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  const hslColor = `hsl(${variant.themeColor})`;
  grad.addColorStop(0, hslColor);
  grad.addColorStop(0.25, `hsl(${variant.themeColor} / 0.9)`);
  grad.addColorStop(0.5, hslColor);
  grad.addColorStop(0.75, `hsl(${variant.themeColor} / 0.8)`);
  grad.addColorStop(1, hslColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Metallic border bands at top and bottom
  const topBand = ctx.createLinearGradient(0, 0, 0, 90);
  topBand.addColorStop(0, "rgba(255,255,255,0.8)");
  topBand.addColorStop(0.5, "rgba(200,200,200,0.6)");
  topBand.addColorStop(1, "rgba(255,255,255,0.1)");
  ctx.fillStyle = topBand;
  ctx.fillRect(0, 0, canvas.width, 90);

  const bottomBand = ctx.createLinearGradient(0, canvas.height - 90, 0, canvas.height);
  bottomBand.addColorStop(0, "rgba(255,255,255,0.1)");
  bottomBand.addColorStop(0.5, "rgba(200,200,200,0.6)");
  bottomBand.addColorStop(1, "rgba(255,255,255,0.8)");
  ctx.fillStyle = bottomBand;
  ctx.fillRect(0, canvas.height - 90, canvas.width, 90);

  // 3. Subtle background pattern
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
  for (let i = 0; i < canvas.width; i += 80) {
    ctx.beginPath();
    ctx.arc(i, 512, 190, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // FRONT LABEL (Centered at x = 500)
  ctx.save();
  ctx.textAlign = "center";

  // Brand Name: OLIPOP
  ctx.font = "900 135px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 8;
  ctx.fillText("OLIPOP", 500, 310);

  // Decorative tagline
  ctx.font = "700 32px 'Inter', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.letterSpacing = "8px";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillText("PREMIUM FUNCTIONAL SODA", 500, 375);

  // Divider line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(260, 415);
  ctx.lineTo(740, 415);
  ctx.stroke();

  // Flavor Name
  ctx.font = "900 145px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 25;
  ctx.shadowOffsetY = 10;
  ctx.fillText(variant.name.toUpperCase(), 500, 560);

  // Subtitle
  ctx.font = "600 44px 'Inter', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.letterSpacing = "6px";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillText(variant.subtitle.toUpperCase(), 500, 630);

  // Health Callout Badges
  const badges = ["9g FIBER", "2g SUGAR", "35 CALS", "PREBIOTIC"];
  ctx.font = "800 26px 'Space Grotesk', sans-serif";
  badges.forEach((badge, idx) => {
    const x = 500 + (idx - 1.5) * 165;
    const y = 760;
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.beginPath();
    ctx.roundRect(x - 72, y - 32, 144, 46, 23);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(badge, x, y);
  });

  // BACK OF CAN (Centered at x = 1500)
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";

  // Nutrition Facts header
  ctx.font = "900 46px 'Space Grotesk', sans-serif";
  ctx.fillText("NUTRITION FACTS", 1320, 260);

  ctx.font = "500 28px 'Inter', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.fillText("Serving Size: 1 Can (355mL)", 1320, 310);
  ctx.fillText("Calories: 35", 1320, 355);
  ctx.fillText("Total Fat: 0g (0% DV)", 1320, 400);
  ctx.fillText("Sodium: 25mg (1% DV)", 1320, 445);
  ctx.fillText("Dietary Fiber: 9g (32% DV)", 1320, 490);
  ctx.fillText("Total Sugars: 2g", 1320, 535);
  ctx.fillText("Prebiotic Fiber: 9g", 1320, 580);

  // Ingredients statement
  ctx.font = "500 24px 'Inter', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.fillText("INGREDIENTS: Carbonated Water, Cassava Root Fiber,", 1320, 650);
  ctx.fillText("Chicory Root, Botanical Blend, Natural Flavors.", 1320, 685);

  // Mini Barcode
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(1320, 740, 260, 85);
  ctx.fillStyle = "#000000";
  for (let i = 0; i < 35; i++) {
    const barWidth = (i % 3 === 0) ? 6 : (i % 2 === 0 ? 3 : 2);
    ctx.fillRect(1335 + i * 7, 750, barWidth, 65);
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

export function SodaCan3D({ activeVariant }: SodaCan3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canGroupRef = useRef<THREE.Group | null>(null);
  const bodyMeshRef = useRef<THREE.Mesh | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Can Group & Mesh Construction
    const canGroup = new THREE.Group();
    canGroup.position.set(1.4, -0.1, 0); // Position to the right side of the hero text
    canGroup.rotation.z = -0.06; // Subtle aesthetic tilt
    scene.add(canGroup);
    canGroupRef.current = canGroup;

    // Aluminum material for rims, lid, and base
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xd2d2d2,
      metalness: 0.94,
      roughness: 0.16,
    });

    // Body cylinder with label texture
    const bodyGeometry = new THREE.CylinderGeometry(1.2, 1.2, 3.4, 64, 1, true);
    const initialTexture = generateCanTexture(activeVariant);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      map: initialTexture,
      metalness: 0.22,
      roughness: 0.32,
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    canGroup.add(bodyMesh);
    bodyMeshRef.current = bodyMesh;

    // Top neck taper
    const topNeckGeometry = new THREE.CylinderGeometry(1.06, 1.2, 0.35, 64, 1, true);
    const topNeckMesh = new THREE.Mesh(topNeckGeometry, aluminumMaterial);
    topNeckMesh.position.y = 1.7 + 0.175;
    canGroup.add(topNeckMesh);

    // Top aluminum rim
    const topRimGeometry = new THREE.TorusGeometry(1.06, 0.065, 16, 64);
    topRimGeometry.rotateX(Math.PI / 2);
    const topRimMesh = new THREE.Mesh(topRimGeometry, aluminumMaterial);
    topRimMesh.position.y = 1.7 + 0.35;
    canGroup.add(topRimMesh);

    // Top lid
    const lidGeometry = new THREE.CylinderGeometry(1.04, 1.04, 0.05, 64);
    const lidMesh = new THREE.Mesh(lidGeometry, aluminumMaterial);
    lidMesh.position.y = 1.7 + 0.33;
    canGroup.add(lidMesh);

    // Pull Tab
    const tabGeometry = new THREE.BoxGeometry(0.35, 0.04, 0.65);
    const tabMesh = new THREE.Mesh(tabGeometry, aluminumMaterial);
    tabMesh.position.set(0, 1.7 + 0.38, 0.2);
    canGroup.add(tabMesh);

    // Bottom neck taper
    const bottomNeckGeometry = new THREE.CylinderGeometry(1.2, 1.04, 0.35, 64, 1, true);
    const bottomNeckMesh = new THREE.Mesh(bottomNeckGeometry, aluminumMaterial);
    bottomNeckMesh.position.y = -1.7 - 0.175;
    canGroup.add(bottomNeckMesh);

    // Bottom rim
    const bottomRimGeometry = new THREE.TorusGeometry(1.04, 0.06, 16, 64);
    bottomRimGeometry.rotateX(Math.PI / 2);
    const bottomRimMesh = new THREE.Mesh(bottomRimGeometry, aluminumMaterial);
    bottomRimMesh.position.y = -1.7 - 0.35;
    canGroup.add(bottomRimMesh);

    // Bottom base inset
    const baseGeometry = new THREE.CylinderGeometry(1.02, 0.85, 0.1, 64);
    const baseMesh = new THREE.Mesh(baseGeometry, aluminumMaterial);
    baseMesh.position.y = -1.7 - 0.32;
    canGroup.add(baseMesh);

    // 3. Fizzy Sparkle / Soft Bubble Particles
    const bubbleCanvas = document.createElement("canvas");
    bubbleCanvas.width = 64;
    bubbleCanvas.height = 64;
    const bctx = bubbleCanvas.getContext("2d")!;
    const bGrad = bctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    bGrad.addColorStop(0, "rgba(255,255,255,1)");
    bGrad.addColorStop(0.5, "rgba(255,255,255,0.5)");
    bGrad.addColorStop(1, "rgba(255,255,255,0)");
    bctx.fillStyle = bGrad;
    bctx.beginPath();
    bctx.arc(32, 32, 30, 0, Math.PI * 2);
    bctx.fill();
    const bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);

    const particleCount = 70;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.5 + 1.4;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: 0.01 + Math.random() * 0.016,
        z: (Math.random() - 0.5) * 0.006,
      });
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(`hsl(${activeVariant.themeColor})`),
      size: 0.16,
      map: bubbleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particleMaterialRef.current = particleMaterial;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(
      new THREE.Color(`hsl(${activeVariant.themeColor})`),
      6,
      12
    );
    rimLight.position.set(2, 2, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 5. Mouse and Scroll listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      
      // On mobile screens, center the can and zoom out slightly
      if (width < 768) {
        canGroup.position.set(0, -0.3, 0);
        camera.position.z = 9.2;
      } else {
        canGroup.position.set(1.4, -0.1, 0);
        camera.position.z = 8.2;
      }
      
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();

    // 6. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous 360-degree rotation + scroll responsiveness
      canGroup.rotation.y = elapsedTime * 0.75 + scrollRef.current * 0.003;

      // Gentle floating bob
      const targetY = (container.clientWidth < 768 ? -0.3 : -0.1) + Math.sin(elapsedTime * 1.5) * 0.12;
      canGroup.position.y += (targetY - canGroup.position.y) * 0.05;

      // Interactive mouse parallax tilt
      const targetRotX = mouseRef.current.y * 0.18;
      const targetRotZ = (container.clientWidth < 768 ? 0 : -0.06) - mouseRef.current.x * 0.18;
      canGroup.rotation.x += (targetRotX - canGroup.rotation.x) * 0.05;
      canGroup.rotation.z += (targetRotZ - canGroup.rotation.z) * 0.05;

      // Animate fizz bubbles
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3] += particleVelocities[i].x;
        // Reset bubble when it floats too high
        if (positions[i * 3 + 1] > 3.0) {
          positions[i * 3 + 1] = -3.0;
          positions[i * 3] = (Math.random() - 0.5) * 4.0 + canGroup.position.x;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      bubbleTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update texture, lighting, and particles when activeVariant changes
  useEffect(() => {
    if (bodyMeshRef.current) {
      const newTexture = generateCanTexture(activeVariant);
      const mat = bodyMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat.map) {
        mat.map.dispose();
      }
      mat.map = newTexture;
      mat.needsUpdate = true;
    }

    if (rimLightRef.current) {
      rimLightRef.current.color.set(new THREE.Color(`hsl(${activeVariant.themeColor})`));
    }

    if (particleMaterialRef.current) {
      particleMaterialRef.current.color.set(new THREE.Color(`hsl(${activeVariant.themeColor})`));
    }

    // Energize rotation on flavor change for a smooth, dynamic transition
    if (canGroupRef.current) {
      canGroupRef.current.rotation.y += Math.PI * 0.75;
    }
  }, [activeVariant]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
