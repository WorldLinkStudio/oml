# Implementation Guide - Open Music License (OML)

**A practical guide to implementing OML in your music projects**

## Table of Contents

1. [For Music Creators](#for-music-creators)
2. [For Music Users](#for-music-users)
3. [Technical Implementation](#technical-implementation)
4. [Attribution Implementation](#attribution-implementation)
5. [Revenue Tracking](#revenue-tracking)
6. [License Management](#license-management)
7. [Troubleshooting](#troubleshooting)

## For Music Creators

### Preparing Your Music for OML Licensing

#### 1. File Organization

```text
Your Music Project/
├── LICENSE.txt (OML-P, OML-C, or OML-S)
├── README.md (project description)
├── metadata.txt (track information)
├── stems/ (if applicable)
├── alternate_versions/ (instrumental, clean, etc.)
└── audio_files/
    ├── [Track Name]_[Your Name]_Master.wav
    ├── [Track Name]_[Your Name]_Instrumental.wav
    └── [Track Name]_[Your Name]_Stems.zip
```

#### 2. Required Documentation

**LICENSE.txt Template:**

```text
Open Music License (OML) - Personal Use License
Version 1.0 - Effective October 2025

Work: [Your Track Title]
Creator: [Your Name]
Contact: [your-email@example.com]
Website: [your-website.com]

[Include full OML-P license text]
```

**metadata.txt Template:**

```text
TRACK INFORMATION
================
Title: [Track Title]
Artist: [Your Name]
Duration: [MM:SS]
BPM: [Beats Per Minute]
Key: [Musical Key]
Genre: [Genre]
Year: [Year Created]

TECHNICAL SPECS
===============
Format: WAV 24-bit/44.1kHz
ISRC: [If you have one]
Copyright: (C) [Year] [Your Name]

PRO AFFILIATION
===============
ASCAP/BMI/SESAC: [Your PRO]
Member ID: [Your ID]
Publisher: [Your Publishing Company]

CONTACT INFORMATION
===================
Email: [your-email@example.com]
Website: [your-website.com]
Social: [@yourhandle]

LICENSE TERMS
=============
This work is licensed under OML-P (Personal Use License)
Commercial licensing available - contact for terms
```

#### 3. Audio File Preparation

**Master File Requirements:**

- Format: WAV 24-bit/44.1kHz (minimum)
- Naming: `[Track Title]_[Your Name]_Master.wav`
- Metadata: Include all required attribution fields
- Quality: Professional mix and master

**Stems (if providing):**

- Format: WAV 24-bit/44.1kHz
- Naming: `[Track Title]_[Your Name]_[Stem Name].wav`
- Examples: `TrackName_YourName_Drums.wav`, `TrackName_YourName_Bass.wav`
- Sync: All stems must be time-aligned

**Alternate Versions:**

- Instrumental: Full mix without lead vocals
- Clean: Radio/broadcast-safe version
- Extended: Longer version if applicable
- Short: 30-second version for previews

#### 4. Metadata Implementation

**ID3v2 Tags (for MP3s):**

```text
Title: [Track Title]
Artist: [Your Name]
Album: [Album Name or "Single"]
Year: [Year]
Genre: [Genre]
Comment: Licensed under OML-P. Contact: [your-email@example.com]
Copyright: (C) [Year] [Your Name]
Composer: [Your Name]
Publisher: [Your Publishing Company]
```

**Vorbis Comments (for OGG/FLAC):**

```text
TITLE=[Track Title]
ARTIST=[Your Name]
ALBUM=[Album Name]
DATE=[Year]
GENRE=[Genre]
COMMENT=Licensed under OML-P. Contact: [your-email@example.com]
COPYRIGHT=(C) [Year] [Your Name]
COMPOSER=[Your Name]
```

### Setting Up Commercial Licensing

#### 1. Choose Your Pricing Structure

**Option A: Percentage-Based**

- Set your royalty rates (2-10% depending on use type)
- Require quarterly reporting
- Set minimum thresholds ($50/quarter)

**Option B: Flat Fee**

- Create pricing tiers based on project type
- Set payment terms (50% upfront, 50% on delivery)
- Define scope limitations

**Option C: Hybrid**

- Combine upfront fee with reduced ongoing royalties
- Attract users who want lower ongoing costs

#### 2. Create License Execution Templates

**OML-C Execution Agreement Template:**

```text
OML-C LICENSE EXECUTION AGREEMENT

Project: [Project Title]
Licensee: [Licensee Name]
Work: [Your Track Title]
Fee: $[Amount]
Payment Structure: [Percentage/Flat/Hybrid]

Terms:
- Term: [Duration]
- Territory: [Geographic Scope]
- Media: [Distribution Platforms]
- Exclusivity: [None/Category/Project/Total]

Payment Schedule:
- [Payment terms]

Attribution Requirements:
- [Specific credit requirements]

[Include signature lines and contact information]
```

#### 3. Revenue Tracking Setup

**For Percentage-Based Licenses:**

- Set up quarterly reporting schedule
- Create reporting templates
- Establish payment methods (PayPal, bank transfer, etc.)
- Set up record-keeping system

**For Flat Fee Licenses:**

- Create invoice templates
- Set up payment processing
- Define delivery timelines
- Establish support channels

## For Music Users

### Choosing the Right License

#### 1. Assess Your Project

**Questions to Ask:**

- What's your expected revenue from this project?
- How will the music be used? (background, featured, sync)
- What's your project timeline?
- Do you need exclusive rights?
- What's your budget for music licensing?

#### 2. License Selection Guide

**Use OML-P (Personal) if:**

- Project revenue < $1,000/year
- Personal/hobby project
- Educational use
- Non-commercial distribution

**Use OML-C (Commercial) if:**

- Project revenue > $1,000/year
- Professional release
- Need commercial rights
- Want to sublicense

**Use OML-S (Sync) if:**

- Putting music in video/film/TV
- Need sync rights specifically
- Project-specific licensing
- Professional production

#### 3. Contacting Creators

**Initial Contact Template:**

```text
Subject: OML License Inquiry - [Your Project Name]

Hi [Creator Name],

I'm interested in licensing your track "[Track Title]" for my project "[Project Name]".

Project Details:
- Type: [Film/TV/Game/Release/etc.]
- Budget: [Your Budget Range]
- Timeline: [When you need it]
- Expected Revenue: [Your Revenue Projection]
- Use: [How you'll use the music]

I believe I need [OML-P/OML-C/OML-S] licensing based on my project scope.

Could you please provide:
1. License terms and pricing
2. Required attribution format
3. Delivery timeline
4. Payment methods

Thank you for your time!

Best regards,
[Your Name]
[Your Contact Information]
```

### Implementing Attribution

#### 1. Audio File Attribution

**For Music Releases:**

```bash
# Using ffmpeg to add metadata
ffmpeg -i input.wav -metadata title="Track Title" \
  -metadata artist="Your Name feat. Original Creator" \
  -metadata comment="Contains '[Original Title]' by [Creator Name]. Licensed under OML-P." \
  -metadata copyright="(C) [Year] [Your Name]" \
  output.wav
```

**For Streaming Platforms:**

- Use platform-specific credit features
- Spotify: Add in Credits section
- Apple Music: Use Contributor fields
- YouTube: Include in video description

#### 2. Video Attribution

**YouTube Description Template:**

```text
Music Credits:
"[Original Title]" by [Creator Name] (C) [Year] [Creator Name]
Licensed under OML-P License
Contact: [creator-email@example.com]

[Your other video information]
```

**End Credits Template:**

```text
Music Credits
"[Original Title]" by [Creator Name]
Licensed under OML-P License
```

#### 3. Website Attribution

**HTML Implementation:**

```html
<div class="music-credits">
  <h3>Music Credits</h3>
  <p>
    "<a href="[creator-website]">[Original Title]</a>" by
    <a href="[creator-website]">[Creator Name]</a>
    (C) [Year] [Creator Name]<br />
    Licensed under <a href="[license-url]">OML-P License</a>
  </p>
</div>
```

**CSS Styling:**

```css
.music-attribution {
  font-size: 0.9em;
  color: #666;
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.music-attribution a {
  color: #333;
  text-decoration: none;
}

.music-attribution a:hover {
  text-decoration: underline;
}
```

## Technical Implementation

### Metadata Standards

#### 1. ID3v2 Implementation

**Python Example:**

```python
from mutagen.id3 import ID3, TIT2, TPE1, TALB, TYER, TCON, TCOP, TCOM, COMM

def add_oml_metadata(file_path, track_info):
    audio = ID3(file_path)

    # Basic track info
    audio['TIT2'] = TIT2(encoding=3, text=track_info['title'])
    audio['TPE1'] = TPE1(encoding=3, text=track_info['artist'])
    audio['TALB'] = TALB(encoding=3, text=track_info['album'])
    audio['TYER'] = TYER(encoding=3, text=str(track_info['year']))
    audio['TCON'] = TCON(encoding=3, text=track_info['genre'])

    # Copyright and composer
    audio['TCOP'] = TCOP(encoding=3, text=f"(C) {track_info['year']} {track_info['creator']}")
    audio['TCOM'] = TCOM(encoding=3, text=track_info['creator'])

    # License information in comment
    license_text = f"Contains '{track_info['original_title']}' by {track_info['creator']}. Licensed under OML-P."
    audio['COMM'] = COMM(encoding=3, lang='eng', desc='', text=license_text)

    audio.save()

# Usage
track_info = {
    'title': 'My New Track',
    'artist': 'My Name feat. Original Creator',
    'album': 'My Album',
    'year': 2025,
    'genre': 'Electronic',
    'creator': 'Original Creator Name',
    'original_title': 'Original Track Title'
}

add_oml_metadata('my_track.mp3', track_info)
```

#### 2. Vorbis Comments Implementation

**Python Example:**

```python
from mutagen.oggvorbis import OggVorbis

def add_vorbis_metadata(file_path, track_info):
    audio = OggVorbis(file_path)

    audio['TITLE'] = track_info['title']
    audio['ARTIST'] = track_info['artist']
    audio['ALBUM'] = track_info['album']
    audio['DATE'] = str(track_info['year'])
    audio['GENRE'] = track_info['genre']
    audio['COPYRIGHT'] = f"(C) {track_info['year']} {track_info['creator']}"
    audio['COMPOSER'] = track_info['creator']

    # License information
    license_text = f"Contains '{track_info['original_title']}' by {track_info['creator']}. Licensed under OML-P."
    audio['COMMENT'] = license_text

    audio.save()
```

### Revenue Tracking Implementation

#### 1. Simple Tracking Spreadsheet

**Google Sheets Template:**

```text
A: Date
B: Source (YouTube, Patreon, etc.)
C: Amount
D: Currency
E: USD Equivalent
F: Project Using Music
G: Notes
H: Running Total
```

**Formulas:**

- E2: `=C2*GOOGLEFINANCE("CURRENCY:"&D2&"USD")`
- H2: `=SUM($E$2:E2)`

#### 2. Automated Tracking Script

**Python Revenue Tracker:**

```python
import pandas as pd
from datetime import datetime, timedelta
import requests

class RevenueTracker:
    def __init__(self):
        self.revenue_data = []
        self.threshold = 1000  # USD

    def add_revenue(self, amount, currency, source, project, date=None):
        if date is None:
            date = datetime.now()

        # Convert to USD (simplified - use real API in production)
        usd_amount = self.convert_to_usd(amount, currency)

        self.revenue_data.append({
            'date': date,
            'amount': amount,
            'currency': currency,
            'usd_amount': usd_amount,
            'source': source,
            'project': project
        })

    def convert_to_usd(self, amount, currency):
        if currency == 'USD':
            return amount
        # Use real currency conversion API
        # For demo purposes, simple conversion
        conversion_rates = {'EUR': 1.1, 'GBP': 1.3, 'CAD': 0.75}
        return amount * conversion_rates.get(currency, 1.0)

    def check_threshold(self, days=365):
        cutoff_date = datetime.now() - timedelta(days=days)
        recent_revenue = sum(
            item['usd_amount'] for item in self.revenue_data
            if item['date'] >= cutoff_date
        )

        if recent_revenue >= self.threshold:
            print(f"⚠️  Revenue threshold exceeded: ${recent_revenue:.2f}")
            print("Contact creator for commercial license!")
        else:
            remaining = self.threshold - recent_revenue
            print(f"✅ Revenue within limit: ${recent_revenue:.2f} (${remaining:.2f} remaining)")

    def generate_report(self):
        df = pd.DataFrame(self.revenue_data)
        return df.groupby(['source', 'project']).agg({
            'usd_amount': 'sum'
        }).reset_index()

# Usage
tracker = RevenueTracker()
tracker.add_revenue(100, 'USD', 'YouTube', 'My Video Series')
tracker.add_revenue(50, 'EUR', 'Patreon', 'My Podcast')
tracker.check_threshold()
```

## License Management

### 1. License File Organization

**Project Structure:**

```text
My Project/
├── licenses/
│   ├── oml-p-license.txt
│   ├── oml-c-agreement.pdf
│   └── license-log.md
├── music/
│   ├── licensed-tracks/
│   └── attribution/
└── documentation/
    ├── revenue-tracking.xlsx
    └── usage-log.md
```

**License Log Template:**

```markdown
# License Usage Log

## Track: [Track Name] by [Creator Name]

**License Type:** OML-P (Personal Use License)
**Date Licensed:** [Date]
**Contact:** [creator-email@example.com]
**Usage:** [How you're using it]
**Revenue Tracking:** [Link to tracking sheet]

### Attribution Requirements:

- [Required attribution format]

### Revenue Status:

- Current Revenue: $[Amount]
- Threshold: $1,000
- Status: [Within limit/Exceeded]

### Notes:

- [Any special terms or notes]
```

### 2. Automated License Compliance

**License Checker Script:**

```python
import os
import json
from datetime import datetime

class LicenseComplianceChecker:
    def __init__(self, project_root):
        self.project_root = project_root
        self.license_file = os.path.join(project_root, 'licenses', 'license-log.md')

    def check_attribution(self, file_path):
        """Check if file has proper attribution"""
        # Implementation depends on file type
        pass

    def check_revenue_threshold(self):
        """Check if revenue threshold is exceeded"""
        # Implementation depends on tracking system
        pass

    def generate_compliance_report(self):
        """Generate compliance report"""
        report = {
            'date': datetime.now().isoformat(),
            'attribution_status': 'compliant',  # or 'non-compliant'
            'revenue_status': 'within_limit',   # or 'exceeded'
            'recommendations': []
        }

        if report['revenue_status'] == 'exceeded':
            report['recommendations'].append('Upgrade to OML-C license')

        return report
```

## Troubleshooting

### Common Implementation Issues

#### 1. Attribution Not Showing Up

**Problem:** Credits aren't appearing in your content

**Solutions:**

- Check platform-specific requirements
- Ensure metadata is properly embedded
- Verify HTML/CSS is correct
- Test on different devices/browsers

#### 2. Revenue Tracking Confusion

**Problem:** Not sure what counts as revenue

**Solutions:**

- Review OML revenue definitions
- Use the tracking spreadsheet template
- When in doubt, include it in tracking
- Contact creator for clarification

#### 3. License Upgrade Process

**Problem:** Need to upgrade from OML-P to OML-C

**Solutions:**

- Contact creator immediately
- Provide revenue documentation
- Negotiate commercial terms
- Execute new license agreement

#### 4. Technical Metadata Issues

**Problem:** Metadata not embedding properly

**Solutions:**

- Use proper tools (ffmpeg, mutagen, etc.)
- Check file format compatibility
- Verify encoding settings
- Test on multiple platforms

### Getting Help

#### Creator Support

- Check creator's website for FAQ
- Contact via provided email
- Check social media for updates
- Join creator's community if available

#### Technical Support

- OML documentation and examples
- Community forums and discussions
- Professional services for complex implementations
- Legal consultation for commercial projects

---

_This implementation guide provides practical steps for using OML licenses effectively. Always refer to the full license text for complete terms and conditions._
