# Appetizer Promotion Lead Capture System - Product Specification

## 1. Executive Summary

### Product Overview
A digital lead capture and engagement system designed for restaurants to convert walk-in traffic into CRM contacts through an irresistible free appetizer offer. The system seamlessly integrates QR code technology, web forms, CRM automation, and instant messaging to create a frictionless customer acquisition flow.

### Business Value Proposition
- **For Restaurants**: Convert casual diners into trackable CRM contacts with minimal staff intervention
- **For Customers**: Simple, instant value exchange - personal info for free appetizer
- **For Service Provider**: Scalable B2B SaaS offering for restaurant industry

### Key Success Metrics
- QR code scan rate (% of table visitors who scan)
- Form completion rate (% of scans who complete form)
- Redemption rate (% of contacts who claim appetizer)
- Customer lifetime value (CLV) from acquired contacts
- Time from scan to confirmation (<2 minutes target)

---

## 2. Customer Journey - Detailed Flow

### Step 1: Discovery & Initial Engagement
**Physical Touchpoint: QR Code on Table**

**Customer Action:**
- Customer sits at table
- Notices attractive table tent/sticker with QR code
- Reads value proposition: "Sign up for FREE Appetizer"
- Scans QR code using phone camera

**Technical Component:**
- Flowcode QR code generator
- QR code links to landing page URL
- URL includes tracking parameters (table_id, location_id, campaign_id)

**Design Considerations:**
- QR code must be prominent and easy to scan (minimum 2"x2")
- Clear call-to-action language
- Visual appetite appeal (food imagery)
- Bilingual support if applicable
- Durability (laminated, water-resistant)

**Success Criteria:**
- QR code scannable from 12-18 inches away
- Load time <2 seconds on 4G connection
- Tracking parameters properly captured

---

### Step 2: Form Submission
**Digital Touchpoint: Landing Page**

**Customer Experience:**
1. Page loads instantly with appealing design
2. Sees clear headline: "Get Your FREE [Appetizer Name]!"
3. Views simple form (4-6 fields maximum)
4. Fills out required information
5. Accepts terms and conditions (optional marketing consent)
6. Submits form
7. Receives immediate on-screen confirmation

**Required Form Fields:**
- First Name (required)
- Last Name (required)
- Phone Number (required, with validation)
- Email Address (required, with validation)
- Marketing Opt-in (checkbox - GDPR/CAN-SPAM compliant)

**Optional Form Fields (Recommended):**
- Birthday (for future campaigns)
- Dining Occasion (date night, family, business, etc.)
- Dietary Preferences
- How did you hear about us?

**Technical Implementation:**

**Option A: n8n Form + Webhook (Recommended)**
- n8n Form Trigger node generates embedded form
- Custom styling to match restaurant brand
- Built-in validation
- Webhook receives submission instantly
- No external dependencies

**Option B: Custom Landing Page + n8n Webhook**
- Custom HTML/CSS landing page hosted separately
- Form submits to n8n webhook URL
- More flexibility in design
- Requires separate hosting

**Form Validation Requirements:**
- Phone: Format validation (e.g., (XXX) XXX-XXXX)
- Email: Valid email format with DNS check
- Name: Minimum 2 characters, no special characters
- Real-time field validation (before submit)
- Clear error messages in customer's language

**Mobile Optimization:**
- Responsive design (90%+ traffic will be mobile)
- Large input fields (minimum 44px tap targets)
- Auto-focus on first field
- Keyboard optimization (email keyboard for email field, numeric for phone)
- Minimal scrolling required

**Brand Elements:**
- Restaurant logo
- Brand colors
- Appetizer image
- Trust signals (privacy policy link, secure badge)
- Estimated wait time ("Get your code in 30 seconds!")

**Success Criteria:**
- Page load time <3 seconds
- Form completion time <60 seconds average
- Form abandonment rate <30%
- Mobile compatibility across iOS/Android

---

### Step 3: CRM Contact Creation
**Backend Process: n8n → GoHighLevel Integration**

**Workflow Automation:**

```
n8n Workflow Steps:
1. Webhook Trigger (receives form data)
2. Data Validation & Sanitization
3. Duplicate Check (search GHL for existing contact)
4. Contact Creation/Update in GoHighLevel
5. Tag Assignment
6. Campaign Enrollment
7. Generate Unique Redemption Code
8. Trigger Confirmation Message
9. Log Success/Error
```

**GoHighLevel Contact Structure:**

**Required Fields:**
- First Name
- Last Name
- Phone (primary communication channel)
- Email
- Source: "Appetizer Promo - Table QR"
- Tags:
  - `appetizer-promo-{date}`
  - `table-{table_number}`
  - `location-{location_id}`
  - `pending-redemption`

**Custom Fields:**
- Redemption Code (unique 6-8 character code)
- Offer Expiry Date (default: 7 days from signup)
- Table Number (from QR tracking)
- Signup Timestamp
- Redemption Status (pending/claimed/expired)
- Redemption Timestamp (when claimed)

**Duplicate Handling Logic:**
```
IF contact exists (match by phone OR email):
  - Update existing contact
  - Add new tag with current date
  - Generate NEW redemption code
  - Reset offer expiry
  - Increment "promo_signup_count" custom field
ELSE:
  - Create new contact
  - Set all required fields
  - Generate redemption code
  - Set initial tags
```

**Redemption Code Generation:**
- Format: Letters + Numbers (e.g., "APP2024")
- Length: 6 characters for easy reading
- Unique per submission
- Case-insensitive
- No ambiguous characters (0/O, 1/I/l)
- Stored in GHL custom field
- Expiry date associated

