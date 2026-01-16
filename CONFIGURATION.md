# Configuration Guide - Lead Generation Website

This guide will help you configure all the marketing tools integrated into the website.

## 📊 Google Analytics 4 Configuration

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Under **Property**, click **Create Property**
4. Fill in property details:
   - Property name: "Ludovic Bostral Consulting"
   - Time zone: Your timezone
   - Currency: EUR
5. Click **Next** and fill in business details
6. Click **Create** and accept terms

### Step 2: Get Measurement ID

1. In your new property, go to **Admin > Data Streams**
2. Click **Add stream > Web**
3. Enter your website URL
4. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### Step 3: Add to Website

In `index.html`, replace **both occurrences** of `G-XXXXXXXXXX` with your actual Measurement ID:

```html
<!-- Line ~36 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YOUR_ACTUAL_ID');
</script>
```

## 📧 Formspree Configuration

### Step 1: Create Formspree Account

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account (allows 50 submissions/month)
3. For higher volume, consider upgrading to paid plan

### Step 2: Create Form Endpoint

1. In Formspree dashboard, click **+ New Form**
2. Enter form name: "Main Contact Form"
3. Copy the form endpoint URL (format: `https://formspree.io/f/YOUR_FORM_ID`)

### Step 3: Add to Website

In `script.js`, find the ContactForm class (~line 556) and replace the placeholder:

```javascript
this.formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

### Step 4: Configure Email Notifications

1. In Formspree form settings, go to **Settings > Email Notifications**
2. Set notification email to: `ludovic@bostral.com`
3. Enable "Send email on new submission"
4. Customize email template if desired

## 📈 Events Being Tracked

The website automatically tracks these events to Google Analytics:

### Engagement Events
- **scroll_depth**: Tracks when users scroll 25%, 50%, 75%, 100%
  - Parameter: `percent` (25, 50, 75, 100)

- **cta_click**: Tracks all CTA button clicks
  - Parameters: `cta_text`, `cta_location`, `cta_type`

- **outbound_click**: Tracks external link clicks
  - Parameters: `link_url`, `link_text`

### Form Events
- **form_start**: Tracks when user focuses first field
  - Parameters: `form_id`, `form_type`

- **form_submit**: Tracks successful form submissions
  - Parameters: `form_id`, `form_type`

## 🎯 Key Performance Indicators (KPIs)

Monitor these metrics in Google Analytics:

### Lead Generation
- **Form Submissions** (`form_submit` events)
  - Goal: 15-30 per month
  - Track by service type and budget range

### Engagement
- **Scroll Depth**: % of users reaching 75%+
  - Goal: 50%+

- **CTA Click Rate**: Total CTA clicks / Total sessions
  - Goal: 20%+

- **Form Start Rate**: Form starts / Form views
  - Goal: 30%+

- **Form Completion Rate**: Form submits / Form starts
  - Goal: 60%+

### Traffic Quality
- **Avg. Session Duration**:
  - Goal: 2+ minutes

- **Bounce Rate**:
  - Goal: <60%

## 🔍 Testing Your Configuration

### Test GA4
1. Open your website
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for messages like: `📊 Analytics Event: scroll_depth {percent: 25}`
5. Wait 24-48 hours for data to appear in GA4 dashboard

### Test Formspree
1. Fill out the contact form on your website
2. Submit the form
3. Check console for: `⚠️ Formspree endpoint not configured` (if not configured yet)
4. After configuration, check your email for form submission
5. Check Formspree dashboard for submission data

## 🚀 Advanced Configuration (Sessions 2-7)

The following will be configured in upcoming sessions:

- **Facebook Pixel** (Session 5)
- **LinkedIn Insight Tag** (Session 5)
- **Hotjar** (Session 5)
- **Exit-Intent Popup** (Session 4)
- **Lead Magnets** (Session 2)

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify all IDs are replaced (no XXXXXXXXXX placeholders)
3. Test in incognito mode to rule out cache issues
4. Contact Formspree support for form issues
5. Check GA4 DebugView for real-time event tracking

## ✅ Configuration Checklist

- [ ] Google Analytics 4 Measurement ID added to `index.html`
- [ ] Formspree endpoint added to `script.js`
- [ ] Test form submission works
- [ ] Verify GA4 events in browser console
- [ ] Check email notifications from Formspree
- [ ] Monitor GA4 dashboard after 24-48 hours

---

**Last Updated**: SESSION 1 - Basic Lead Capture & Analytics
**Next Session**: SESSION 2 - Lead Magnets & Resource Modal
