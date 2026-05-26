import { useEffect } from 'react';

const useAOS = (): void => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || '0';
            setTimeout(() => {
              entry.target.classList.add('aos-animate');
            }, parseInt(delay));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all [data-aos] elements not yet animated
    const observeAll = () => {
      document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Watch for dynamically added elements (e.g. after async data loads)
    const mutObs = new MutationObserver(observeAll);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
  }, []);
};

export default useAOS;