**Campaign Enrollment:**
- Welcome Campaign: Immediate confirmation + instructions
- Reminder Campaign: Send reminder if not redeemed in 3 days
- Expiry Warning: Alert 24 hours before expiry
- Post-Redemption: Thank you + request review/feedback

**Success Criteria:**
- Contact created in GHL within 5 seconds of form submission
- 100% data accuracy (no missing fields)
- Zero duplicate contacts (same person, same offer, same day)
- Proper tag assignment for segmentation
- Redemption code uniqueness guaranteed

---

### Step 4: Confirmation Delivery
**Communication Touchpoint: SMS or WhatsApp**

**Message Delivery Options:**

**Option A: SMS (via Twilio/GoHighLevel)**
- Guaranteed delivery
- Works on all phones
- Higher open rate (98%)
- Character limit considerations
- Cost: ~$0.01-0.02 per message

**Option B: WhatsApp (via Twilio API/360Dialog)**
- Richer media (images, buttons)
- Lower cost at scale
- Requires opt-in compliance
- Requires customer to have WhatsApp
- Better engagement features

**Recommended Approach: Hybrid**
1. Primary: WhatsApp (if customer has it)
2. Fallback: SMS (if WhatsApp fails)

**Message Template - SMS Version:**

```
¡Hola {FirstName}! 🎉

Tu aperitivo GRATIS te espera en [Restaurant Name]!

Código: {RedemptionCode}

Muestra este código a tu mesero para reclamar tu {AppetizrName}.

Válido hasta: {ExpiryDate}

Gracias por unirte a nuestra familia!

[Restaurant Name]
```

**Message Template - WhatsApp Version:**

```
¡Hola {FirstName}! 🎉

¡Bienvenido a la familia de [Restaurant Name]!

Tu código para aperitivo GRATIS:

🎫 *{RedemptionCode}*

📋 Cómo reclamar:
1. Muestra este código a tu mesero
2. Elige tu {AppetizerName} favorito
3. ¡Disfruta!

⏰ Válido hasta: {ExpiryDate} (7 días)

💬 ¿Preguntas? Responde a este mensaje.

¡Buen provecho!

[Button: Ver Menú]
[Button: Hacer Reservación]
```

**Message Delivery Timing:**
- Instant delivery (<30 seconds after form submission)
- Retry logic if initial send fails (3 attempts, 30 second intervals)
- Fallback to email if both SMS/WhatsApp fail

**Message Tracking:**
- Delivery status logged in GHL
- Read receipts (WhatsApp only)
- Link click tracking (if menu/reservation buttons included)
- Reply handling (optional customer service automation)

**Compliance Requirements:**
- Include opt-out instructions ("Reply STOP to unsubscribe")
- Privacy policy link
- Clear sender identification
- TCPA compliance (US)
- GDPR compliance (EU)
- CAN-SPAM compliance

**Success Criteria:**
- Message delivery rate >95%
- Delivery time <60 seconds
- Code clearly readable
- Instructions crystal clear
- Mobile-friendly formatting

---

## 3. Technical Architecture

### System Components

```
┌─────────────────┐
│   Flowcode QR   │ (Physical touchpoint)
│   Generator     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Landing Page (n8n Form or Custom)      │
│  - Form validation                       │
│  - Mobile responsive                     │
│  - Brand styling                         │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│         n8n Automation Workflow         │
│  ┌─────────────────────────────────┐   │
│  │ 1. Webhook Trigger              │   │
│  │ 2. Validate Data                │   │
│  │ 3. Check for Duplicates         │   │
│  │ 4. Generate Redemption Code     │   │
│  │ 5. Create/Update GHL Contact    │   │
│  │ 6. Send Confirmation Message    │   │
│  │ 7. Log to Database              │   │
│  │ 8. Error Handling               │   │
│  └─────────────────────────────────┘   │
└────┬──────────────────────┬─────────────┘
     │                      │
     ▼                      ▼
┌─────────────────┐   ┌──────────────────┐
│  GoHighLevel    │   │ Communication    │
│  CRM            │   │ Platform         │
│  - Contacts     │   │ - Twilio (SMS)   │
│  - Tags         │   │ - WhatsApp API   │
│  - Campaigns    │   │ - Email (backup) │
│  - Automation   │   └──────────────────┘
└─────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│      Analytics & Reporting              │
│  - Conversion tracking                  │
│  - Redemption tracking                  │
│  - ROI measurement                      │
└─────────────────────────────────────────┘
```

### Technology Stack

**QR Code Generation:**
- Platform: Flowcode
- Features needed:
  - Dynamic QR codes (can update destination URL)
  - Scan analytics
  - Batch generation for multiple tables
  - Custom branding

**Form & Landing Page:**
- Option A: n8n Form Trigger (serverless, integrated)
- Option B: Custom page (Webflow, Unbounce, or custom HTML)
- Hosting: Cloudflare Pages / Vercel (if custom)
- SSL certificate required

**Automation Engine:**
- Platform: n8n (self-hosted or cloud)
- Instance: https://emimontanari.up.railway.app
- Workflow requirements:
  - Webhook endpoint (HTTPS)
  - HTTP request nodes
  - Code nodes (for logic)
  - Error handling nodes

**CRM Platform:**
- Platform: GoHighLevel
- Required features:
  - API access (unlimited or high limit)
  - Custom fields support
  - Tag management
  - Campaign builder
  - Webhook support (for updates back to n8n)

**Communication Platform:**
- SMS: Twilio / GoHighLevel built-in
- WhatsApp: Twilio WhatsApp API / 360Dialog
- Email: SendGrid / GoHighLevel built-in
- Requirements:
  - Template management
  - Delivery tracking
  - Opt-out handling

