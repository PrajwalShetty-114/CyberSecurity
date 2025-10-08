const mongoose = require('mongoose');
const Simulation = require('../models/Simulation');
require('dotenv').config();

const sampleSimulations = [
  {
    moduleId: 'phishing-spotter',
    title: 'Suspicious Bank Email',
    description: 'A phishing email claiming to be from your bank asking you to verify your account information.',
    type: 'email',
    difficulty: 'beginner',
    content: {
      emailContent: {
        subject: 'URGENT: Verify Your Account Information',
        sender: 'Security Department',
        senderEmail: 'security@bankofamerica.com',
        body: `
Dear Valued Customer,

We have detected unusual activity on your account. To protect your account from unauthorized access, please verify your information by clicking the link below.

VERIFY NOW: http://bank-america-security.verify-now.com/login

If you do not verify your account within 24 hours, your account will be suspended.

Thank you for your immediate attention to this matter.

Bank of America Security Team
        `,
        attachments: [],
        links: [
          {
            url: 'http://bank-america-security.verify-now.com/login',
            displayText: 'VERIFY NOW',
            isMalicious: true,
            explanation: 'This is a suspicious link that doesn\'t match the legitimate Bank of America domain. Real bank emails would use official domains like bankofamerica.com.'
          }
        ]
      }
    },
    isMalicious: true,
    explanation: 'This is a phishing email. Legitimate banks never ask customers to verify account information via email links. The sender email and link domain are suspicious. Always contact your bank directly if you receive such emails.',
    points: 15,
    tags: ['phishing', 'banking', 'urgent', 'verification']
  },
  {
    moduleId: 'phishing-spotter',
    title: 'Legitimate Package Delivery Notification',
    description: 'A genuine email from a shipping company about package delivery.',
    type: 'email',
    difficulty: 'beginner',
    content: {
      emailContent: {
        subject: 'Your package has been delivered',
        sender: 'UPS',
        senderEmail: 'noreply@ups.com',
        body: `
Hello,

Your package (Tracking #: 1Z999AA1234567890) has been delivered to your address on January 15, 2024 at 2:30 PM.

If you have any questions about this delivery, please contact us at 1-800-PICK-UPS or visit ups.com.

Thank you for choosing UPS.

UPS Customer Service
        `,
        attachments: [],
        links: [
          {
            url: 'https://www.ups.com/track?tracknum=1Z999AA1234567890',
            displayText: 'Track your package',
            isMalicious: false,
            explanation: 'This is a legitimate UPS tracking link that uses the official ups.com domain.'
          }
        ]
      }
    },
    isMalicious: false,
    explanation: 'This is a legitimate email from UPS. It uses the official ups.com domain, provides a valid tracking number, and doesn\'t ask for personal information or urgent action.',
    points: 10,
    tags: ['legitimate', 'shipping', 'delivery', 'ups']
  },
  {
    moduleId: 'scam-recognizer',
    title: 'Tech Support Scam Call',
    description: 'A phone call from someone claiming to be from Microsoft tech support.',
    type: 'phone',
    difficulty: 'beginner',
    content: {
      phoneContent: {
        callerId: 'Microsoft Support',
        script: 'Hello, this is Microsoft Technical Support. We have detected a virus on your computer that is sending out spam emails. We need to access your computer remotely to fix this issue. Can you please go to our website and download our remote access software?',
        audioUrl: null,
        correctResponses: [
          'I\'m not interested. Goodbye.',
          'Microsoft doesn\'t call customers unsolicited.',
          'I\'ll contact Microsoft directly if I need support.'
        ],
        wrongResponses: [
          'Sure, what website should I go to?',
          'Yes, I can help you fix this.',
          'What software do I need to download?'
        ]
      }
    },
    isMalicious: true,
    explanation: 'This is a tech support scam. Microsoft never calls customers unsolicited about computer problems. Legitimate tech support companies don\'t ask you to download software or give remote access to your computer.',
    points: 15,
    tags: ['vishing', 'tech-support', 'microsoft', 'remote-access']
  },
  {
    moduleId: 'mfa-setup',
    title: 'Setting up Google Authenticator',
    description: 'Step-by-step guide to set up Google Authenticator for your Google account.',
    type: 'mfa-setup',
    difficulty: 'beginner',
    content: {
      mfaContent: {
        platform: 'Google',
        steps: [
          {
            stepNumber: 1,
            title: 'Access Google Account Settings',
            description: 'Go to your Google Account settings and navigate to Security.',
            action: 'Click on Security in the left sidebar',
            expectedResult: 'You should see the Security settings page with various security options.'
          },
          {
            stepNumber: 2,
            title: 'Enable 2-Step Verification',
            description: 'Find and click on "2-Step Verification" in the Security section.',
            action: 'Click on "2-Step Verification"',
            expectedResult: 'You\'ll be taken to the 2-Step Verification setup page.'
          },
          {
            stepNumber: 3,
            title: 'Choose Authenticator App',
            description: 'Select "Authenticator app" as your second verification step.',
            action: 'Click on "Authenticator app"',
            expectedResult: 'You\'ll see options for different authenticator apps.'
          },
          {
            stepNumber: 4,
            title: 'Scan QR Code',
            description: 'Open Google Authenticator on your phone and scan the QR code displayed on your computer.',
            action: 'Scan the QR code with your phone',
            expectedResult: 'Google Authenticator will add your Google account and display a 6-digit code.'
          },
          {
            stepNumber: 5,
            title: 'Verify Setup',
            description: 'Enter the 6-digit code from Google Authenticator to verify the setup.',
            action: 'Enter the 6-digit code',
            expectedResult: 'You\'ll see a confirmation that 2-Step Verification is now enabled.'
          }
        ]
      }
    },
    isMalicious: false,
    explanation: 'This is the correct process for setting up Google Authenticator. Always use official Google account settings and never share your authenticator codes with anyone.',
    points: 20,
    tags: ['mfa', 'google', 'authenticator', '2fa', 'setup']
  },
  {
    moduleId: 'phishing-spotter',
    title: 'Fake Netflix Account Suspension',
    description: 'A phishing email claiming your Netflix account will be suspended.',
    type: 'email',
    difficulty: 'intermediate',
    content: {
      emailContent: {
        subject: 'Account Suspension Notice - Action Required',
        sender: 'Netflix Support',
        senderEmail: 'support@netflix-security.com',
        body: `
Dear Netflix Member,

We have detected unusual activity on your account. Your subscription will be suspended within 24 hours unless you verify your payment information.

To avoid service interruption, please update your payment details immediately:

UPDATE PAYMENT: https://netflix-account-verify.com/payment

If you do not update your payment information, your account will be permanently suspended.

Netflix Customer Support
        `,
        attachments: [],
        links: [
          {
            url: 'https://netflix-account-verify.com/payment',
            displayText: 'UPDATE PAYMENT',
            isMalicious: true,
            explanation: 'This is a fake Netflix domain. Legitimate Netflix emails would use netflix.com domain, not netflix-account-verify.com.'
          }
        ]
      }
    },
    isMalicious: true,
    explanation: 'This is a phishing email. Netflix uses netflix.com domains for official communications. The urgent tone and request for payment information are red flags. Always log into Netflix directly through their official website.',
    points: 20,
    tags: ['phishing', 'netflix', 'payment', 'suspension', 'urgent']
  },
  {
    moduleId: 'scam-recognizer',
    title: 'SMS Phishing - Fake Bank Alert',
    description: 'A suspicious text message claiming to be from your bank.',
    type: 'sms',
    difficulty: 'beginner',
    content: {
      phoneContent: {
        callerId: 'Chase Bank',
        script: 'URGENT: Your Chase account has been locked due to suspicious activity. Click here to unlock: bit.ly/chase-unlock-now',
        audioUrl: null,
        correctResponses: [
          'I\'ll contact Chase directly through their official website.',
          'This looks suspicious, I\'m not clicking the link.',
          'I\'ll call Chase customer service to verify this.'
        ],
        wrongResponses: [
          'I\'ll click the link to unlock my account.',
          'What suspicious activity was detected?',
          'How do I unlock my account?'
        ]
      }
    },
    isMalicious: true,
    explanation: 'This is a smishing (SMS phishing) attack. Banks don\'t send account unlock links via text message. The bit.ly link is suspicious and could lead to a fake website designed to steal your login credentials.',
    points: 15,
    tags: ['smishing', 'banking', 'sms', 'chase', 'urgent']
  }
];

async function seedSimulations() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-shield-academy');
    console.log('Connected to MongoDB');

    // Clear existing simulations
    await Simulation.deleteMany({});
    console.log('Cleared existing simulations');

    // Insert sample simulations
    const insertedSimulations = await Simulation.insertMany(sampleSimulations);
    console.log(`Successfully inserted ${insertedSimulations.length} simulations`);

    // Display summary
    console.log('\nSimulations created:');
    insertedSimulations.forEach(sim => {
      console.log(`- ${sim.title} (${sim.moduleId}, ${sim.difficulty})`);
    });

  } catch (error) {
    console.error('Error seeding simulations:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedSimulations();
