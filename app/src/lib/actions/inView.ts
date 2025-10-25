/**
 * Svelte action for scroll-triggered animations using Intersection Observer
 * Usage: <div data-in-view use:inView>Content</div>
 */

interface InViewOptions {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
}

export function inView(node: HTMLElement, options: InViewOptions = {}) {
	const { threshold = 0.1, rootMargin = '0px', once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					node.classList.remove('in-view');
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
