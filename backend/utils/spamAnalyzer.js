// Spam Email Analysis Engine
// Analyzes submitted emails for malicious content and assigns risk scores

const spamKeywords = {
    // Urgency indicators
    urgency: {
        keywords: [
            'urgent', 'immediately', 'asap', 'expires', 'limited time', 'act now',
            'deadline', 'final notice', 'last chance', 'expires today', 'hurry',
            'quickly', 'right now', 'don\'t delay', 'time sensitive', 'emergency'
        ],
        weight: 15,
        category: 'urgency'
    },
    
    // Financial threats
    financial: {
        keywords: [
            'account suspended', 'payment required', 'billing issue', 'overdue',
            'payment failed', 'credit card', 'bank account', 'wire transfer',
            'refund', 'invoice', 'payment method', 'billing address',
            'account locked', 'verify payment', 'update payment'
        ],
        weight: 20,
        category: 'financial'
    },
    
    // Authority impersonation
    authority: {
        keywords: [
            'microsoft', 'apple', 'google', 'amazon', 'paypal', 'ebay',
            'irs', 'fbi', 'police', 'court', 'legal action', 'lawsuit',
            'government', 'official', 'federal', 'tax', 'audit'
        ],
        weight: 18,
        category: 'authority'
    },
    
    // Suspicious domains and links
    suspicious: {
        keywords: [
            'bit.ly', 'tinyurl', 'goo.gl', 't.co', 'click here', 'verify now',
            'update now', 'confirm now', 'click below', 'follow link',
            'download', 'install', 'update software', 'security update'
        ],
        weight: 25,
        category: 'suspicious'
    },
    
    // Personal information requests
    personal: {
        keywords: [
            'social security', 'ssn', 'date of birth', 'mother\'s maiden name',
            'password', 'username', 'login', 'account number', 'pin',
            'verify identity', 'confirm details', 'personal information'
        ],
        weight: 22,
        category: 'personal'
    },
    
    // Threats and consequences
    threats: {
        keywords: [
            'account closed', 'suspended', 'terminated', 'legal action',
            'arrest warrant', 'fine', 'penalty', 'consequences', 'immediate action',
            'violation', 'breach', 'unauthorized access', 'security breach'
        ],
        weight: 20,
        category: 'threats'
    },
    
    // Free offers and prizes
    offers: {
        keywords: [
            'free', 'prize', 'winner', 'congratulations', 'claim now',
            'limited offer', 'special deal', 'exclusive', 'bonus',
            'cash prize', 'gift card', 'voucher', 'discount'
        ],
        weight: 12,
        category: 'offers'
    },
    
    // Technical jargon
    technical: {
        keywords: [
            'virus detected', 'malware', 'security threat', 'system compromised',
            'firewall', 'antivirus', 'scan', 'clean', 'repair', 'fix',
            'remote access', 'technical support', 'system administrator'
        ],
        weight: 16,
        category: 'technical'
    }
};

const legitimateKeywords = {
    // Legitimate business indicators
    business: {
        keywords: [
            'receipt', 'order confirmation', 'shipping', 'delivery',
            'tracking number', 'invoice', 'statement', 'newsletter',
            'unsubscribe', 'privacy policy', 'terms of service'
        ],
        weight: -10,
        category: 'legitimate'
    },
    
    // Professional communication
    professional: {
        keywords: [
            'sincerely', 'best regards', 'thank you', 'please contact',
            'customer service', 'support team', 'business hours',
            'office address', 'phone number', 'website'
        ],
        weight: -8,
        category: 'professional'
    }
};

class SpamAnalyzer {
    constructor() {
        this.thresholds = {
            high: 60,
            medium: 30,
            low: 15
        };
    }