**Data Storage (Optional but Recommended):**
- Purpose: Backup, analytics, redemption tracking
- Options:
  - Supabase (PostgreSQL)
  - Airtable
  - Google Sheets (for small volume)
- Tables needed:
  - Signups log
  - Redemptions log
  - Error log

### Data Flow

**1. QR Scan → Landing Page**
```
URL Structure:
https://[domain]/appetizer-signup?loc=[location]&table=[number]&campaign=[id]

Parameters captured:
- loc: Location/restaurant ID
- table: Table number
- campaign: Campaign identifier
- utm_source, utm_medium, utm_campaign (optional)
```

**2. Form Submission → n8n**
```json
{
  "firstName": "Maria",
  "lastName": "Garcia",
  "phone": "+1234567890",
  "email": "maria@example.com",
  "marketingOptIn": true,
  "metadata": {
    "location": "restaurant-downtown",
    "table": "12",
    "campaign": "summer-2024",
    "timestamp": "2024-06-15T18:30:00Z",
    "userAgent": "Mobile Safari iOS 17.1"
  }
}
```

**3. n8n → GoHighLevel**
```json
{
  "firstName": "Maria",
  "lastName": "Garcia",
  "phone": "+1234567890",
  "email": "maria@example.com",
  "source": "Appetizer Promo - Table QR",
  "tags": [
    "appetizer-promo-2024-06-15",
    "table-12",
    "location-downtown",
    "pending-redemption"
  ],
  "customFields": {
    "redemptionCode": "APP42X",
    "offerExpiry": "2024-06-22T23:59:59Z",
    "tableNumber": "12",
    "signupTimestamp": "2024-06-15T18:30:00Z",
    "redemptionStatus": "pending"
  }
}
```

**4. n8n → Communication Platform**
```json
{
  "to": "+1234567890",
  "channel": "whatsapp",
  "template": "appetizer_confirmation",
  "variables": {
    "firstName": "Maria",
    "redemptionCode": "APP42X",
    "appetizerName": "Guacamole Fresco",
    "expiryDate": "22 de Junio",
    "restaurantName": "Casa Maria"
  },
  "fallback": {
    "channel": "sms",
    "enabled": true
  }
}
```

---

## 4. Implementation Requirements

### Phase 1: Setup & Configuration (Week 1)

**Flowcode Setup:**
- [ ] Create Flowcode account
- [ ] Design QR code with branding
- [ ] Generate unique QR codes per table/location
- [ ] Test scan functionality across devices
- [ ] Set up scan analytics tracking

**GoHighLevel Configuration:**
- [ ] Create/configure API key with proper permissions
- [ ] Set up custom fields (redemption code, expiry, etc.)
- [ ] Create tags structure
- [ ] Build welcome campaign
- [ ] Build reminder campaign (day 3)
- [ ] Build expiry warning campaign (day 6)
- [ ] Configure SMS/WhatsApp integration
- [ ] Test contact creation via API

**n8n Workflow Development:**
- [ ] Create webhook endpoint
- [ ] Build form (if using n8n Form)
- [ ] Develop data validation logic
- [ ] Implement duplicate checking
- [ ] Code redemption code generator
- [ ] Integrate GoHighLevel API
- [ ] Integrate communication API
- [ ] Set up error handling and notifications
- [ ] Add logging/analytics
- [ ] Test end-to-end flow

### Phase 2: Design & Content (Week 1-2)

**Physical Materials:**
- [ ] Design table tent/sticker with QR code
- [ ] Create clear value proposition copy
- [ ] Add appealing food photography
- [ ] Include instructions ("Scan for FREE appetizer")
- [ ] Ensure bilingual if needed
- [ ] Print and laminate materials

**Landing Page Design:**
- [ ] Design mobile-first layout
- [ ] Write compelling headline
- [ ] Add appetizer image
- [ ] Create clear form with minimal fields
- [ ] Add trust elements (privacy, secure badges)
- [ ] Write terms & conditions
- [ ] Design thank you/confirmation screen
- [ ] A/B test variations (optional)

**Message Templates:**
- [ ] Write SMS confirmation template
- [ ] Write WhatsApp confirmation template
- [ ] Write reminder message template
- [ ] Write expiry warning template
- [ ] Get legal review for compliance
- [ ] Translate if multilingual
- [ ] Test character limits and formatting

### Phase 3: Testing (Week 2)

**Unit Testing:**
- [ ] Test form validation (all fields)
- [ ] Test duplicate detection logic
- [ ] Test redemption code generation (uniqueness)
- [ ] Test GHL contact creation
- [ ] Test message delivery (SMS & WhatsApp)
- [ ] Test error handling scenarios

**Integration Testing:**
- [ ] End-to-end flow with test data
- [ ] Multiple submissions rapid-fire
- [ ] Duplicate submission handling
- [ ] Failed message delivery scenarios
- [ ] Invalid phone/email handling
- [ ] Network timeout scenarios

**User Acceptance Testing:**
- [ ] Test on multiple devices (iOS, Android)
- [ ] Test on different browsers
- [ ] Test with poor network conditions
- [ ] Test with real restaurant staff
- [ ] Verify message readability
- [ ] Confirm code redemption process

### Phase 4: Soft Launch (Week 3)

**Pilot Restaurant:**
- [ ] Choose 1 location for pilot
- [ ] Install QR codes on 5-10 tables
- [ ] Train staff on redemption process
- [ ] Monitor for 1 week
- [ ] Collect feedback from customers and staff
- [ ] Track conversion metrics
- [ ] Identify and fix issues

### Phase 5: Rollout (Week 4+)

