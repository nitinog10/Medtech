# Installation Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   Create a `.env.local` file in the root directory with the following content:
   ```env
   # Google Sheets Configuration
   GOOGLE_SHEETS_ID=your_google_sheets_id_here
   GOOGLE_PROJECT_ID=your_project_id
   GOOGLE_PRIVATE_KEY_ID=your_private_key_id
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
   GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
   GOOGLE_CLIENT_ID=your_client_id
   ```

3. **Run the Application**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## Google Sheets Setup (Optional but Recommended)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down the Project ID

### Step 2: Enable Google Sheets API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### Step 3: Create Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Enter a name (e.g., "medtech-hospital-sheets")
4. Add description: "Service account for MedTech Hospital data collection"
5. Click "Create and Continue"
6. Grant "Editor" role
7. Click "Done"

### Step 4: Generate Credentials
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

### Step 5: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "MedTech Hospital Submissions"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
5. Share the sheet with the service account email (from the JSON file) with "Editor" access

### Step 6: Update Environment Variables
Replace the placeholder values in `.env.local` with the actual values from your JSON file:

```env
GOOGLE_SHEETS_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
GOOGLE_PROJECT_ID=your-actual-project-id
GOOGLE_PRIVATE_KEY_ID=your-actual-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-actual-client-id
```

## Testing the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Test the landing page**
   - Open `http://localhost:3000`
   - Verify all sections are visible
   - Check responsive design on different screen sizes

3. **Test the ebook download**
   - Click "View Ebook" button
   - Fill out the form with test data
   - Submit the form
   - Check if data appears in Google Sheets (if configured) or in `data/submissions.json`

4. **Test security features**
   - Try right-clicking (should be disabled)
   - Try F12 (should be disabled)
   - Try Ctrl+Shift+I (should be disabled)
   - Try taking a screenshot (should be prevented)

## Troubleshooting

### Google Sheets Not Working
- Check if all environment variables are correctly set
- Verify the service account has access to the sheet
- Check the console for error messages
- Data will be saved locally as fallback

### Form Not Submitting
- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API call status

### Styling Issues
- Clear browser cache
- Restart the development server
- Check if Tailwind CSS is properly configured

## Production Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Ensure environment variables are set
- Build the project: `npm run build`
- Start the production server: `npm start`

## Security Notes

- The application includes multiple layers of screenshot protection
- User data is securely transmitted to Google Sheets
- Local fallback storage is available if Google Sheets fails
- All form inputs are validated and sanitized
