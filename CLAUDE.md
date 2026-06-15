# QR Code Generator - Utility Tool

## Overview

The QR Code Generator is a utility tool available for creating branded QR codes with the customer logo embedded in the center. QR codes are scannable images that store information and can be read by smartphone cameras.


---

## What is a QR Code?

A QR (Quick Response) code is a two-dimensional barcode that can store various types of information. When scanned with a smartphone camera or QR reader app, it instantly decodes the stored data and performs the appropriate action (opening a URL, composing an email, connecting to WiFi, etc.).

---

## Features

### Content Types Supported

The QR Generator supports 5 different content types:

| Type | Description | Example Output |
|------|-------------|----------------|
| **URL** | Website links | Opens browser to specified website |
| **Text** | Plain text messages | Displays text on device |
| **Email** | Email addresses | Opens email app with pre-filled recipient |
| **Phone** | Phone numbers | Opens phone dialer with number ready |
| **WiFi** | WiFi network credentials | Auto-connects device to network |

### Customization Options

- **QR Code Size:** 150x150, 200x200, 300x300, 400x400, 500x500 pixels
- **Color Presets:** ....
- **Custom Colors:** Full color picker for any color
- **Logo Variants:** Standard logo

### Output Features

- **Download PNG:** Save QR code as PNG image file
- **Copy to Clipboard:** Copy QR code image directly for pasting

---

## Use Cases

### 1. Event Management

- **Event Registration:** Create QR codes linking to registration forms
- **Event Check-in:** Generate unique QR codes for attendee check-in
- **Event Materials:** Link to digital event programs or schedules

### 2. Marketing & Communications

- **Promotional Materials:** Add QR codes to posters linking to landing pages
- **Business Cards:** Include personal contact QR codes on digital cards
- **Social Media Links:** Quick links to social media profiles
- **Brochures & Flyers:** Link printed materials to online content

### 3. Academic Use

- **Course Materials:** Link to online resources, reading materials
- **Submission Portals:** Quick access to assignment submission pages
- **Survey & Feedback:** Link to student feedback forms
- **Research Papers:** Link to full papers or supplementary materials

### 4. Administrative Operations

- **WiFi Access:** Share guest WiFi credentials easily
- **Room Booking:** Link to room reservation systems
- **Document Access:** Quick links to shared documents
- **Contact Information:** Share staff contact details efficiently

### 5. Campus Navigation

- **Building Directions:** Link to campus maps
- **Facility Information:** Details about labs, libraries, rooms
- **Emergency Information:** Quick access to emergency procedures

---

## How to Use

### Step 1: Select Content Type

Choose from URL, Text, Email, Phone, or WiFi based on what information you want to encode.

### Step 2: Enter Content

Input the relevant information:
- **URL:** Full website address (must include `http://` or `https://`)
- **Text:** Any message (Vietnamese characters supported)
- **Email:** Valid email address
- **Phone:** Phone number with country code
- **WiFi:** Network name, password, and security type

### Step 3: Customize Appearance

- Select preferred size based on intended use
- Choose a color that matches your branding needs
- Toggle white logo if using dark QR colors

### Step 4: Generate & Export

- Click "Generate QR Code" to create
- Download as PNG or copy to clipboard for use

---

## WiFi QR Code Details

For WiFi QR codes, the generator creates a standard WiFi configuration format:

```
WIFI:T:{encryption};S:{network_name};P:{password};;
```

**Security Types:**
- WPA/WPA2 (most common, recommended)
- WEP (legacy)
- No Password (open networks)

When scanned, compatible devices will prompt to connect to the network automatically.



#### Basic Validations
-
-
-
-
-

#### Content Filtering (18+ & NSFW Protection)


## Best Practices

### Do's

- **Test before printing:** Always scan your QR code to verify it works
- **Use appropriate size:** Larger sizes for posters, smaller for digital use
- **Ensure contrast:** Dark QR on light background works best
- **Add context:** Include text near QR explaining what it links to
- **Use short URLs:** Shorter data = simpler, more scannable QR codes

### Don'ts

- **Don't make too small:** Minimum 2cm x 2cm for reliable scanning
- **Don't distort:** Keep QR codes square, no stretching
- **Don't over-customize:** Too many color changes can affect scannability
- **Don't hide:** Place QR codes in visible, accessible locations

---

## Common Scenarios

### Scenario 1: Conference Poster
Create a URL QR code linking to the conference registration page. Use ... color with standard logo. Download at 400x400 for high-quality printing.

### Scenario 2: Guest WiFi
Create a WiFi QR code with network name, WPA2 password. Print and display in meeting rooms for easy guest access.

### Scenario 3: Email Contact
Create an email QR code for department contact. When scanned, opens email app with recipient pre-filled.

### Scenario 4: Event Feedback
Create a URL QR code linking to a Google Form or survey. Display on event materials for instant feedback collection.

---



## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI` | Gemini API key for AI content moderation | Optional (enhances filtering) |
| `VITE_FIREBASE_*` | Firebase config for QR tracking | Required for tracking |