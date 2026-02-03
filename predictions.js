// Predictions Pages - Shared JavaScript
// Requires: lang variable to be set before loading this script

(function() {
    // GA4 Config
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-VXBFRGGZV3');
    gtag('event', 'page_view', {
        'page_title': 'Predictions ' + window.PRED_LANG.toUpperCase(),
        'content_group': 'predictions',
        'language': window.PRED_LANG
    });

    // Scroll depth tracking
    let scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        [25, 50, 75, 100].forEach(depth => {
            if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
                scrollDepthTracked[depth] = true;
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': 'predictions_' + window.PRED_LANG,
                    'value': depth
                });
            }
        });
    });

    // Modal functions
    window.openDownloadModal = function() {
        document.getElementById('pdfModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        gtag('event', 'pdf_modal_open', {
            'event_category': 'funnel',
            'event_label': 'predictions_' + window.PRED_LANG,
            'funnel_step': 1
        });
    };

    window.closeDownloadModal = function() {
        document.getElementById('pdfModal').classList.remove('active');
        document.body.style.overflow = '';
    };

    // Form tracking
    let formStarted = false;

    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('pdfModal');
        const emailInput = document.getElementById('pdfEmail');
        const form = document.getElementById('pdfDownloadForm');

        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeDownloadModal();
        });

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeDownloadModal();
        });

        // Track form start
        emailInput.addEventListener('focus', function() {
            if (!formStarted) {
                formStarted = true;
                gtag('event', 'pdf_form_start', {
                    'event_category': 'funnel',
                    'event_label': 'predictions_' + window.PRED_LANG,
                    'funnel_step': 2
                });
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = emailInput.value;
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '...';
            btn.disabled = true;

            // Track form submit
            gtag('event', 'pdf_form_submit', {
                'event_category': 'funnel',
                'event_label': 'predictions_' + window.PRED_LANG,
                'funnel_step': 3
            });

            // Send to Formspree
            const formData = new FormData();
            formData.append('email', email);
            formData.append('source', 'predictions_pdf_page_' + window.PRED_LANG);
            formData.append('language', window.PRED_LANG);
            formData.append('_subject', 'PDF Download - ' + window.PRED_LANG.toUpperCase());

            fetch('https://formspree.io/f/mzdddplp', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(res => {
                console.log('Formspree:', res.status);
            }).catch(err => {
                console.error('Formspree error:', err);
            });

            // Track lead
            gtag('event', 'generate_lead', {
                'event_category': 'conversion',
                'event_label': 'predictions_pdf_' + window.PRED_LANG,
                'value': 1,
                'currency': 'EUR'
            });

            // Download PDF
            const pdfFile = 'streaming-predictions-' + window.PRED_LANG + '.pdf';
            const link = document.createElement('a');
            link.href = pdfFile;
            link.download = pdfFile;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Track download
            gtag('event', 'file_download', {
                'event_category': 'funnel',
                'event_label': 'predictions_' + window.PRED_LANG,
                'file_name': pdfFile,
                'funnel_step': 5
            });

            // Success
            btn.textContent = window.PRED_SUCCESS || '✓ Downloaded!';
            btn.style.background = '#27ae60';

            setTimeout(closeDownloadModal, 2000);
        });
    });
})();
