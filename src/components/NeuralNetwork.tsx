import { useEffect, useRef } from "react";

type Node = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseVx: number;
    baseVy: number;
};

const NeuralNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        /* ================= Mouse ================= */
        const mouse = { x: 0, y: 0, active: false };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => (mouse.active = false);

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        /* ================= Canvas ================= */
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let dpr = window.devicePixelRatio || 1;

        const resizeCanvasInternal = () => {
            dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resizeCanvasInternal();

        /* ================= Node Density ================= */
        const getDesiredNodeCount = () =>
            Math.floor((width * height) / 12000);

        /* ================= Nodes ================= */
        const nodes: Node[] = [];
        const RADIUS = 3;

        const syncNodeCount = () => {
            const desired = getDesiredNodeCount();

            if (nodes.length < desired) {
                for (let i = nodes.length; i < desired; i++) {
                    const vx = (Math.random() - 0.5) * 0.8;
                    const vy = (Math.random() - 0.5) * 0.8;
                    nodes.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx,
                        vy,
                        baseVx: vx,
                        baseVy: vy,
                    });
                }
            } else if (nodes.length > desired) {
                nodes.length = desired;
            }
        };

        syncNodeCount();

        /* ================= Resize (Debounced) ================= */
        let resizeTimeout: number;

        const resizeCanvas = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                const newWidth = canvas.offsetWidth;
                const newHeight = canvas.offsetHeight;

                const scaleX = newWidth / width;
                const scaleY = newHeight / height;

                nodes.forEach((n) => {
                    n.x *= scaleX;
                    n.y *= scaleY;
                });

                width = newWidth;
                height = newHeight;

                resizeCanvasInternal();
                syncNodeCount();
            }, 100);
        };

        window.addEventListener("resize", resizeCanvas);

        /* ================= Cached Glass Gradient ================= */
        const baseColor = "59,130,246";

        const glassGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            RADIUS
        );
        glassGradient.addColorStop(0, "rgba(255,255,255,0.55)");
        glassGradient.addColorStop(0.4, `rgba(${baseColor},0.35)`);
        glassGradient.addColorStop(1, `rgba(${baseColor},0.15)`);

        /* ================= Animation ================= */
        let animationId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                /* ---- Mouse force ---- */
                if (mouse.active) {
                    const dx = node.x - mouse.x;
                    const dy = node.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const radius = 90;

                    if (dist < radius && dist > 0.01) {
                        const force = (1 - dist / radius) * 0.15;
                        node.vx += (dx / dist) * force;
                        node.vy += (dy / dist) * force;
                    }
                }

                /* ---- Physics ---- */
                node.vx += (node.baseVx - node.vx) * 0.06;
                node.vy += (node.baseVy - node.vy) * 0.06;
                node.vx *= 0.98;
                node.vy *= 0.98;
                node.x += node.vx;
                node.y += node.vy;

                /* ---- Walls ---- */
                if (node.x <= RADIUS || node.x >= width - RADIUS) {
                    node.vx *= -1;
                    node.baseVx *= -1;
                }
                if (node.y <= RADIUS || node.y >= height - RADIUS) {
                    node.vy *= -1;
                    node.baseVy *= -1;
                }

                /* ================= Glass Dot ================= */

                // Glow only near mouse (performance)
                if (mouse.active) {
                    const dx = node.x - mouse.x;
                    const dy = node.y - mouse.y;
                    if (dx * dx + dy * dy < 120 * 120) {
                        ctx.save();
                        ctx.globalCompositeOperation = "lighter";
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = `rgba(${baseColor},0.25)`;
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, RADIUS, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${baseColor},0.15)`;
                        ctx.fill();
                        ctx.restore();
                    }
                }

                // Main glass body
                ctx.save();
                ctx.translate(node.x, node.y);
                ctx.beginPath();
                ctx.arc(0, 0, RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = glassGradient;
                ctx.fill();
                ctx.restore();

                // Highlight
                ctx.beginPath();
                ctx.arc(
                    node.x - RADIUS * 0.4,
                    node.y - RADIUS * 0.4,
                    RADIUS * 0.4,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = "rgba(255,255,255,0.6)";
                ctx.fill();

                /* ================= Connections (HALF LOOP) ================= */
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(14,165,233,${0.15 * (1 - dist / 100)})`;
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        /* ================= Cleanup ================= */
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-50"
        />
    );
};

export default NeuralNetwork;