**Scale to Additional Locations:**
- [ ] Create location-specific QR codes
- [ ] Configure location tags in GHL
- [ ] Train staff at each location
- [ ] Install physical materials
- [ ] Monitor performance per location
- [ ] Ongoing optimization

---

## 5. Business Operations

### Restaurant Staff Training

**Staff Need to Know:**
1. What the promotion is
2. How customers sign up (QR code)
3. How to verify redemption code
4. Which appetizers are included
5. What to do if code doesn't work
6. How to mark code as redeemed (in POS or manual)

**Redemption Process:**
```
1. Customer shows code to server
2. Server verifies code format (6 characters)
3. Server checks if already used (optional: GHL lookup)
4. Server inputs code into POS or logs manually
5. Customer receives free appetizer
6. Server updates status in system (or end of shift batch update)
```

**POS Integration Options:**

**Option A: Manual Tracking**
- Server writes down code on order slip
- Manager reconciles codes end of shift
- Manual update in GHL or spreadsheet

**Option B: POS Integration**
- Custom POS button "Promo Appetizer"
- Prompt for redemption code
- Automatic validation against GHL
- Real-time redemption tracking

**Option C: Tablet/Mobile App**
- Simple web app for servers
- Input redemption code
- Instant validation via n8n webhook
- Updates GHL contact status
- Tracks redemptions in real-time

### Redemption Validation System

**Recommended: n8n Redemption Webhook**

```
Workflow:
1. Server inputs code in simple web form/app
2. n8n receives code via webhook
3. Searches GHL for contact with matching code
4. Validates:
   - Code exists
   - Not already redeemed
   - Not expired
   - Belongs to current location
5. Returns validation result:
   - ✅ Valid: Show customer name, mark as redeemed
   - ❌ Invalid: Show error reason
6. Update GHL contact:
   - Change redemptionStatus to "claimed"
   - Add redemptionTimestamp
   - Remove "pending-redemption" tag
   - Add "redeemed-{date}" tag
```

**Benefits:**
- Real-time validation
- Prevents double-redemption
- Tracks redemption data
- Easy for staff (just type code)
- Works on any device with browser

### Customer Service Scenarios

**Scenario 1: Customer didn't receive code**
- Check GHL for contact (by phone/email)
- Verify submission was successful
- Resend message manually
- Provide code verbally if urgent

**Scenario 2: Code expired**
- Check redemption history in GHL
- Determine if extension warranted
- Generate new code (if approved)
- Update expiry date

**Scenario 3: Customer lost code**
- Verify identity (name + phone)
- Look up code in GHL
- Resend message with code
- Or provide code verbally

**Scenario 4: Code already redeemed**
- Check redemption timestamp
- Explain one-time use policy
- Offer alternative (manager discretion)
- Note: Could implement "1 per month" rule instead

**Scenario 5: Technical issue (code not working)**
- Manually verify in GHL
- Override in POS if valid
- Log issue for technical review
- Provide backup manual voucher

---

## 6. Analytics & Reporting

### Key Performance Indicators (KPIs)

**Acquisition Metrics:**
- QR scans per day/week/month
- Scan-to-form rate (scans / form views)
- Form completion rate (submissions / form views)
- Cost per acquisition (CPA)
- Acquisition by location
- Acquisition by time of day
- Acquisition by table number

**Engagement Metrics:**
- Message delivery rate
- Message open rate (WhatsApp)
- Redemption rate (redeemed / total signups)
- Time to redemption (signup to claim)
- Expiry rate (expired / total signups)
- Re-engagement rate (returned after redemption)

**Revenue Metrics:**
- Average check size (redeemed vs. non-redeemed)
- Additional items purchased with free appetizer
- Customer lifetime value (CLV) from promo contacts
- ROI per campaign
- Revenue per location

**Operational Metrics:**
- System uptime
- Workflow execution time
- Error rate
- Duplicate contact rate
- Message delivery failure rate

### Reporting Dashboard

**Real-Time Dashboard (Daily View):**
- Today's signups (count, graph)
- Pending redemptions
- Redeemed today
- Conversion funnel (scan → form → submit → redeem)
- System health status

**Weekly Reports:**
- Total signups
- Redemption rate
- Top performing locations
- Top performing tables
- Peak signup times
- Customer feedback summary

**Monthly Reports:**
- Month-over-month growth
- Cohort analysis (retention)
- Revenue impact
- ROI calculation
- Trends and insights

### Data Collection Points

**n8n Logging:**
```json
{
  "eventType": "form_submission",
  "timestamp": "2024-06-15T18:30:00Z",
  "data": {
    "contactId": "ghl_12345",
    "redemptionCode": "APP42X",
    "location": "downtown",
    "table": "12",
    "campaign": "summer-2024"
  }
}
```

**GoHighLevel Custom Fields:**
- Signup Source
- Signup Date/Time
- Table Number
- Location
- Redemption Code
- Code Generated Date
- Code Expiry Date
- Redemption Date/Time (when claimed)
- Redemption Location (if multi-location)
- Number of Visits After Promo

**External Analytics:**
- Flowcode scan analytics
- Landing page analytics (Google Analytics)
- Form abandonment tracking
- Device/browser breakdown

---

## 7. Edge Cases & Error Handling

### Technical Edge Cases

**1. Webhook Timeout/Failure**
- **Scenario**: n8n webhook times out or is unreachable
- **Handling**:
  - Form shows friendly error message
  - Capture submission in client-side storage
  - Retry mechanism (3 attempts, exponential backoff)
  - Email backup notification to admin
  - Manual contact creation process

**2. Duplicate Submissions (Same Person, Same Session)**
- **Scenario**: Customer clicks submit multiple times
- **Handling**:
  - Disable submit button after first click
  - Show loading state
  - Implement idempotency key (based on phone + timestamp)
  - n8n checks for duplicates within 5-minute window
  - Return existing code if duplicate detected

