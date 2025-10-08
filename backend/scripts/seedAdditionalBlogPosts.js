const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');
require('dotenv').config();

const additionalBlogPosts = [
  {
    title: "Mobile Security: Protecting Your Smartphone from Cyber Threats",
    slug: "mobile-security-protecting-smartphone-cyber-threats",
    excerpt: "Your smartphone contains more personal data than your computer. Learn how to protect it from malware, phishing, and other mobile-specific threats.",
    content: `
# Mobile Security: Protecting Your Smartphone from Cyber Threats

Smartphones have become an integral part of our daily lives, storing sensitive personal and professional information. However, many users underestimate the security risks associated with mobile devices.

## The Mobile Threat Landscape

### Common Mobile Threats
- **Malicious Apps**: Apps that steal data or perform unwanted actions
- **Phishing Attacks**: SMS and email-based social engineering
- **Network Attacks**: Man-in-the-middle attacks on public Wi-Fi
- **Device Theft**: Physical access to unlocked devices
- **App Store Fraud**: Fake apps that mimic legitimate ones

### Why Mobile Devices Are Vulnerable
- Always connected to the internet
- Frequent app downloads and updates
- Use of public Wi-Fi networks
- Physical portability increases theft risk
- Users often ignore security updates

## Essential Mobile Security Practices

### 1. Keep Your Device Updated
- Enable automatic updates for the operating system
- Update apps regularly from official app stores
- Install security patches as soon as they're available
- Use supported devices that receive regular updates

### 2. Use Strong Authentication
- Enable biometric authentication (fingerprint, face recognition)
- Use strong PINs or passwords (at least 6 digits)
- Enable two-factor authentication for important accounts
- Consider using a password manager for mobile

### 3. Be Cautious with Apps
- Only download apps from official app stores
- Read app permissions carefully before installing
- Check app reviews and developer information
- Uninstall apps you no longer use
- Be wary of apps requesting excessive permissions

### 4. Secure Your Network Connections
- Avoid public Wi-Fi for sensitive activities
- Use a VPN when connecting to public networks
- Disable automatic Wi-Fi connections
- Use cellular data for sensitive transactions when possible

### 5. Protect Your Data
- Enable device encryption
- Use cloud backup with strong authentication
- Enable remote wipe capabilities
- Regularly backup important data
- Use secure messaging apps for sensitive communications

## Advanced Mobile Security Measures

### Enterprise Mobile Security
- **Mobile Device Management (MDM)**: Centralized control of corporate devices
- **Mobile Application Management (MAM)**: Secure app distribution and management
- **Containerization**: Isolating corporate data from personal data
- **Certificate Management**: Managing digital certificates for secure communications

### Personal Mobile Security
- **Antivirus Apps**: Real-time protection against malware
- **Privacy Settings**: Controlling app permissions and data sharing
- **Secure Browsing**: Using privacy-focused browsers
- **Regular Audits**: Reviewing installed apps and permissions

## Mobile-Specific Attack Vectors

### 1. SMS Phishing (Smishing)
- **How it works**: Malicious text messages with links or requests
- **Common tactics**: Fake bank alerts, package delivery notifications
- **Defense**: Never click links in unsolicited messages

### 2. Malicious Apps
- **How it works**: Apps that appear legitimate but contain malware
- **Common tactics**: Fake security apps, games with hidden functionality
- **Defense**: Verify app authenticity, check developer information

### 3. Network Attacks
- **How it works**: Intercepting data on unsecured networks
- **Common tactics**: Fake Wi-Fi hotspots, man-in-the-middle attacks
- **Defense**: Use VPN, avoid public Wi-Fi for sensitive activities

### 4. Physical Access
- **How it works**: Unauthorized access to unlocked devices
- **Common tactics**: Device theft, shoulder surfing
- **Defense**: Strong authentication, automatic lock, remote wipe

## Mobile Security Tools and Apps

### Antivirus and Security Apps
- **Lookout**: Comprehensive mobile security suite
- **Norton Mobile Security**: Antivirus with additional features
- **Avast Mobile Security**: Free antivirus with premium options
- **Bitdefender Mobile Security**: Lightweight security solution

### VPN Services
- **ExpressVPN**: Fast and reliable VPN service
- **NordVPN**: Strong privacy features
- **ProtonVPN**: Privacy-focused with free tier
- **Surfshark**: Unlimited device connections

### Password Managers
- **1Password**: User-friendly with strong security
- **LastPass**: Comprehensive free and paid options
- **Bitwarden**: Open-source with excellent security
- **Dashlane**: Premium features with VPN included

## Best Practices for Different User Types

### Individual Users
- Enable all available security features
- Use strong, unique passwords
- Be cautious with app downloads
- Regular security updates
- Backup important data

### Business Users
- Follow company security policies
- Use approved apps and services
- Report security incidents immediately
- Participate in security training
- Use corporate security tools

### Parents and Families
- Set up parental controls
- Monitor children's app usage
- Educate family members about mobile security
- Use family sharing features responsibly
- Regular security discussions

## Future of Mobile Security

### Emerging Threats
- **5G Security**: New network vulnerabilities
- **IoT Integration**: Connected device security
- **AI-Powered Attacks**: Sophisticated automated threats
- **Biometric Spoofing**: Advanced impersonation techniques

### Emerging Defenses
- **Zero Trust Architecture**: Never trust, always verify
- **AI-Powered Detection**: Machine learning for threat detection
- **Hardware Security**: Secure enclaves and trusted execution
- **Behavioral Analytics**: Anomaly detection based on user behavior

## Conclusion

Mobile security requires a multi-layered approach combining technology, user education, and best practices. By implementing the security measures outlined in this guide, you can significantly reduce your risk of falling victim to mobile cyber threats.

Remember: Your smartphone is a powerful computer that fits in your pocket. Treat it with the same security awareness you would give to your desktop computer.

## Key Takeaways

1. **Keep Everything Updated**: OS, apps, and security patches
2. **Use Strong Authentication**: Biometrics, PINs, and 2FA
3. **Be App-Smart**: Only download from official stores
4. **Secure Your Network**: Use VPN on public Wi-Fi
5. **Protect Your Data**: Encryption, backup, and remote wipe
6. **Stay Informed**: Keep up with mobile security trends
7. **Think Before You Click**: Be cautious with links and downloads
    `,
    author: {
      name: "David Park",
      email: "david.park@digitalshieldacademy.com",
      bio: "Mobile security specialist with expertise in iOS and Android security, app development, and mobile threat analysis."
    },
    category: "cybersecurity",
    tags: ["mobile-security", "smartphone", "malware", "phishing", "apps"],
    featuredImage: "/images/blog/mobile-security-guide.jpg",
    status: "published",
    publishedAt: new Date("2023-12-15"),
    readTime: 7,
    views: 1900,
    likes: 142,
    seo: {
      metaTitle: "Mobile Security Guide: Protect Your Smartphone | Digital Shield Academy",
      metaDescription: "Complete guide to mobile security. Learn how to protect your smartphone from malware, phishing, and other cyber threats.",
      keywords: ["mobile security", "smartphone security", "mobile malware", "app security", "mobile phishing"]
    }
  },
  {
    title: "Email Security: Beyond Spam Filters",
    slug: "email-security-beyond-spam-filters",
    excerpt: "Email remains the primary attack vector for cybercriminals. Learn advanced email security techniques to protect yourself and your organization.",
    content: `
# Email Security: Beyond Spam Filters

Email is the most common attack vector for cybercriminals, with over 90% of cyber attacks starting with a malicious email. While spam filters are essential, they're not enough to protect against sophisticated email-based attacks.

## The Email Threat Landscape

### Types of Email Attacks
- **Phishing**: Fraudulent emails designed to steal credentials
- **Spear Phishing**: Targeted attacks against specific individuals
- **Whaling**: Attacks targeting high-level executives
- **Business Email Compromise (BEC)**: Impersonating legitimate business communications
- **Malware Distribution**: Emails containing malicious attachments or links
- **Ransomware**: Malicious emails that encrypt files and demand payment

### Why Email Attacks Are Effective
- **High Volume**: Billions of emails sent daily
- **Trust Factor**: People trust email communications
- **Social Engineering**: Exploits human psychology
- **Low Cost**: Minimal investment for attackers
- **High Success Rate**: Many users fall victim to email attacks

## Advanced Email Security Measures

### 1. Email Authentication Protocols

#### SPF (Sender Policy Framework)
- **Purpose**: Prevents email spoofing by verifying sender IP addresses
- **Implementation**: DNS TXT records specifying authorized sending servers
- **Benefits**: Reduces spoofed emails and improves deliverability

#### DKIM (DomainKeys Identified Mail)
- **Purpose**: Cryptographically signs emails to verify authenticity
- **Implementation**: Public/private key pairs for email signing
- **Benefits**: Ensures email integrity and authenticity

#### DMARC (Domain-based Message Authentication)
- **Purpose**: Policy framework for email authentication
- **Implementation**: DNS records specifying how to handle failed authentication
- **Benefits**: Prevents domain spoofing and improves email security

### 2. Advanced Threat Protection

#### Sandboxing
- **How it works**: Executes suspicious attachments in isolated environments
- **Benefits**: Detects zero-day malware and advanced threats
- **Implementation**: Cloud-based or on-premises sandboxing solutions

#### URL Protection
- **How it works**: Scans and rewrites URLs in emails
- **Benefits**: Prevents access to malicious websites
- **Implementation**: Real-time URL analysis and blocking

#### Attachment Scanning
- **How it works**: Deep scanning of email attachments
- **Benefits**: Detects malware in various file formats
- **Implementation**: Multi-engine antivirus scanning

### 3. User Education and Training

#### Phishing Simulation
- **Purpose**: Test user awareness and response to phishing attempts
- **Benefits**: Identifies vulnerable users and improves training
- **Implementation**: Regular simulated phishing campaigns

#### Security Awareness Training
- **Purpose**: Educate users about email security threats
- **Benefits**: Reduces human error and improves security posture
- **Implementation**: Regular training sessions and materials

## Email Security Best Practices

### For Individuals

#### Email Hygiene
- **Verify Senders**: Always verify the sender's identity
- **Check URLs**: Hover over links before clicking
- **Be Skeptical**: Question unexpected or urgent requests
- **Report Suspicious Emails**: Forward to IT or security team
- **Use Strong Passwords**: Unique passwords for email accounts

#### Account Security
- **Enable 2FA**: Two-factor authentication for email accounts
- **Regular Password Changes**: Update passwords periodically
- **Monitor Account Activity**: Check for unauthorized access
- **Secure Recovery Options**: Use secure backup email addresses

### For Organizations

#### Technical Controls
- **Email Gateway Security**: Deploy advanced email security solutions
- **Endpoint Protection**: Secure email clients and devices
- **Network Security**: Protect email infrastructure
- **Backup and Recovery**: Regular email backups

#### Policy and Procedures
- **Email Security Policy**: Clear guidelines for email usage
- **Incident Response**: Procedures for email security incidents
- **User Training**: Regular security awareness programs
- **Vendor Management**: Secure third-party email services

## Email Security Tools and Solutions

### Enterprise Solutions
- **Microsoft Defender for Office 365**: Comprehensive email security
- **Proofpoint**: Advanced threat protection and compliance
- **Mimecast**: Email security and continuity
- **Cisco Email Security**: Cloud-based email protection
- **Barracuda**: Email security and backup solutions

### Personal Solutions
- **Gmail Security**: Built-in Google security features
- **Outlook Security**: Microsoft's email protection
- **ProtonMail**: Privacy-focused email service
- **Tutanota**: Encrypted email communication
- **Fastmail**: Privacy-respecting email provider

## Common Email Security Mistakes

### 1. Relying Only on Spam Filters
- **Problem**: Spam filters miss sophisticated attacks
- **Solution**: Implement multiple layers of security

### 2. Ignoring Email Authentication
- **Problem**: No verification of email authenticity
- **Solution**: Implement SPF, DKIM, and DMARC

### 3. Poor User Training
- **Problem**: Users don't recognize email threats
- **Solution**: Regular security awareness training

### 4. Weak Password Policies
- **Problem**: Easy-to-guess email passwords
- **Solution**: Strong password requirements and 2FA

### 5. No Incident Response Plan
- **Problem**: Unprepared for email security incidents
- **Solution**: Develop and test incident response procedures

## Email Security for Different Industries

### Healthcare
- **HIPAA Compliance**: Protect patient information
- **Secure Communication**: Encrypted email for sensitive data
- **Access Controls**: Role-based email access
- **Audit Logging**: Track email access and modifications

### Financial Services
- **Regulatory Compliance**: Meet financial regulations
- **Customer Data Protection**: Secure customer communications
- **Fraud Prevention**: Detect and prevent financial fraud
- **Transaction Security**: Secure financial transaction emails

### Education
- **Student Privacy**: Protect student information
- **Parent Communication**: Secure parent-teacher communications
- **Administrative Security**: Protect administrative data
- **Research Data**: Secure academic research communications

## Future of Email Security

### Emerging Threats
- **AI-Generated Phishing**: More convincing fake emails
- **Deepfake Audio**: Voice-based email attacks
- **Quantum Computing**: Potential encryption vulnerabilities
- **IoT Email Attacks**: Connected device vulnerabilities

### Emerging Defenses
- **AI-Powered Detection**: Machine learning for threat detection
- **Behavioral Analytics**: User behavior analysis
- **Zero Trust Email**: Never trust, always verify approach
- **Quantum-Safe Encryption**: Post-quantum cryptography

## Implementation Checklist

### For Individuals
- [ ] Enable 2FA on email accounts
- [ ] Use strong, unique passwords
- [ ] Be cautious with email attachments
- [ ] Verify sender identities
- [ ] Report suspicious emails
- [ ] Keep email clients updated
- [ ] Use secure email providers

### For Organizations
- [ ] Implement email authentication (SPF, DKIM, DMARC)
- [ ] Deploy advanced threat protection
- [ ] Conduct regular security training
- [ ] Monitor email security metrics
- [ ] Develop incident response procedures
- [ ] Regular security assessments
- [ ] Vendor security evaluation

## Conclusion

Email security requires a comprehensive approach that goes beyond basic spam filtering. By implementing advanced authentication protocols, threat protection, user education, and security policies, organizations and individuals can significantly reduce their risk of email-based attacks.

Remember: Email security is not just a technology problem—it's a people problem. The most sophisticated security tools are only as effective as the users who interact with them.

## Key Takeaways

1. **Implement Email Authentication**: Use SPF, DKIM, and DMARC
2. **Deploy Advanced Protection**: Beyond basic spam filtering
3. **Educate Users**: Regular security awareness training
4. **Monitor and Respond**: Track threats and respond quickly
5. **Stay Updated**: Keep security tools and policies current
6. **Think Holistically**: Combine technology, processes, and people
7. **Plan for the Future**: Prepare for emerging email threats
    `,
    author: {
      name: "Jennifer Liu",
      email: "jennifer.liu@digitalshieldacademy.com",
      bio: "Email security expert with 10+ years of experience in enterprise email protection and threat intelligence."
    },
    category: "cybersecurity",
    tags: ["email-security", "phishing", "spam", "authentication", "threat-protection"],
    featuredImage: "/images/blog/email-security-advanced.jpg",
    status: "published",
    publishedAt: new Date("2023-12-10"),
    readTime: 11,
    views: 2200,
    likes: 167,
    seo: {
      metaTitle: "Advanced Email Security: Beyond Spam Filters | Digital Shield Academy",
      metaDescription: "Learn advanced email security techniques including authentication protocols, threat protection, and best practices for email safety.",
      keywords: ["email security", "phishing protection", "email authentication", "threat protection", "cybersecurity"]
    }
  },
  {
    title: "Cybersecurity for Small Businesses: A Practical Guide",
    slug: "cybersecurity-small-businesses-practical-guide",
    excerpt: "Small businesses are increasingly targeted by cybercriminals. Learn practical, cost-effective security measures to protect your business without breaking the bank.",
    content: `
# Cybersecurity for Small Businesses: A Practical Guide

Small businesses are increasingly becoming targets for cybercriminals, with 43% of cyber attacks targeting small businesses. However, many small business owners believe they're too small to be targeted or that cybersecurity is too expensive. This guide provides practical, cost-effective solutions.

## Why Small Businesses Are Targeted

### Attractive Targets
- **Limited Security Resources**: Often lack dedicated IT security staff
- **Valuable Data**: Customer information, financial records, intellectual property
- **Weak Security Posture**: Less sophisticated security measures
- **Supply Chain Access**: Gateway to larger business partners
- **Lower Risk**: Less likely to have robust incident response capabilities

### Common Attack Vectors
- **Phishing Emails**: Social engineering attacks via email
- **Ransomware**: Encrypting business data for ransom
- **Business Email Compromise**: Impersonating legitimate business communications
- **Malware**: Malicious software that steals or damages data
- **Insider Threats**: Disgruntled employees or contractors

## Cost-Effective Security Measures

### 1. Employee Education and Training

#### Security Awareness Training
- **Cost**: Free to low-cost online resources
- **Implementation**: Regular training sessions and materials
- **Benefits**: Reduces human error, the leading cause of security incidents
- **Resources**: 
  - Free online courses
  - Security awareness videos
  - Phishing simulation tools

#### Phishing Simulation
- **Cost**: $50-200 per month for small businesses
- **Implementation**: Regular simulated phishing campaigns
- **Benefits**: Identifies vulnerable employees and improves awareness
- **Tools**: KnowBe4, Proofpoint, Gophish (free)

### 2. Basic Security Controls

#### Multi-Factor Authentication (MFA)
- **Cost**: Free for most services
- **Implementation**: Enable on all business accounts
- **Benefits**: Prevents 99.9% of automated attacks
- **Services**: Google Workspace, Microsoft 365, banking, social media

#### Strong Password Policies
- **Cost**: Free
- **Implementation**: Require complex passwords and regular changes
- **Benefits**: Reduces credential-based attacks
- **Tools**: Built-in password policies, password managers

#### Regular Software Updates
- **Cost**: Free
- **Implementation**: Enable automatic updates
- **Benefits**: Patches known vulnerabilities
- **Coverage**: Operating systems, applications, firmware

### 3. Data Protection

#### Regular Backups
- **Cost**: $50-200 per month for cloud backup
- **Implementation**: Automated daily backups with offsite storage
- **Benefits**: Quick recovery from ransomware and data loss
- **Services**: Backblaze, Carbonite, Acronis

#### Data Encryption
- **Cost**: Free to $100 per device
- **Implementation**: Encrypt sensitive data at rest and in transit
- **Benefits**: Protects data even if devices are stolen
- **Tools**: BitLocker (Windows), FileVault (Mac), VeraCrypt (free)

#### Access Controls
- **Cost**: Free
- **Implementation**: Principle of least privilege
- **Benefits**: Limits damage from compromised accounts
- **Methods**: User accounts, file permissions, network access

## Budget-Friendly Security Tools

### Free and Low-Cost Solutions

#### Antivirus Software
- **Free Options**: Windows Defender, Avast Free, AVG Free
- **Paid Options**: $30-100 per year per device
- **Features**: Real-time protection, malware scanning, web protection

#### Firewall
- **Free Options**: Windows Firewall, pfSense (open source)
- **Paid Options**: $100-500 for business firewalls
- **Features**: Network traffic filtering, intrusion detection

#### VPN Services
- **Free Options**: ProtonVPN, Windscribe (limited)
- **Paid Options**: $50-200 per year
- **Features**: Secure remote access, encrypted communications

#### Password Managers
- **Free Options**: Bitwarden, LastPass (limited)
- **Paid Options**: $30-60 per year
- **Features**: Secure password storage, sharing, generation

### Cloud-Based Security Services

#### Email Security
- **Google Workspace**: $6-18 per user per month
- **Microsoft 365**: $5-22 per user per month
- **Features**: Built-in security, spam filtering, threat protection

#### Endpoint Protection
- **CrowdStrike Falcon**: $8-15 per endpoint per month
- **SentinelOne**: $5-10 per endpoint per month
- **Features**: Advanced threat detection, response capabilities

## Implementation Roadmap

### Phase 1: Foundation (Month 1)
- [ ] Conduct security assessment
- [ ] Implement MFA on all accounts
- [ ] Set up regular backups
- [ ] Install and configure antivirus
- [ ] Create security policies

### Phase 2: Protection (Month 2-3)
- [ ] Deploy email security
- [ ] Implement network security
- [ ] Set up monitoring and logging
- [ ] Conduct employee training
- [ ] Test incident response procedures

### Phase 3: Enhancement (Month 4-6)
- [ ] Advanced threat protection
- [ ] Security awareness program
- [ ] Regular security assessments
- [ ] Vendor security evaluation
- [ ] Compliance preparation

## Industry-Specific Considerations

### Healthcare
- **HIPAA Compliance**: Patient data protection requirements
- **Cost**: $5,000-15,000 for compliance implementation
- **Focus**: Data encryption, access controls, audit logging

### Financial Services
- **Regulatory Requirements**: PCI DSS, SOX compliance
- **Cost**: $10,000-25,000 for compliance implementation
- **Focus**: Transaction security, customer data protection

### Retail
- **PCI DSS**: Payment card data protection
- **Cost**: $3,000-10,000 for compliance implementation
- **Focus**: Point-of-sale security, customer data protection

### Professional Services
- **Client Confidentiality**: Attorney-client privilege, client data
- **Cost**: $2,000-8,000 for security implementation
- **Focus**: Document security, communication protection

## Common Mistakes to Avoid

### 1. Underestimating Threats
- **Problem**: Thinking "we're too small to be targeted"
- **Solution**: Understand that small businesses are prime targets

### 2. Focusing Only on Technology
- **Problem**: Ignoring human factors and processes
- **Solution**: Balance technology, training, and policies

### 3. One-Time Implementation
- **Problem**: Setting up security once and forgetting about it
- **Solution**: Regular reviews, updates, and improvements

### 4. Ignoring Employee Training
- **Problem**: Assuming employees know how to stay secure
- **Solution**: Regular security awareness training

### 5. No Incident Response Plan
- **Problem**: Unprepared for security incidents
- **Solution**: Develop and test incident response procedures

## Measuring Security ROI

### Key Metrics
- **Reduced Incidents**: Fewer security breaches and incidents
- **Faster Recovery**: Quicker response to security issues
- **Compliance**: Meeting regulatory requirements
- **Customer Trust**: Improved reputation and customer confidence
- **Insurance Savings**: Lower cyber insurance premiums

### Cost-Benefit Analysis
- **Security Investment**: $5,000-15,000 annually for small business
- **Potential Loss**: $50,000-200,000 per security incident
- **ROI**: 300-1000% return on security investment

## Getting Started: Quick Wins

### Week 1: Immediate Actions
1. Enable MFA on all business accounts
2. Install antivirus software on all devices
3. Set up automatic backups
4. Change default passwords
5. Update all software

### Week 2-4: Foundation Building
1. Implement email security
2. Set up network firewall
3. Create security policies
4. Begin employee training
5. Establish incident response procedures

### Month 2-3: Enhancement
1. Deploy advanced threat protection
2. Conduct security assessment
3. Implement monitoring
4. Regular security training
5. Test backup and recovery

## Conclusion

Cybersecurity for small businesses doesn't have to be expensive or complicated. By focusing on the most effective, cost-efficient security measures and building a culture of security awareness, small businesses can significantly reduce their risk of cyber attacks.

Remember: The cost of implementing security measures is always less than the cost of recovering from a security incident. Start with the basics, build gradually, and always prioritize employee education.

## Key Takeaways

1. **Start with the Basics**: MFA, backups, and updates
2. **Educate Your Team**: Human error is the biggest risk
3. **Use Free Tools**: Many effective security tools are free
4. **Plan for Incidents**: Have a response plan ready
5. **Regular Reviews**: Security is an ongoing process
6. **Measure Success**: Track your security improvements
7. **Stay Informed**: Keep up with evolving threats
    `,
    author: {
      name: "Robert Kim",
      email: "robert.kim@digitalshieldacademy.com",
      bio: "Small business cybersecurity consultant with 8+ years of experience helping SMBs implement cost-effective security solutions."
    },
    category: "best-practices",
    tags: ["small-business", "cybersecurity", "cost-effective", "security-policies", "compliance"],
    featuredImage: "/images/blog/small-business-cybersecurity.jpg",
    status: "published",
    publishedAt: new Date("2023-12-05"),
    readTime: 13,
    views: 3100,
    likes: 223,
    seo: {
      metaTitle: "Small Business Cybersecurity: Cost-Effective Security Guide | Digital Shield Academy",
      metaDescription: "Practical cybersecurity guide for small businesses. Learn cost-effective security measures to protect your business from cyber threats.",
      keywords: ["small business cybersecurity", "cybersecurity for SMBs", "cost-effective security", "business security"]
    }
  }
];

async function seedAdditionalBlogPosts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-shield-academy');
    console.log('Connected to MongoDB');

    // Insert additional blog posts
    const insertedPosts = await BlogPost.insertMany(additionalBlogPosts);
    console.log(`Successfully inserted ${insertedPosts.length} additional blog posts`);

    // Display summary
    console.log('\nAdditional blog posts created:');
    insertedPosts.forEach(post => {
      console.log(`- ${post.title} (${post.category})`);
    });

    // Get total count
    const totalPosts = await BlogPost.countDocuments();
    console.log(`\nTotal blog posts in database: ${totalPosts}`);

  } catch (error) {
    console.error('Error seeding additional blog posts:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeding function
seedAdditionalBlogPosts();