    analyzeEmail(emailContent) {
        const analysis = {
            isMalicious: false,
            confidence: 0,
            threatType: 'spam',
            detectedKeywords: [],
            riskScore: 0,
            explanation: ''
        };

        // Analyze subject line
        const subjectAnalysis = this.analyzeText(emailContent.subject);
        
        // Analyze email body
        const bodyAnalysis = this.analyzeText(emailContent.body);
        
        // Analyze sender information
        const senderAnalysis = this.analyzeSender(emailContent.sender, emailContent.senderEmail);
        
        // Combine all analyses
        analysis.detectedKeywords = [
            ...subjectAnalysis.keywords,
            ...bodyAnalysis.keywords,
            ...senderAnalysis.keywords
        ];
        
        analysis.riskScore = Math.min(100, Math.max(0, 
            subjectAnalysis.score + bodyAnalysis.score + senderAnalysis.score
        ));
        
        // Determine if malicious - improved logic
        const hasHighRiskKeywords = analysis.detectedKeywords.some(k => k.severity === 'critical' || k.severity === 'high');
        const hasUrgencyKeywords = analysis.detectedKeywords.some(k => k.category === 'urgency');
        const hasFinancialKeywords = analysis.detectedKeywords.some(k => k.category === 'financial');
        
        // If we have high-risk keywords or multiple suspicious indicators, classify as malicious
        if (hasHighRiskKeywords || (hasUrgencyKeywords && hasFinancialKeywords) || analysis.riskScore >= this.thresholds.medium) {
            analysis.isMalicious = true;
        }
        
        // Set confidence based on risk score and keyword severity
        let confidence = analysis.riskScore + 20;
        if (hasHighRiskKeywords) confidence += 20;
        if (hasUrgencyKeywords && hasFinancialKeywords) confidence += 15;
        analysis.confidence = Math.min(100, confidence);
        
        // Determine threat type
        analysis.threatType = this.determineThreatType(analysis.detectedKeywords);
        
        // Generate explanation
        analysis.explanation = this.generateExplanation(analysis);
        
        return analysis;
    }

    analyzeText(text) {
        const result = {
            keywords: [],
            score: 0
        };

        if (!text) return result;

        const lowerText = text.toLowerCase();
        
        // Check for malicious keywords
        Object.entries(spamKeywords).forEach(([category, data]) => {
            data.keywords.forEach(keyword => {
                if (lowerText.includes(keyword.toLowerCase())) {
                    result.keywords.push({
                        keyword: keyword,
                        category: data.category,
                        severity: this.getSeverity(data.weight)
                    });
                    result.score += data.weight;
                }
            });
        });

        // Check for legitimate keywords (reduce score)
        Object.entries(legitimateKeywords).forEach(([category, data]) => {
            data.keywords.forEach(keyword => {
                if (lowerText.includes(keyword.toLowerCase())) {
                    result.keywords.push({
                        keyword: keyword,
                        category: data.category,
                        severity: 'low'
                    });
                    result.score += data.weight; // Negative weight
                }
            });
        });

        return result;
    }

    analyzeSender(sender, senderEmail) {
        const result = {
            keywords: [],
            score: 0
        };

        // Check for suspicious sender patterns
        const suspiciousPatterns = [
            { pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, weight: -5 }, // Valid email format
            { pattern: /noreply|no-reply|donotreply/i, weight: 5 }, // No-reply addresses
            { pattern: /support|help|service/i, weight: -3 }, // Support addresses
            { pattern: /admin|administrator/i, weight: 10 }, // Admin impersonation
            { pattern: /security|alert|notification/i, weight: 8 } // Security impersonation
        ];

        const fullSender = `${sender} ${senderEmail}`.toLowerCase();

        suspiciousPatterns.forEach(({ pattern, weight }) => {
            if (pattern.test(fullSender)) {
                result.score += weight;
                if (weight > 0) {
                    result.keywords.push({
                        keyword: 'suspicious sender pattern',
                        category: 'sender',
                        severity: this.getSeverity(Math.abs(weight))
                    });
                }
            }
        });

        // Check for domain reputation (simplified)
        const suspiciousDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com' // Free email services
        ];
        
        const domain = senderEmail.split('@')[1]?.toLowerCase();
        if (domain && suspiciousDomains.includes(domain)) {
            result.score += 5;
            result.keywords.push({
                keyword: 'free email service',
                category: 'sender',
                severity: 'low'
            });
        }

