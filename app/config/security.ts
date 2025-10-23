export interface SecurityConfig {
  enableScreenshotProtection: boolean
  enableDevToolsDetection: boolean
  enableKeyboardProtection: boolean
  enableContextMenuProtection: boolean
  enableWatermark: boolean
  enableContentObfuscation: boolean
  enableAdvancedSecurity: boolean
  watermarkText: string
  obfuscationInterval: number
  securityLevel: 'low' | 'medium' | 'high'
}

export const defaultSecurityConfig: SecurityConfig = {
  enableScreenshotProtection: true,
  enableDevToolsDetection: true,
  enableKeyboardProtection: true,
  enableContextMenuProtection: true,
  enableWatermark: true,
  enableContentObfuscation: true,
  enableAdvancedSecurity: true,
  watermarkText: 'CONFIDENTIAL - DO NOT SCREENSHOT',
  obfuscationInterval: 5000,
  securityLevel: 'high'
}

export const securityMessages = {
  devToolsDetected: '⚠️ Developer Tools Detected! Please close developer tools to continue.',
  screenshotBlocked: '⚠️ Screenshot protection is active. This action is not allowed.',
  contextMenuBlocked: '⚠️ Right-click is disabled for security reasons.',
  printBlocked: '⚠️ Printing is disabled for security reasons.',
  securityViolation: '🚫 Security Violation Detected. Please close any screenshot tools or developer tools.',
  contentProtected: 'This content is protected by advanced security measures.'
}

export const blockedKeys = [
  'F12',
  'PrintScreen',
  'F11'
]

export const blockedKeyCombinations = [
  { ctrl: true, shift: true, key: 'I' },
  { ctrl: true, shift: true, key: 'J' },
  { ctrl: true, key: 'u' },
  { ctrl: true, key: 's' },
  { ctrl: true, key: 'a' },
  { ctrl: true, key: 'c' },
  { ctrl: true, key: 'v' },
  { ctrl: true, key: 'p' },
  { ctrl: true, key: 'PrintScreen' }
]

export const suspiciousUserAgents = [
  'SnippingTool',
  'Snagit',
  'Lightshot',
  'Greenshot',
  'ShareX',
  'PicPick',
  'Screenshot',
  'Capture'
]

export const securityCSS = `
  .security-protected {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  .security-protected * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  .security-protected img {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }

  @media print {
    .security-protected {
      display: none !important;
    }
  }
`
