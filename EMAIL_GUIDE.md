# Email Management Guide for The Sixth Rift

This guide explains how to manage subscribers and send emails to your fanbase.

## Overview

The application now includes a complete subscriber management system that:
- Collects email addresses from visitors through the newsletter signup form
- Stores subscribers in memory (or database if you switch storage)
- Provides API endpoints to access subscriber information
- Integrates with Resend for sending transactional emails

## Subscriber System

### How Subscribers Are Collected

Visitors can subscribe to your newsletter by entering their email address in the "Stay in the Loop" section on your website. When they submit:

1. Their email is validated
2. Checked for duplicates (they can't subscribe twice with the same email)
3. Stored in the system with a timestamp
4. They receive a confirmation message

### Viewing Your Subscribers

You can retrieve all subscribers by making a GET request to:

```
GET http://your-replit-url.replit.app/api/subscribers
```

This returns a JSON array of all subscribers with their email addresses and subscription dates.

**Example Response:**
```json
[
  {
    "id": "uuid-here",
    "email": "fan@example.com",
    "subscribedAt": "2025-10-31T12:00:00.000Z"
  }
]
```

## Setting Up Email Sending with Resend

To send emails to your subscribers, you'll need to set up the Resend integration:

### Step 1: Set Up Resend Integration

1. Click the "Set up Resend" button that will appear
2. Follow the prompts to connect your Resend account
3. Resend will manage your API keys securely

### Step 2: Verify Your Domain (Optional but Recommended)

To send emails from your own domain (e.g., hello@thesixthrift.com):
1. Go to your Resend dashboard
2. Add and verify your domain
3. Update the email addresses in your code

### Step 3: Create Email Templates

Here's how to send emails to all subscribers:

```javascript
// Example: Send a newsletter to all subscribers
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Get all subscribers
const response = await fetch('/api/subscribers');
const subscribers = await response.json();

// Send email to all subscribers
for (const subscriber of subscribers) {
  await resend.emails.send({
    from: 'The Sixth Rift <hello@thesixthrift.com>',
    to: subscriber.email,
    subject: 'New Track Release: Cosmic Dreams',
    html: `
      <h1>Exciting News!</h1>
      <p>Hi there,</p>
      <p>We're thrilled to announce the release of our new track "Cosmic Dreams"!</p>
      <p>Listen now on all major platforms.</p>
      <p>- The Sixth Rift</p>
    `
  });
}
```

## Email Templates & Use Cases

### 1. New Track Release Announcement

```javascript
{
  subject: 'New Track: [Track Name] is Live!',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #D4A574;">New Music Alert!</h1>
      <p>We're excited to share our latest creation with you.</p>
      <h2>[Track Name]</h2>
      <p>[Brief description of the track]</p>
      <a href="[link-to-track]" style="background-color: #D4A574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 16px;">
        Listen Now
      </a>
    </div>
  `
}
```

### 2. Upcoming Show/Event Notification

```javascript
{
  subject: 'Join Us Live - [Event Name]',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>See You There!</h1>
      <p>We're performing live at [Venue] on [Date]</p>
      <p><strong>Date:</strong> [Date]<br>
      <strong>Time:</strong> [Time]<br>
      <strong>Location:</strong> [Address]</p>
      <a href="[ticket-link]">Get Tickets</a>
    </div>
  `
}
```

### 3. Monthly Newsletter

```javascript
{
  subject: 'The Sixth Rift - [Month] Update',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Monthly Update</h1>
      <h2>What We've Been Up To</h2>
      <p>[Updates about the band, studio work, etc.]</p>
      
      <h2>Upcoming Releases</h2>
      <p>[Information about upcoming tracks]</p>
      
      <h2>Behind the Scenes</h2>
      <p>[Share interesting stories or insights]</p>
    </div>
  `
}
```

## Creating an Email Sending Utility (Server-Side)

Add this to your server code to easily send emails:

```typescript
// server/email.ts
import { Resend } from 'resend';
import { storage } from './storage';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendToAllSubscribers(
  subject: string,
  html: string,
  from: string = 'The Sixth Rift <hello@thesixthrift.com>'
) {
  const subscribers = await storage.getAllSubscribers();
  
  const results = await Promise.allSettled(
    subscribers.map(subscriber =>
      resend.emails.send({
        from,
        to: subscriber.email,
        subject,
        html,
      })
    )
  );
  
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  return {
    total: subscribers.length,
    successful,
    failed,
  };
}
```

Then create an API route for sending emails:

```typescript
// In server/routes.ts
app.post("/api/send-newsletter", async (req, res) => {
  try {
    const { subject, html } = req.body;
    const result = await sendToAllSubscribers(subject, html);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to send emails" });
  }
});
```

## Best Practices

1. **Personalization**: Include subscriber names when possible
2. **Frequency**: Don't spam - send meaningful updates (once a month is good)
3. **Unsubscribe Link**: Always include an unsubscribe option (legal requirement)
4. **Mobile-Friendly**: Keep emails simple and mobile-responsive
5. **Test First**: Send test emails to yourself before sending to all subscribers
6. **Track Engagement**: Use Resend's analytics to see open rates

## Example: Complete Email Workflow

1. **Collect subscribers** - Happens automatically through your website
2. **Check subscriber count**: `GET /api/subscribers`
3. **Prepare your email** - Write HTML content
4. **Send emails** - Use the Resend integration
5. **Monitor results** - Check Resend dashboard for delivery status

## Editing Email Content

To customize email templates:

1. Create HTML templates in a `/server/email-templates/` folder
2. Use template variables for personalization: `{{subscriber.email}}`, `{{track.title}}`, etc.
3. Load templates in your email sending function
4. Replace variables with actual data before sending

## Switching from In-Memory to Database Storage

Currently, subscribers are stored in memory (will be lost on restart). To persist them:

1. The schema is already set up in `shared/schema.ts`
2. Create a PostgreSQL database using the Replit tools
3. Implement a `DbStorage` class instead of `MemStorage`
4. Subscribers will persist across restarts

## Support & Resources

- **Resend Documentation**: https://resend.com/docs
- **Email Best Practices**: https://resend.com/best-practices
- **HTML Email Templates**: Search for "responsive email templates" for ready-made designs

---

**Questions?** The subscriber system is fully functional and ready to use. Set up Resend integration to start sending emails!
