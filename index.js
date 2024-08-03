// scripts.js

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get system details
  const browser = detectBrowser();
  const os = detectOS();
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const currentTime = new Date().getHours();
  
  // Restrict mobile access between 10 AM to 1 PM
  if (isMobile && currentTime >= 10 && currentTime < 13) {
      document.getElementById('error-message').textContent = 'Mobile access is restricted between 10 AM to 1 PM.';
      return;
  }

  // OTP requirement for Google Chrome
  if (browser === 'Chrome') {
      // Show OTP section if not already shown
      const otpSection = document.getElementById('otp-section');
      if (otpSection.style.display === 'none') {
          otpSection.style.display = 'block';
          // Here, you would send the OTP to the user via email/SMS
          document.getElementById('error-message').textContent = 'An OTP has been sent to your registered email.';
          return;
      } else {
          // Verify the OTP
          const otp = document.getElementById('otp').value;
          if (!verifyOTP(otp)) {
              document.getElementById('error-message').textContent = 'Invalid OTP.';
              return;
          }
      }
  }

  // Save login information (example code, actual implementation will depend on your backend)
  saveLoginInfo(browser, os, isMobile);
  window.location.href = '/dashboard'; // Redirect to dashboard after successful login
});

function detectBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Chrome') > -1) {
      return 'Chrome';
  } else if (userAgent.indexOf('Firefox') > -1) {
      return 'Firefox';
  } else if (userAgent.indexOf('Safari') > -1) {
      return 'Safari';
  } else if (userAgent.indexOf('MSIE') > -1 || !!document.documentMode) {
      return 'IE';
  } else if (userAgent.indexOf('Edge') > -1) {
      return 'Edge';
  }
  return 'Unknown';
}

function detectOS() {
  const platform = navigator.platform;
  if (platform.indexOf('Win') > -1) {
      return 'Windows';
  } else if (platform.indexOf('Mac') > -1) {
      return 'MacOS';
  } else if (platform.indexOf('Linux') > -1) {
      return 'Linux';
  } else if (/Android/i.test(navigator.userAgent)) {
      return 'Android';
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return 'iOS';
  }
  return 'Unknown';
}

function verifyOTP(otp) {
  // Dummy function for OTP verification. Replace with actual logic.
  return otp === '123456'; // Replace with real OTP verification logic
}

function saveLoginInfo(browser, os, isMobile) {
  // Example code for saving login info
  const loginInfo = {
      browser,
      os,
      isMobile,
      timestamp: new Date().toISOString()
  };
  console.log('Login Info:', loginInfo);

  // Send login info to the server (example)
  fetch('/save-login-info', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
  });
}