        return result;
    }

    determineThreatType(keywords) {
        const categoryCounts = {};
        
        keywords.forEach(keyword => {
            categoryCounts[keyword.category] = (categoryCounts[keyword.category] || 0) + 1;
        });

        // Determine primary threat type based on most common category
        const primaryCategory = Object.keys(categoryCounts).reduce((a, b) => 
            categoryCounts[a] > categoryCounts[b] ? a : b, 'spam'
        );

        const threatTypeMap = {
            'financial': 'phishing',
            'authority': 'phishing',
            'personal': 'phishing',
            'threats': 'scam',
            'technical': 'malware',
            'offers': 'scam',
            'urgency': 'phishing',
            'suspicious': 'malware',
            'legitimate': 'legitimate',
            'professional': 'legitimate'
        };

        return threatTypeMap[primaryCategory] || 'spam';
    }

    getSeverity(weight) {
        if (weight >= 20) return 'critical';
        if (weight >= 15) return 'high';
        if (weight >= 10) return 'medium';
        return 'low';
    }

    generateExplanation(analysis) {
        const explanations = [];
        
        // Check for specific threat patterns
        const hasUrgencyKeywords = analysis.detectedKeywords.some(k => k.category === 'urgency');
        const hasFinancialKeywords = analysis.detectedKeywords.some(k => k.category === 'financial');
        const hasAuthorityKeywords = analysis.detectedKeywords.some(k => k.category === 'authority');
        const criticalKeywords = analysis.detectedKeywords.filter(k => k.severity === 'critical');
        const highKeywords = analysis.detectedKeywords.filter(k => k.severity === 'high');

        if (analysis.isMalicious) {
            if (hasUrgencyKeywords && hasFinancialKeywords) {
                explanations.push('HIGH RISK: This email combines urgency tactics with financial requests - a classic phishing pattern.');
            } else if (hasAuthorityKeywords && hasUrgencyKeywords) {
                explanations.push('HIGH RISK: This email impersonates authority figures while creating urgency - likely a scam.');
            } else if (criticalKeywords.length > 0) {
                explanations.push('CRITICAL RISK: This email contains critical threat indicators.');
            } else if (analysis.riskScore >= this.thresholds.high) {
                explanations.push('HIGH RISK: This email shows multiple indicators of malicious intent.');
            } else {
                explanations.push('MEDIUM RISK: This email contains suspicious elements that warrant caution.');
            }
        } else {
            if (analysis.riskScore >= this.thresholds.low) {
                explanations.push('LOW RISK: This email has some questionable characteristics.');
            } else {
                explanations.push('This email appears to be legitimate with no significant red flags detected.');
            }
        }

        // Add specific threat indicators
        if (criticalKeywords.length > 0) {
            explanations.push(`Critical indicators: ${criticalKeywords.map(k => k.keyword).join(', ')}`);
        }

        if (highKeywords.length > 0) {
            explanations.push(`High-risk indicators: ${highKeywords.map(k => k.keyword).join(', ')}`);
        }

        // Add specific pattern explanations
        if (hasUrgencyKeywords) {
            explanations.push('Urgency tactics detected - legitimate organizations rarely use urgent language.');
        }

        if (hasFinancialKeywords) {
            explanations.push('Financial requests detected - be cautious of any requests for money or account information.');
        }

        if (hasAuthorityKeywords) {
            explanations.push('Authority impersonation detected - verify the sender through official channels.');
        }

        // Add recommendations
        if (analysis.isMalicious) {
            explanations.push('Recommendation: Do not click any links, download attachments, or provide personal information.');
        } else if (analysis.riskScore >= this.thresholds.low) {
            explanations.push('Recommendation: Exercise caution and verify the sender through official channels.');
        } else {
            explanations.push('Recommendation: This email appears safe, but always verify unexpected communications.');
        }

        return explanations.join(' ');
    }

    calculatePoints(analysis, userAssessment) {
        let points = 0;
        let reason = '';

        // Base points for submission
        points += 5;
        reason += 'Submitted spam email (+5)';

        // Points for correct assessment
        if (userAssessment.isSpam === analysis.isMalicious) {
            if (analysis.isMalicious) {
                points += 15;
                reason += ', Correctly identified malicious email (+15)';
            } else {
                points += 10;
                reason += ', Correctly identified legitimate email (+10)';
            }
        }

        // Bonus points for high-risk emails
        if (analysis.riskScore >= this.thresholds.high) {
            points += 10;
            reason += ', High-risk email bonus (+10)';
        } else if (analysis.riskScore >= this.thresholds.medium) {
            points += 5;
            reason += ', Medium-risk email bonus (+5)';
        }

        // Bonus for detailed analysis
        if (analysis.detectedKeywords.length >= 5) {
            points += 5;
            reason += ', Detailed analysis bonus (+5)';
        }

        // Threat type bonus
        if (analysis.threatType === 'phishing') {
            points += 5;
            reason += ', Phishing detection bonus (+5)';
        } else if (analysis.threatType === 'malware') {
            points += 8;
            reason += ', Malware detection bonus (+8)';
        }

        return { points, reason };
    }
}

module.exports = new SpamAnalyzer();
