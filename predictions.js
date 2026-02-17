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

            // Send to Supabase lens-notify
            fetch('https://facllabxmlvvmakixprt.supabase.co/functions/v1/lens-notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhY2xsYWJ4bWx2dm1ha2l4cHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NTU0NzIsImV4cCI6MjA4NjEzMTQ3Mn0.8DPjjexOMz16h9FfaiBTCbZ8YHZG4yqQybn0nGktRZo',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhY2xsYWJ4bWx2dm1ha2l4cHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NTU0NzIsImV4cCI6MjA4NjEzMTQ3Mn0.8DPjjexOMz16h9FfaiBTCbZ8YHZG4yqQybn0nGktRZo'
                },
                body: JSON.stringify({
                    email: email,
                    interest: 'predictions',
                    source: 'predictions_pdf_page_' + window.PRED_LANG,
                    metadata: {
                        lang: window.PRED_LANG,
                        referrer: document.referrer || 'direct'
                    }
                })
            }).then(res => {
                console.log('Supabase:', res.status);
            }).catch(err => {
                console.error('Supabase error:', err);
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
