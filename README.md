# Hospital Landing Page with eBook Form

A modern, responsive hospital landing page built with Next.js 14, featuring an eBook download form with Google Sheets integration and security measures to prevent screenshots and screen recording.

## Features

- **Modern Hospital Landing Page**: Professional design showcasing hospital services and information
- **eBook Download Form**: Modal form collecting user details before eBook access
- **Data Storage**: Dual storage system (local files + Google Sheets)
- **Security Measures**: Front-end protection against screenshots and screen recording
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Client-side validation with react-hook-form

## Security Features

- Disabled right-click context menu
- Disabled keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S)
- Disabled text selection and drag/drop
- Print screen detection and prevention
- Developer tools detection with content blur
- Disabled print functionality

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Data Storage**: Local JSON/CSV files + Google Sheets API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Console account (optional, for Sheets integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hospital-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Google Sheets (Optional)**
   
   If you want to enable Google Sheets integration:
   
   a. Go to [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Create a new project or select an existing one
   
   c. Enable the Google Sheets API
   
   d. Create a Service Account:
      - Go to "IAM & Admin" > "Service Accounts"
      - Click "Create Service Account"
      - Fill in the details and create
      - Click on the created service account
      - Go to "Keys" tab and create a new JSON key
   
   e. Update your `.env.local` file with the service account details
   
   f. Create a Google Sheet and share it with your service account email
   
   g. Copy the Sheet ID from the URL and add it to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
hospital-landing-page/
├── app/
│   ├── api/
│   │   └── submit-form/
│   │       └── route.ts          # Form submission API endpoint
│   ├── components/
│   │   └── EbookModal.tsx        # eBook form modal component
│   ├── globals.css               # Global styles and security CSS
│   ├── layout.tsx                # Root layout with security scripts
│   └── page.tsx                  # Main landing page
├── data/                         # Local data storage (created automatically)
│   ├── form-submissions.json     # JSON format submissions
│   └── form-submissions.csv      # CSV format submissions
├── .env.example                  # Environment variables template
├── .env.local                    # Your environment variables (create this)
├── package.json
└── README.md
```

## Data Storage

The application stores form submissions in two ways:

### Local Storage
- **JSON Format**: `data/form-submissions.json` - Structured data with timestamps and IDs
- **CSV Format**: `data/form-submissions.csv` - Spreadsheet-compatible format

### Google Sheets (Optional)
- Real-time updates to your Google Sheet
- Automatic header creation
- Timestamped entries with unique IDs

## Form Fields

The eBook form collects the following information:
- Full Name (required)
- Email Address (required, validated)
- Mobile Number (required, validated)
- College Year (dropdown selection)
- Branch (dropdown selection)

## Security Implementation

### Client-Side Protection
- **Right-click disabled**: Prevents context menu access
- **Keyboard shortcuts blocked**: F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
- **Text selection disabled**: Prevents copy operations
- **Drag & drop disabled**: Prevents image/content dragging
- **Print functionality disabled**: Blocks printing attempts

### Developer Tools Detection
- Detects when developer tools might be open
- Blurs content and shows warning message
- Based on viewport dimensions

### Note on Security
These are front-end security measures that provide basic protection against casual screenshot attempts. For enterprise-level security, consider server-side solutions and DRM technologies.

## Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind classes in components
- Customize the color scheme in `tailwind.config.js`

### Content
- Update hospital information in `app/page.tsx`
- Modify form fields in `app/components/EbookModal.tsx`
- Customize services and features sections

### Form Fields
To add/modify form fields:
1. Update the `FormData` interface in `EbookModal.tsx`
2. Add form validation rules
3. Update the API endpoint in `app/api/submit-form/route.ts`
4. Modify the Google Sheets headers if needed

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_SHEETS_ID` | Google Sheet ID from URL | Optional |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email | Optional |
| `GOOGLE_PRIVATE_KEY` | Service account private key | Optional |

## Troubleshooting

### Google Sheets Integration Issues
1. Verify service account has access to the sheet
2. Check that the Google Sheets API is enabled
3. Ensure private key format is correct (with \n for line breaks)
4. Verify the Sheet ID is correct

### Form Submission Issues
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check file permissions for local storage
4. Ensure all required fields are filled

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the environment setup

---

**Note**: This application includes front-end security measures to prevent screenshots and screen recording. While these provide basic protection, they should not be considered foolproof for highly sensitive content.