**3. Duplicate Submissions (Same Person, Different Day)**
- **Scenario**: Customer tries to sign up again next week
- **Handling**:
  - Check GHL for existing contact
  - Business rule decision:
    - Option A: Allow (generate new code, different offer)
    - Option B: Limit (1 per month/quarter)
    - Option C: Deny (show "already registered" message)
  - Recommended: Allow 1 per 30 days

**4. Message Delivery Failure**
- **Scenario**: SMS/WhatsApp fails to deliver
- **Handling**:
  - Primary: WhatsApp attempt
  - Fallback 1: SMS (30 seconds later)
  - Fallback 2: Email (1 minute later)
  - Log failure in GHL
  - Manual follow-up by staff
  - Display code on thank-you page as backup

**5. Invalid Phone Number**
- **Scenario**: Customer enters fake/wrong phone
- **Handling**:
  - Phone validation on form (format + length)
  - Twilio lookup API (optional, costs $0.005/lookup)
  - Create contact anyway
  - Send to email only
  - Flag contact for review

**6. GoHighLevel API Limit Exceeded**
- **Scenario**: Burst of signups exceeds API rate limit
- **Handling**:
  - Implement queue in n8n (stagger requests)
  - Retry with exponential backoff
  - Cache responses to minimize calls
  - Upgrade GHL plan if needed
  - Temporary storage in database until API available

**7. Redemption Code Collision**
- **Scenario**: Same code generated twice (extremely rare)
- **Handling**:
  - Check GHL for existing code before saving
  - Regenerate if collision detected
  - Use timestamp + random seed for generation
  - Log collision event for monitoring

### Business Edge Cases

**8. Customer Brings Code to Wrong Location**
- **Scenario**: Signed up at Location A, tries to redeem at Location B
- **Handling**:
  - Business rule decision:
    - Option A: Honor at any location (better CX)
    - Option B: Restrict to signup location
  - Recommended: Allow redemption at any location
  - Track cross-location redemptions

