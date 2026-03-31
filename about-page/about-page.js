document.addEventListener('DOMContentLoaded', function () {
    const badgeNumber = document.querySelector('.badge-number[data-target]');
    const insightPercents = Array.from(document.querySelectorAll('.about-insight-percent[data-target]'));

    function animateElementCount(element, suffix, durationMs) {
        const target = Number(element.getAttribute('data-target')) || 0;
        const startTime = performance.now();

        function tick(now) {
            const progress = Math.min((now - startTime) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(eased * target);
            element.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
        if (badgeNumber) {
            let badgeStarted = false;
            const badgeObserver = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !badgeStarted) {
                        badgeStarted = true;
                        animateElementCount(badgeNumber, '+', 1400);
                        badgeObserver.disconnect();
                    }
                },
                { threshold: 0.35 }
            );
            badgeObserver.observe(badgeNumber);
        }

        insightPercents.forEach((percentEl) => {
            let percentStarted = false;
            const percentObserver = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !percentStarted) {
                        percentStarted = true;
                        animateElementCount(percentEl, '%', 1500);
                        percentObserver.disconnect();
                    }
                },
                { threshold: 0.35 }
            );
            percentObserver.observe(percentEl);
        });
    } else {
        if (badgeNumber) {
            animateElementCount(badgeNumber, '+', 1400);
        }
        insightPercents.forEach((percentEl) => {
            animateElementCount(percentEl, '%', 1500);
        });
    }

    const faqItems = Array.from(document.querySelectorAll('.about-faq-item'));
    faqItems.forEach((item) => {
        const button = item.querySelector('.about-faq-question');
        const answer = item.querySelector('.about-faq-answer');
        if (!button || !answer) return;

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            faqItems.forEach((otherItem) => {
                const otherButton = otherItem.querySelector('.about-faq-question');
                const otherAnswer = otherItem.querySelector('.about-faq-answer');
                if (!otherButton || !otherAnswer) return;
                otherItem.classList.remove('is-open');
                otherButton.setAttribute('aria-expanded', 'false');
                otherAnswer.style.maxHeight = '0px';
            });

            if (!isOpen) {
                item.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});

