# Screenshot Protection System

This document outlines the comprehensive screenshot protection system implemented for the MedTech Hospital e-book website.

## 🛡️ Protection Features

### 1. CSS-Based Protection
- **User Selection Disabled**: Prevents text selection and copying
- **Drag & Drop Disabled**: Prevents dragging of images and content
- **Context Menu Disabled**: Removes right-click functionality
- **Print Protection**: Hides content when printing
- **Screenshot Tool Detection**: CSS rules to detect common screenshot tools

### 2. JavaScript-Based Protection
- **DevTools Detection**: Monitors for developer tools opening
- **Keyboard Shortcut Blocking**: Prevents F12, Ctrl+Shift+I, Ctrl+S, etc.
- **Screenshot Tool Detection**: Monitors for common screenshot applications
- **Visibility API Monitoring**: Detects when page becomes hidden (potential screenshot)
- **Console Protection**: Monitors and blocks console usage

### 3. Advanced Security Features
- **Watermark Overlay**: Dynamic watermark text across the content
- **Content Obfuscation**: Periodic blurring of content to prevent screenshots
- **Tamper Detection**: Advanced detection of debugging and inspection tools
- **Multi-layer Protection**: Multiple security layers working together

## 🔧 Implementation

### Components Used

1. **ScreenshotProtection.tsx**
   - Main protection wrapper component
   - Configurable security options
   - DevTools detection and blocking

2. **ContentObfuscator.tsx**
   - Dynamic content obfuscation
   - Periodic blurring effects
   - Mouse movement detection

3. **AdvancedSecurity.tsx**
   - Advanced tamper detection
   - Screenshot tool detection
   - Security violation alerts

4. **Security Configuration**
   - Centralized security settings
   - Customizable protection levels
   - Security messages and alerts

### CSS Classes Applied

```css
.screenshot-protected
.protected-content
.no-capture
.ebook-content
.security-protected
.watermark-overlay
```

## 🚀 Usage

### Basic Implementation
```tsx
import ScreenshotProtection from './components/ScreenshotProtection'

<ScreenshotProtection
  enableWatermark={true}
  enableDevToolsDetection={true}
  enableKeyboardProtection={true}
  enableContextMenuProtection={true}
>
  <YourContent />
</ScreenshotProtection>
```

### Advanced Implementation
```tsx
import AdvancedSecurity from './components/AdvancedSecurity'
import ScreenshotProtection from './components/ScreenshotProtection'
import ContentObfuscator from './components/ContentObfuscator'

<AdvancedSecurity>
  <ScreenshotProtection
    enableWatermark={true}
    enableDevToolsDetection={true}
    enableKeyboardProtection={true}
    enableContextMenuProtection={true}
  >
    <ContentObfuscator
      enableDynamicObfuscation={true}
      obfuscationInterval={5000}
    >
      <YourProtectedContent />
    </ContentObfuscator>
  </ScreenshotProtection>
</AdvancedSecurity>
```

## ⚙️ Configuration Options

### ScreenshotProtection Props
- `enableWatermark`: Enable/disable watermark overlay
- `enableDevToolsDetection`: Enable/disable developer tools detection
- `enableKeyboardProtection`: Enable/disable keyboard shortcut blocking
- `enableContextMenuProtection`: Enable/disable right-click protection

### ContentObfuscator Props
- `enableDynamicObfuscation`: Enable/disable dynamic content obfuscation
- `obfuscationInterval`: Interval for content obfuscation (milliseconds)

### Security Levels
- **Low**: Basic protection with minimal interference
- **Medium**: Moderate protection with some content obfuscation
- **High**: Maximum protection with aggressive content protection

## 🛠️ Blocked Actions

### Keyboard Shortcuts
- F12 (Developer Tools)
- PrintScreen
- Ctrl+Shift+I (Inspect Element)
- Ctrl+Shift+J (Console)
- Ctrl+U (View Source)
- Ctrl+S (Save)
- Ctrl+A (Select All)
- Ctrl+C (Copy)
- Ctrl+V (Paste)
- Ctrl+P (Print)

### Mouse Actions
- Right-click context menu
- Text selection
- Drag and drop
- Image dragging

### Browser Features
- Developer tools
- Print functionality
- View source
- Console access

## 🔍 Detection Methods

### DevTools Detection
- Window size monitoring
- Console usage detection
- Debugger statement monitoring
- Performance timing checks

### Screenshot Tool Detection
- User agent string monitoring
- Window name detection
- Process monitoring (limited)
- Visibility change detection

### Tamper Detection
- DOM manipulation monitoring
- Script injection detection
- Console access monitoring
- Debugging tool detection

## ⚠️ Security Limitations

### What This System CAN Protect Against
- Basic screenshot tools
- Right-click context menu
- Text selection and copying
- Print screen functionality
- Developer tools (basic detection)
- Simple screenshot applications

### What This System CANNOT Protect Against
- Advanced screenshot tools with system-level access
- Browser extensions with high permissions
- Screen recording software
- Physical camera screenshots
- Advanced debugging tools
- Browser developer mode bypasses

## 🎯 Best Practices

1. **Layered Security**: Use multiple protection layers together
2. **Regular Updates**: Keep security measures updated
3. **User Education**: Inform users about protection measures
4. **Server-Side Protection**: Combine with server-side security
5. **Content Encryption**: Consider encrypting sensitive content
6. **Access Control**: Implement proper authentication and authorization

## 📱 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## 🔧 Customization

### Watermark Text
```typescript
const watermarkText = "CONFIDENTIAL - DO NOT SCREENSHOT"
```

### Security Messages
```typescript
const securityMessages = {
  devToolsDetected: '⚠️ Developer Tools Detected!',
  screenshotBlocked: '⚠️ Screenshot protection is active.',
  // ... more messages
}
```

### Protection Levels
```typescript
const securityLevel = 'high' // 'low' | 'medium' | 'high'
```

## 🚨 Important Notes

1. **No 100% Protection**: This system provides strong protection but cannot guarantee 100% security
2. **User Experience**: Some protection measures may affect user experience
3. **Browser Limitations**: Protection effectiveness varies by browser
4. **Regular Testing**: Test protection measures regularly
5. **Legal Considerations**: Ensure compliance with local laws and regulations

## 🔄 Maintenance

- Monitor security logs
- Update protection measures regularly
- Test with new browser versions
- Review and update blocked tools list
- Monitor for new screenshot tools
- Update security messages as needed

## 📞 Support

For issues or questions regarding the screenshot protection system, please contact the development team or refer to the security documentation.
