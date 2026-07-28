export const blogPosts = [
    {
        id: 1,
        slug: "zero-trust-security-for-developers",
        title: "Understanding Zero Trust Security for Developers",
        excerpt: "Learn how zero trust principles can be implemented in your development workflow to create more secure applications from day one.",
        content: `
      <p>Zero Trust security is a paradigm shift from traditional "trust but verify" to "never trust, always verify." For developers, this means building applications with the assumption that no user, device, or network traffic should be trusted by default.</p>
      
      <h2>What is Zero Trust?</h2>
      <p>Zero Trust is a security framework requiring all users, whether inside or outside the organization's network, to be authenticated, authorized, and continuously validated before being granted access to applications and data.</p>
      
      <h2>Key Principles for Developers</h2>
      <h3>1. Verify Explicitly</h3>
      <p>Always authenticate and authorize based on all available data points, including user identity, location, device health, service or workload, and data classification.</p>
      
      <h3>2. Use Least Privilege Access</h3>
      <p>Limit user access with just-in-time and just-enough-access (JIT/JEA), risk-based adaptive policies, and data protection to secure data and productivity.</p>
      
      <h3>3. Assume Breach</h3>
      <p>Segment access by network, user, device, and application. Use end-to-end encryption and analytics to get visibility and drive threat detection.</p>
      
      <h2>Implementation Tips</h2>
      <p>Start implementing Zero Trust in your applications by using strong identity verification, implementing API security with JWT tokens, using mTLS for service-to-service communication, and never storing sensitive data without encryption.</p>
      
      <p>Remember that Zero Trust is a journey, not a destination. Begin with one application, implement proper authentication, and gradually add more security layers.</p>
    `,
        date: "March 15, 2025",
        readTime: "8 min read",
        featuredImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format",
        category: "Cybersecurity",
        tags: ["Security", "Zero Trust", "DevOps", "Authentication"],
        featured: true,
        views: 1247,
        author: "Denis Syengo",
        authorImage: "/assets/MasterSuit.jpeg"
    },
    {
        id: 2,
        slug: "ci-cd-pipeline-security-best-practices",
        title: "CI/CD Pipeline Security: Best Practices for 2025",
        excerpt: "Secure your development pipeline with these essential practices for protecting code, credentials, and deployments.",
        content: `
      <p>CI/CD pipelines are attractive targets for attackers. A compromised pipeline can lead to supply chain attacks, credential theft, and malicious code deployment. Here's how to secure yours.</p>
      
      <h2>Why Pipeline Security Matters</h2>
      <p>Your CI/CD pipeline has access to source code, credentials, and production environments. Securing it isn't optional—it's essential.</p>
      
      <h2>Essential Security Practices</h2>
      
      <h3>1. Secrets Management</h3>
      <p>Never hardcode secrets. Use dedicated secrets managers like HashiCorp Vault, AWS Secrets Manager, or GitHub Secrets. Rotate credentials regularly and audit access logs.</p>
      
      <h3>2. Dependency Scanning</h3>
      <p>Implement SCA (Software Composition Analysis) tools to detect vulnerabilities in open-source dependencies. Tools like Snyk, OWASP Dependency Check, or GitHub Dependabot can automate this.</p>
      
      <h3>3. Container Security</h3>
      <p>Scan container images for vulnerabilities before deployment. Use minimal base images, implement image signing, and regularly update base images.</p>
      
      <h3>4. Pipeline Isolation</h3>
      <p>Run each build in isolated environments. Use ephemeral runners, separate build environments by project, and limit network access during builds.</p>
      
      <h2>Automation Is Key</h2>
      <p>Automate security checks as early as possible in the pipeline. Shift-left security means finding and fixing issues before they reach production.</p>
    `,
        date: "March 10, 2025",
        readTime: "6 min read",
        featuredImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format",
        category: "DevOps",
        tags: ["DevOps", "CI/CD", "Security", "Automation"],
        featured: true,
        views: 892,
        author: "Denis Syengo",
        authorImage: "/assets/MasterSuit.jpeg"
    },
    {
        id: 3,
        slug: "ai-threat-detection-machine-learning",
        title: "Using AI for Real-Time Threat Detection",
        excerpt: "Explore how machine learning models can identify security threats faster and more accurately than traditional methods.",
        content: `
      <p>Traditional security tools rely on signatures and rules. AI-powered threat detection learns from data, identifying novel attacks and reducing false positives.</p>
      
      <h2>The Challenge</h2>
      <p>Security teams face alert fatigue, sophisticated attackers, and skill shortages. AI can augment human analysts by handling the noise and surfacing real threats.</p>
      
      <h2>ML Models for Threat Detection</h2>
      
      <h3>Anomaly Detection</h3>
      <p>Unsupervised learning models establish baselines of normal behavior and flag deviations. Ideal for detecting zero-day attacks and insider threats.</p>
      
      <h3>Classification Models</h3>
      <p>Supervised learning models trained on labeled attack data can classify network traffic, emails, or file behaviors as malicious or benign.</p>
      
      <h3>Time Series Analysis</h3>
      <p>Detect patterns over time—sudden traffic spikes, unusual login times, or data exfiltration attempts.</p>
      
      <h2>Implementation Considerations</h2>
      <p>Start with clear use cases, ensure data quality, plan for model retraining, maintain human oversight, and don't rely solely on AI—use it as a force multiplier.</p>
      
      <p>The future of security is human-AI collaboration. Machines handle volume and speed; humans provide context and judgment.</p>
    `,
        date: "March 5, 2025",
        readTime: "10 min read",
        featuredImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format",
        category: "Artificial Intelligence",
        tags: ["AI", "Machine Learning", "Threat Detection", "Security Analytics"],
        featured: true,
        views: 2103,
        author: "Denis Syengo",
        authorImage: "/assets/MasterSuit.jpeg"
    },
    {
        id: 4,
        slug: "api-security-best-practices",
        title: "API Security Best Practices Every Developer Should Know",
        excerpt: "APIs are the backbone of modern applications. Learn how to protect them from common attacks and vulnerabilities.",
        content: `
      <p>APIs power everything from mobile apps to microservices. But they're also a primary attack vector. Here's how to build secure APIs.</p>
      
      <h2>Common API Vulnerabilities</h2>
      <p>Broken authentication, excessive data exposure, injection attacks, broken object-level authorization, and security misconfigurations top the OWASP API Security Top 10.</p>
      
      <h2>Essential Security Controls</h2>
      
      <h3>Authentication & Authorization</h3>
      <p>Use OAuth 2.0 or JWT with short expiration times. Implement per-endpoint authorization checks. Never trust client-side authorization decisions.</p>
      
      <h3>Rate Limiting & Throttling</h3>
      <p>Protect against brute force and DoS attacks. Implement per-user, per-IP, and global rate limits.</p>
      
      <h3>Input Validation</h3>
      <p>Validate all inputs on the server side. Use allow lists, not block lists. Implement strong schema validation.</p>
      
      <h3>Encryption</h3>
      <p>Always use HTTPS. Encrypt sensitive data at rest and in transit. Implement proper key rotation policies.</p>
      
      <h2>Monitoring & Logging</h2>
      <p>Log all authentication attempts, authorization failures, and input validation errors. Set up alerts for anomalies and implement API gateways for centralized security.</p>
    `,
        date: "February 28, 2025",
        readTime: "7 min read",
        featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format",
        category: "Cybersecurity",
        tags: ["API", "Security", "Authentication", "REST API"],
        featured: false,
        views: 654,
        author: "Denis Syengo",
        authorImage: "/assets/MasterSuit.jpeg"
    },
    {
        id: 5,
        slug: "huawei-ict-competition-2024-experience",
        title: "My Experience at the Huawei ICT Competition 2024-2025",
        excerpt: "Lessons learned from building an innovative IoT air quality monitoring system for one of Africa's largest tech competitions.",
        content: `
      <p>The Huawei ICT Competition brought together talented students from across Africa to solve real-world problems using technology. Our team built an innovative solution for air quality monitoring.</p>
      
      <h2>The Challenge</h2>
      <p>Air pollution is a growing concern in African cities. Existing monitoring solutions are expensive and sparse. We needed a low-cost, scalable solution.</p>
      
      <h2>Our Solution: Smart Air Quality Monitor</h2>
      <p>We built an IoT-based system using affordable sensors, Huawei Cloud for data processing, AI analytics for predictions, and a web dashboard for visualization.</p>
      
      <h2>Technical Stack</h2>
      <p>Hardware: ESP32 with PM2.5, CO2, temperature, and humidity sensors. Backend: Huawei Cloud IoT Core. Frontend: React dashboard showing real-time data and historical trends. AI: ML models predicting air quality based on weather patterns.</p>
      
      <h2>Key Learnings</h2>
      <p>We learned to integrate IoT hardware with cloud platforms, build real-time dashboards, apply ML to environmental data, manage a team under tight deadlines, and present technical solutions to judges.</p>
      
      <p>The competition was challenging but rewarding. We placed among top teams and gained invaluable experience in IoT and cloud computing.</p>
    `,
        date: "February 20, 2025",
        readTime: "5 min read",
        featuredImage: "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?w=800&auto=format",
        category: "Projects",
        tags: ["IoT", "Huawei Cloud", "AI", "Competition"],
        featured: true,
        views: 1567,
        author: "Denis Syengo",
        authorImage: "/assets/MasterSuit.jpeg"
    }
];

export const categories = ["All", "Cybersecurity", "DevOps", "Artificial Intelligence", "Projects"];