**9. Code Shared on Social Media**
- **Scenario**: Customer posts their code publicly
- **Handling**:
  - Codes are single-use (can't be reused)
  - Monitor for suspicious redemption patterns
  - Consider customer education in confirmation message
  - Add "Non-transferable" to terms
  - Accept risk (good PR if viral)

**10. Staff Member Signs Up**
- **Scenario**: Restaurant employee gets free appetizer
- **Handling**:
  - Business policy decision
  - Option A: Allow (employee perk)
  - Option B: Detect via employee phone list and exclude
  - Option C: Manual review and void
  - Tag contacts for review if needed

**11. Expired Code but Customer Just Arrived**
- **Scenario**: Code expired while customer was driving to restaurant
- **Handling**:
  - Grace period: Allow redemption up to 24 hours after expiry
  - Manager discretion to honor
  - Generate new code manually if needed
  - Good customer service > strict policy

**12. Customer Has Dietary Restrictions**
- **Scenario**: All promo appetizers contain allergen
- **Handling**:
  - Offer alternative appetizer of equal value
  - Note in GHL for future targeting
  - Update dietary preferences
  - Manager approval for substitution

**13. High-Value Fraud Attempt**
- **Scenario**: Multiple fake signups from same device/IP
- **Handling**:
  - Track IP addresses (optional)
  - Honeypot field on form
  - reCAPTCHA (if abuse detected)
  - Email verification step (optional)
  - Staff verify ID if suspicious
  - Accept small fraud rate as cost of doing business

### System Monitoring & Alerts

**Critical Alerts (Immediate Action Required):**
- Webhook endpoint down (>5 minutes)
- Message delivery rate <80%
- Form completion rate drops >50%
- Zero signups for >2 hours during business hours

**Warning Alerts (Review Within 24 Hours):**
- Unusually high form abandonment rate
- Duplicate contact rate >10%
- API error rate >5%
- Redemption rate <20% after 3 days

**Info Alerts (Weekly Review):**
- QR scan volume trends
- Peak signup times
- Location performance comparison
- Customer feedback themes

---

## 8. Compliance & Legal

### Data Privacy

**GDPR Compliance (if applicable):**
- [ ] Explicit consent for data collection
- [ ] Clear privacy policy linked on form
- [ ] Right to access data (customer portal or email request)
- [ ] Right to deletion (automated or manual process)
- [ ] Data retention policy (how long to keep contacts)
- [ ] Secure data storage (encrypted)

**CCPA Compliance (California):**
- [ ] Privacy policy discloses data sale (if applicable)
- [ ] "Do Not Sell My Info" option
- [ ] Right to access and delete

**CAN-SPAM Act (Email):**
- [ ] Clear sender identification
- [ ] Physical mailing address in footer
- [ ] Clear opt-out mechanism
- [ ] Honor opt-outs within 10 business days

**TCPA (Telephone Consumer Protection Act - US SMS/Calls):**
- [ ] Explicit consent for SMS marketing
- [ ] Clear opt-out instructions (STOP, UNSUBSCRIBE)
- [ ] Automatic opt-out processing
- [ ] Only send messages 8am-9pm recipient's time zone
- [ ] Maintain do-not-contact list

**Industry Standards:**
- [ ] PCI compliance (if collecting payment info - NOT in this flow)
- [ ] COPPA compliance (Children's privacy - require 18+ or parental consent)

### Terms & Conditions

**Promo Terms Template:**
```
FREE APPETIZER PROMOTION TERMS

Eligibility:
- One free appetizer per person per [time period]
- Must be 18 years or older
- Valid only at participating locations
- Cannot be combined with other offers
- Dine-in only (no takeout/delivery)

Redemption:
- Must present code to server
- Valid for [X] days from signup
- Code is non-transferable
- Management reserves the right to refuse
- Appetizer selection from designated menu

Privacy:
- By submitting, you agree to receive promotional communications
- View our Privacy Policy at [link]
- Reply STOP to opt out anytime
- We will not sell your personal information

General:
- Offer may be modified or terminated at any time
- Cash value: 1/100 of one cent
- Void where prohibited
```

### Risk Mitigation

**Fraud Prevention:**
- Rate limiting on form (max 5 submissions per IP per hour)
- Honeypot fields
- Email verification (optional)
- Phone verification via SMS (optional, costs extra)
- Staff training to verify customer identity if suspicious

**Liability Protection:**
- Terms clearly state "dine-in only"
- No cash value
- Manager discretion clause
- Allergen disclaimer
- Food safety compliance

**Brand Protection:**
- Monitor social media for code sharing
- Watermark or unique code design
- Clear non-transferable policy
- Staff authority to void codes

---

## 9. Cost Analysis

### Per-Customer Cost Breakdown

**Technology Costs:**
- n8n hosting: ~$0 (self-hosted) or ~$0.01/execution (cloud)
- GoHighLevel contact: $0 (included in plan)
- SMS delivery: $0.01 - $0.02
- WhatsApp delivery: $0.005 - $0.01
- Email delivery: $0 (negligible)
- Flowcode scan: $0 (included in plan)

**Estimated Tech Cost per Signup: $0.015 - $0.03**

**Food Cost:**
- Average appetizer food cost: $2 - $4
- Assumes 60-70% redemption rate
- Effective cost: $1.20 - $2.80 per signup

**Physical Materials (One-Time):**
- QR code table tents: $2 - $5 per table
- One-time cost amortized over 1000+ scans

**Labor Cost:**
- Form creation: 2-4 hours
- Workflow development: 4-8 hours
- Staff training: 1 hour per location
- Ongoing management: 1-2 hours/week

**Total Cost per Acquired Customer: $1.50 - $3.00**

### ROI Calculation

**Assumptions:**
- Average check with free appetizer: $45
- Average margin: 65%
- Gross profit per visit: $29.25

**First Visit ROI:**
- Revenue: $45
- Minus promo cost: $3
- Minus food cost on order: $15.75
- Net profit: $26.25

**Lifetime Value (LVV):**
- If 20% return within 30 days: Additional $29.25 profit
- If 10% become regulars (4x/year): $117/year
- Even at conservative 10% retention, LTV > $50

**Break-Even:**
- Need 1 visit with $45 check to break even
- Any return visit is pure profit
- Email marketing to 1000 contacts could drive $5K+ in future revenue

**Conclusion: Positive ROI even if only 30% redeem and never return**

---

## 10. Success Criteria & Optimization

### Launch Success Metrics (First 30 Days)

**Minimum Viable Success:**
- [ ] 50+ signups
- [ ] >70% form completion rate
- [ ] >90% message delivery rate
- [ ] >40% redemption rate
- [ ] <5% error rate
- [ ] Zero critical system outages

**Strong Success:**
- [ ] 200+ signups
- [ ] >80% form completion rate
- [ ] >95% message delivery rate
- [ ] >60% redemption rate
- [ ] <2% error rate
- [ ] >15% of customers return within 30 days

### Optimization Opportunities

**A/B Testing Ideas:**
1. **Form Length**: 4 fields vs. 6 fields
2. **Appetizer Specificity**: "Free Appetizer" vs. "Free Guacamole"
3. **Urgency**: "Valid 7 days" vs. "Valid 48 hours"
4. **Message Timing**: Immediate vs. 15-minute delay (reduce no-shows)
5. **QR Code Design**: Text-heavy vs. image-focused
6. **Expiry Period**: 7 days vs. 14 days vs. 30 days

**Conversion Optimization:**
- Reduce form fields to absolute minimum
- Add social proof ("1000+ claimed!")
- Show appetizer image on form
- Add progress indicator if multi-step
- Optimize page load speed (<2s target)

**Redemption Optimization:**
- Send reminder on day 3 if not redeemed
- Send reminder on day 6 with urgency ("Expires tomorrow!")
- Test different reminder message copy
- Add "Tap to get directions" button in message

**Retention Optimization:**
- Post-redemption: Request review/feedback
- Add to email newsletter
- Birthday offer automation
- Segmented campaigns based on preferences
- VIP program for repeat visitors

### Scaling Considerations

**Multi-Location Expansion:**
- Location-specific QR codes and tracking
- Centralized vs. location-specific offers
- Franchise vs. corporate operations model
- White-label option for different brands

**Product Evolution:**
- Birthday club signup
- Loyalty program integration
- Referral system ("Bring a friend, both get free appetizer")
- Gamification (collect points, unlock rewards)
- Integration with online ordering
- Table reservation system integration

**Enterprise Features:**
- Multi-brand support
- Advanced analytics dashboard
- Manager mobile app
- Real-time redemption tracking
- Automated fraud detection
- Custom reporting per location

---

## 11. Implementation Checklist

### Pre-Launch Checklist

**Technical Setup:**
- [ ] n8n workflow created and tested
- [ ] GoHighLevel fully configured
- [ ] Communication platform integrated (SMS/WhatsApp)
- [ ] Landing page live and tested
- [ ] QR codes generated with correct URLs
- [ ] Analytics tracking implemented
- [ ] Error monitoring set up
- [ ] Backup/failover plan documented

**Design & Content:**
- [ ] Physical QR materials designed and printed
- [ ] Landing page matches brand
- [ ] Message templates approved
- [ ] Terms & conditions reviewed by legal
- [ ] Privacy policy updated
- [ ] All copy proofread (spelling, grammar)
- [ ] Translations verified if multilingual

**Operations:**
- [ ] Staff trained on redemption process
- [ ] Manager approval process defined
- [ ] Customer service scripts prepared
- [ ] POS system ready (manual or integrated)
- [ ] Appetizer menu finalized
- [ ] Kitchen staff notified of potential volume increase

**Compliance:**
- [ ] Privacy policy published
- [ ] Opt-out mechanism tested
- [ ] TCPA compliance verified
- [ ] Terms & conditions accessible
- [ ] Data retention policy defined
- [ ] Security measures in place

**Testing:**
- [ ] End-to-end flow tested 10+ times
- [ ] Tested on iOS and Android
- [ ] Tested on poor network conditions
- [ ] Duplicate detection verified
- [ ] Message delivery confirmed
- [ ] Redemption validation working
- [ ] Error scenarios handled gracefully

### Launch Day Checklist

**Morning:**
- [ ] Verify all systems operational
- [ ] Check webhook endpoint is live
- [ ] Confirm message templates loaded
- [ ] Place QR codes on tables
- [ ] Brief staff on launch
- [ ] Set up monitoring dashboard

**During Service:**
- [ ] Monitor signups in real-time
- [ ] Watch for error messages
- [ ] Check message delivery rates
- [ ] Assist first few redemptions
- [ ] Gather customer feedback
- [ ] Note any issues or confusion

**End of Day:**
- [ ] Review all signups (data quality)
- [ ] Check redemption count
- [ ] Review any errors or issues
- [ ] Survey staff experience
- [ ] Plan adjustments for tomorrow
- [ ] Send summary report to stakeholders

### Week 1 Review

- [ ] Analyze conversion funnel
- [ ] Calculate redemption rate
- [ ] Review customer feedback
- [ ] Identify top issues
- [ ] Plan optimizations
- [ ] Adjust messaging if needed
- [ ] Refine staff process
- [ ] Update documentation

---

## 12. Future Enhancements

### Phase 2 Features (Months 2-3)

**Advanced Personalization:**
- Remember customer preferences
- Personalized appetizer recommendations
- Birthday/anniversary automation
- Visit frequency tracking
- VIP tier system

**Referral Program:**
- "Refer a friend" functionality
- Unique referral codes
- Rewards for both parties
- Viral loop optimization
- Social sharing buttons

**Enhanced Analytics:**
- Cohort analysis
- Predictive LTV modeling
- A/B test framework
- Heat mapping (table performance)
- Customer journey visualization

**Operational Improvements:**
- Manager mobile app for approvals
- Real-time redemption dashboard
- Automated inventory alerts (if high volume)
- Staff performance tracking
- Integrated POS redemption

### Phase 3 Features (Months 4-6)

**Loyalty Integration:**
- Points system
- Tiered rewards
- Stamp card digitization
- Exclusive member benefits
- Gamification elements

**Omnichannel Expansion:**
- Online ordering integration
- Delivery platform sync
- Reservation system connection
- Email marketing automation
- Social media retargeting

**AI/ML Enhancements:**
- Churn prediction
- Optimal send time prediction
- Dynamic offer personalization
- Fraud detection
- Demand forecasting

**White-Label Platform:**
- Multi-tenant architecture
- Brand customization
- Self-service setup
- Franchise management
- Reseller program

---

## 13. Documentation & Training Materials

### For Restaurant Staff

**Quick Start Guide (1-Page):**
```
FREE APPETIZER PROMO - STAFF GUIDE

WHAT IS IT?
Customers scan QR code → Get free appetizer code → Show you the code

YOUR JOB:
1. Customer shows 6-character code (ex: APP42X)
2. Verify code looks legit (letters + numbers)
3. Give them choice of promo appetizers
4. Serve appetizer
5. Mark code as used (write on ticket or enter in app)

COMMON QUESTIONS:
Q: Code doesn't look right?
A: Ask manager to verify in system

Q: Customer lost code?
A: Get their name + phone, manager can look up

Q: Code expired?
A: Ask manager for approval to honor

Q: Can they use it for takeout?
A: No, dine-in only (but manager can approve)

PROBLEMS? Ask manager or text [support number]
```

### For Managers

**Operations Manual (10-15 Pages):**
- System overview
- Staff training guide
- Redemption verification process
- Customer service scenarios
- Fraud prevention
- Reporting and analytics
- Troubleshooting guide
- Contact information for tech support

### For Technical Team

**Technical Documentation:**
- System architecture diagram
- n8n workflow documentation
- GoHighLevel configuration guide
- API integration details
- Database schema (if applicable)
- Error codes and handling
- Monitoring and alerting setup
- Deployment procedures
- Backup and recovery
- Security protocols

### For Marketing Team

**Campaign Guide:**
- Target audience
- Messaging framework
- Brand guidelines
- Social media promotion ideas
- Email campaign templates
- Performance tracking
- Optimization playbook
- Case studies and testimonials

---

## 14. Conclusion

### Summary

This Appetizer Promotion Lead Capture System represents a complete customer acquisition solution for restaurants, combining:

1. **Frictionless Entry**: QR code scan (2 seconds)
2. **Quick Conversion**: Simple form (60 seconds)
3. **Instant Gratification**: Immediate code delivery (30 seconds)
4. **Valuable Database**: Permanent CRM contact
5. **Measurable ROI**: Track from scan to lifetime value

### Core Strengths

- **Scalable**: Works for 1 location or 100
- **Automated**: Minimal staff intervention
- **Trackable**: Every step measured
- **Cost-Effective**: <$3 per acquired customer
- **Proven**: Based on established marketing principles

### Success Factors

1. **Simplicity**: 3-step process (scan, fill, receive)
2. **Speed**: Total time <3 minutes from scan to code
3. **Value**: Clear, immediate benefit to customer
4. **Quality**: Professional execution builds trust
5. **Follow-Through**: Strong redemption and retention

### Next Steps

1. **Review & Approve**: Stakeholder sign-off on this spec
2. **Technical Build**: Implement n8n workflow (1-2 weeks)
3. **Design**: Create physical and digital assets (1 week)
4. **Test**: Thorough testing (1 week)
5. **Pilot**: Soft launch at 1 location (1 week)
6. **Scale**: Roll out to all locations (ongoing)

### Investment Required

**Time**: 4-6 weeks from start to full launch
**Budget**:
- Technology: $0-500 (mostly included in existing tools)
- Design/Print: $200-500 (QR materials)
- Staff Training: 5-10 hours total
- Ongoing: ~$0.03 per signup + food cost

**Expected Return**:
- 200-500 new CRM contacts per month per location
- 40-60% redemption rate
- 15-25% return visit rate
- Positive ROI within first month
- Long-term LTV $50-150 per contact

---

## Appendix A: Workflow JSON Structure

```json
{
  "name": "Appetizer Promo - Lead Capture",
  "nodes": [
    {
      "name": "Webhook - Form Submission",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [0, 0],
      "webhookId": "unique-webhook-id",
      "parameters": {
        "path": "appetizer-signup",
        "responseMode": "lastNode",
        "options": {}
      }
    },
    {
      "name": "Validate Form Data",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [200, 0]
    },
    {
      "name": "Check for Duplicate",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [400, 0],
      "parameters": {
        "url": "={{$env.GHL_API_URL}}/contacts/search",
        "method": "POST"
      }
    },
    {
      "name": "Generate Redemption Code",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [600, 0]
    },
    {
      "name": "Create/Update GHL Contact",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [800, 0],
      "parameters": {
        "url": "={{$env.GHL_API_URL}}/contacts",
        "method": "POST"
      }
    },
    {
      "name": "Send WhatsApp Message",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [1000, -100]
    },
    {
      "name": "Send SMS Fallback",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [1000, 100]
    },
    {
      "name": "Log to Database",
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 1,
      "position": [1200, 0]
    },
    {
      "name": "Error Handler",
      "type": "n8n-nodes-base.errorTrigger",
      "typeVersion": 1,
      "position": [600, 200]
    }
  ],
  "connections": {},
  "settings": {},
  "tags": ["appetizer-promo", "lead-capture"]
}
```

---

## Appendix B: Sample Message Templates

### WhatsApp Template (Spanish)

**Template Name**: `appetizer_welcome_es`

```
¡Hola {{1}}! 🎉

¡Bienvenido a la familia de {{2}}!

Tu código para aperitivo GRATIS:

🎫 *{{3}}*

📋 **Cómo reclamar:**
• Muestra este código a tu mesero
• Elige tu aperitivo favorito
• ¡Disfruta!

⏰ Válido hasta: *{{4}}* (7 días)

💬 ¿Tienes preguntas? Responde a este mensaje.

¡Nos vemos pronto!

{{2}} 🌮
```

**Variables:**
1. First Name
2. Restaurant Name
3. Redemption Code
4. Expiry Date

### SMS Template (English)

**Template Name**: `appetizer_welcome_en`

```
Hi {{1}}! 🎉

Your FREE appetizer awaits at {{2}}!

Code: {{3}}

Show this code to your server to claim your {{4}}.

Valid until: {{5}}

Thanks for joining us!

Reply STOP to unsubscribe
```

### Reminder Template (3 Days)

```
Hi {{1}}! 👋

Just a reminder - your FREE {{2}} is waiting!

Code: {{3}}
Expires: {{4}}

See you soon at {{5}}! 🌟
```

### Expiry Warning (24 Hours)

```
Hi {{1}}! ⏰

Last chance! Your FREE appetizer code expires in 24 hours.

Code: {{3}}
Expires: {{4}} at midnight

Don't miss out! {{5}}
```

---

## Appendix C: GoHighLevel Custom Fields

```json
{
  "customFields": [
    {
      "name": "redemption_code",
      "fieldKey": "contact.redemption_code",
      "dataType": "TEXT",
      "required": false
    },
    {
      "name": "offer_expiry",
      "fieldKey": "contact.offer_expiry",
      "dataType": "DATE",
      "required": false
    },
    {
      "name": "table_number",
      "fieldKey": "contact.table_number",
      "dataType": "TEXT",
      "required": false
    },
    {
      "name": "signup_timestamp",
      "fieldKey": "contact.signup_timestamp",
      "dataType": "DATE",
      "required": false
    },
    {
      "name": "redemption_status",
      "fieldKey": "contact.redemption_status",
      "dataType": "TEXT",
      "required": false,
      "options": ["pending", "claimed", "expired"]
    },
    {
      "name": "redemption_timestamp",
      "fieldKey": "contact.redemption_timestamp",
      "dataType": "DATE",
      "required": false
    },
    {
      "name": "location_id",
      "fieldKey": "contact.location_id",
      "dataType": "TEXT",
      "required": false
    },
    {
      "name": "promo_signup_count",
      "fieldKey": "contact.promo_signup_count",
      "dataType": "NUMBER",
      "required": false
    }
  ]
}
```

---

**Document Version**: 1.0
**Last Updated**: 2024-06-15
**Author**: Product Team
**Status**: Draft for Review
