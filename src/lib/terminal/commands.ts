import { CommandOutput } from '@/types/terminal';
import portfolioData from '@/../data/portfolio.json';

export async function executeCommand(input: string): Promise<CommandOutput> {
  const parts = input.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  const commands: { [key: string]: () => CommandOutput | Promise<CommandOutput> } = {
    help: cmdHelp,
    about: cmdAbout,
    skills: cmdSkills,
    services: cmdServices,
    projects: cmdProjects,
    work: cmdWork,
    companies: cmdCompanies,
    experience: cmdCompanies,
    certs: cmdCertifications,
    certifications: cmdCertifications,
    contact: cmdContact,
    email: cmdContact,
    social: cmdSocial,
    linkedin: cmdLinkedIn,
    github: cmdGitHub,
    clear: cmdClear,
    whoami: cmdWhoami,
    ls: cmdLs,
    cat: () => cmdCat(args),
    echo: () => cmdEcho(args),
    date: cmdDate,
    uptime: cmdUptime,
    neofetch: cmdNeofetch,
    banner: cmdBanner,
    matrix: cmdMatrix,
    hack: cmdHack,
    sudo: () => cmdSudo(args),
  };

  if (command in commands) {
    return await commands[command]();
  } else {
    return {
      text: `Command not found: ${command}\nType 'help' for available commands.`,
      type: 'error',
    };
  }
}

function cmdHelp(): CommandOutput {
  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                      AVAILABLE COMMANDS                       ║
╚═══════════════════════════════════════════════════════════════╝

Portfolio Commands:
  about          - Learn about me
  skills         - View my technical skills
  services       - What I can do for you
  projects       - View my portfolio projects
  work           - My work experience
  companies      - Companies I've worked with
  certs          - Security certifications

Contact & Social:
  contact        - Get in touch
  social         - Social media links
  linkedin       - Open LinkedIn profile
  github         - Open GitHub profile

System Commands:
  help           - Show this help menu
  clear          - Clear the terminal
  whoami         - Display current user
  ls             - List available files
  cat <file>     - Read a file
  echo <text>    - Print text
  date           - Show current date/time
  uptime         - System uptime
  neofetch       - System information

Fun Commands:
  banner         - Display ASCII banner
  matrix         - Toggle Matrix rain
  hack           - Hacker mode
  sudo <cmd>     - Run as superuser

Type any command to get started!
`,
    type: 'info',
  };
}

function cmdAbout(): CommandOutput {
  const { personal } = portfolioData;
  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                         ABOUT ME                              ║
╚═══════════════════════════════════════════════════════════════╝

Name: ${personal.name}
Role: ${personal.currentRole}

${personal.bio.join('\n\n')}

Objective: ${personal.tagline}

Type 'contact' to get in touch or 'services' to see what I can do for you.
`,
    type: 'success',
  };
}

function cmdSkills(): CommandOutput {
  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                      TECHNICAL SKILLS                         ║
╚═══════════════════════════════════════════════════════════════╝

Systems Administration:
  ▸ Windows Server, Linux (Debian, Ubuntu, RHEL), MacOS
  ▸ VMware, Hyper-V, Proxmox virtualization
  ▸ Active Directory, Group Policy, DNS, DHCP
  ▸ PowerShell, Bash scripting automation

Cybersecurity:
  ▸ ISO 27001 Lead Auditor certified
  ▸ ISO 42001 Lead Auditor certified
  ▸ TPN Gold security framework implementation
  ▸ Security auditing, compliance, risk assessment
  ▸ Penetration testing, vulnerability management

Web Development:
  ▸ HTML5, CSS3, JavaScript, TypeScript
  ▸ React, Next.js, Node.js
  ▸ API development (REST, GraphQL)
  ▸ Database design (PostgreSQL, MySQL, MongoDB)

Cloud & DevOps:
  ▸ AWS, Azure, Vercel deployment
  ▸ Docker, Kubernetes containerization
  ▸ CI/CD pipelines (GitHub Actions, Jenkins)
  ▸ Infrastructure as Code (Terraform)

Other:
  ▸ Project management (Agile, Scrum)
  ▸ Customer success & technical support
  ▸ Photography & graphic design
  ▸ AI automation & integration
`,
    type: 'info',
  };
}

function cmdServices(): CommandOutput {
  const { services } = portfolioData;
  const output = services
    .map((service) => `  ${service.icon} ${service.name}\n     ${service.description}`)
    .join('\n\n');

  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                    WHAT CAN I DO FOR YOU?                     ║
╚═══════════════════════════════════════════════════════════════╝

${output}

Ready to work together? Type 'contact' to get in touch!
`,
    type: 'success',
  };
}

function cmdProjects(): CommandOutput {
  const { projects } = portfolioData;
  const output = projects
    .map(
      (project, i) => `
[${i + 1}] ${project.name}
    ${project.description}
    🔗 ${project.url}
`
    )
    .join('\n');

  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                       PORTFOLIO PROJECTS                      ║
╚═══════════════════════════════════════════════════════════════╝
${output}
`,
    type: 'info',
  };
}

function cmdWork(): CommandOutput {
  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                      WORK EXPERIENCE                          ║
╚═══════════════════════════════════════════════════════════════╝

[CURRENT] Technical Success Manager @ Aftra.io
  • Customer success & technical support
  • Security compliance & system optimization
  • Technical onboarding & training

[2020-2024] Chief Technical Architect @ RVX Productions
  • Led company to TPN Gold security certification
  • Implemented ISO 27001 security framework
  • Managed infrastructure & development teams
  • Oversaw all technical operations

[2018-2020] System Administrator @ Isavia ANS
  • Air traffic control systems management
  • Critical infrastructure maintenance
  • 24/7 system monitoring & support

[2016-2018] IT Specialist @ Terra Umhverfisþjónusta
  • Network administration & support
  • Server management (Windows/Linux)
  • Help desk & end-user support

Type 'companies' to see all organizations I've worked with.
`,
    type: 'success',
  };
}

function cmdCompanies(): CommandOutput {
  const { companies } = portfolioData;
  const output = companies.map((company) => `  ▸ ${company.name} - ${company.url}`).join('\n');

  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                  COMPANIES I'VE WORKED WITH                   ║
╚═══════════════════════════════════════════════════════════════╝

${output}

These experiences have shaped my expertise in cybersecurity, system
administration, and customer success.
`,
    type: 'info',
  };
}

function cmdCertifications(): CommandOutput {
  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                   SECURITY CERTIFICATIONS                     ║
╚═══════════════════════════════════════════════════════════════╝

🏆 ISO 27001 Lead Auditor
   Information Security Management Systems
   Lead auditor certified for ISMS implementation & auditing

🏆 ISO 42001 Lead Auditor
   Artificial Intelligence Management Systems
   Lead auditor certified for AI governance frameworks

🏆 TPN Gold (Trusted Partner Network)
   Led RVX Productions to achieve prestigious TPN Gold status
   Content security assessment for media & entertainment

Specialization:
  • Security framework implementation
  • Compliance auditing & risk assessment
  • High-security environment management
  • Information security consulting
`,
    type: 'success',
  };
}

function cmdContact(): CommandOutput {
  const { personal } = portfolioData;
  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                        GET IN TOUCH                           ║
╚═══════════════════════════════════════════════════════════════╝

📧 Email: ${personal.email}

Ready to simplify your IT? Let's connect!

For social links, type 'social'
`,
    type: 'success',
  };
}

function cmdSocial(): CommandOutput {
  const { social } = portfolioData;
  return {
    text: `
╔═══════════════════════════════════════════════════════════════╗
║                       SOCIAL LINKS                            ║
╚═══════════════════════════════════════════════════════════════╝

💼 LinkedIn: ${social.linkedin}
🐙 GitHub: ${social.github}

Type 'linkedin' or 'github' to open directly in your browser.
`,
    type: 'info',
  };
}

function cmdLinkedIn(): CommandOutput {
  const { social } = portfolioData;
  if (typeof window !== 'undefined') {
    window.open(social.linkedin, '_blank');
  }
  return {
    text: `Opening LinkedIn profile: ${social.linkedin}`,
    type: 'success',
  };
}

function cmdGitHub(): CommandOutput {
  const { social } = portfolioData;
  if (typeof window !== 'undefined') {
    window.open(social.github, '_blank');
  }
  return {
    text: `Opening GitHub profile: ${social.github}`,
    type: 'success',
  };
}

function cmdClear(): CommandOutput {
  if (typeof window !== 'undefined') {
    location.reload();
  }
  return { text: '', type: 'info' };
}

function cmdWhoami(): CommandOutput {
  return {
    text: 'guest@andri.is',
    type: 'info',
  };
}

function cmdLs(): CommandOutput {
  return {
    text: `about.txt  services.txt  projects.txt  work.txt  contact.txt  certs.txt`,
    type: 'info',
  };
}

function cmdCat(args: string[]): CommandOutput {
  if (args.length === 0) {
    return { text: 'cat: missing file operand\nTry "ls" to see available files', type: 'error' };
  }

  const fileMap: { [key: string]: () => CommandOutput } = {
    'about.txt': cmdAbout,
    'services.txt': cmdServices,
    'projects.txt': cmdProjects,
    'work.txt': cmdWork,
    'contact.txt': cmdContact,
    'certs.txt': cmdCertifications,
  };

  const file = args[0];
  if (file in fileMap) {
    return fileMap[file]();
  } else {
    return { text: `cat: ${file}: No such file or directory`, type: 'error' };
  }
}

function cmdEcho(args: string[]): CommandOutput {
  return {
    text: args.join(' '),
    type: 'info',
  };
}

function cmdDate(): CommandOutput {
  return {
    text: new Date().toString(),
    type: 'info',
  };
}

function cmdUptime(): CommandOutput {
  if (typeof window === 'undefined') {
    return { text: 'System uptime: N/A', type: 'info' };
  }

  const uptime = performance.now() / 1000;
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  return {
    text: `Session uptime: ${hours}h ${minutes}m ${seconds}s`,
    type: 'info',
  };
}

function cmdNeofetch(): CommandOutput {
  return {
    text: `
     ██████╗  ███╗   ██╗██████╗ ██████╗ ██╗    ██╗███████╗
    ██╔════╝  ████╗  ██║██╔══██╗██╔══██╗██║    ██║██╔════╝
    ███████╗  ██╔██╗ ██║██║  ██║██████╔╝██║ █╗ ██║███████╗
    ██╔═══██╗ ██║╚██╗██║██║  ██║██╔══██╗██║███╗██║╚════██║
    ╚██████╔╝ ██║ ╚████║██████╔╝██║  ██║╚███╔███╔╝███████║
     ╚═════╝  ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝

    user@andri.is
    ─────────────────────────────────────────
    OS: ANDRI.IS Terminal v2.0
    Host: Vercel Edge Network
    Kernel: Next.js 14.2.0
    Uptime: ${Math.floor(performance.now() / 1000)}s
    Shell: xterm.js 5.3.0
    Resolution: ${window.innerWidth}x${window.innerHeight}
    Theme: Cyberpunk [#00ff9d]
    Icons: Nerd Fonts
    Terminal: xterm
    CPU: Vercel Serverless
    Memory: Optimized
`,
    type: 'info',
  };
}

function cmdBanner(): CommandOutput {
  return {
    text: `
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     █████╗ ███╗   ██╗██████╗ ██████╗ ██╗    ██╗███████╗      ║
║    ██╔══██╗████╗  ██║██╔══██╗██╔══██╗██║    ██║██╔════╝      ║
║    ███████║██╔██╗ ██║██║  ██║██████╔╝██║ █╗ ██║███████╗      ║
║    ██╔══██║██║╚██╗██║██║  ██║██╔══██╗██║███╗██║╚════██║      ║
║    ██║  ██║██║ ╚████║██████╔╝██║  ██║╚███╔███╔╝███████║      ║
║    ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝      ║
║                                                                ║
║                  TERMINAL INTERFACE v2.0                       ║
║                    Simplify IT                                 ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`,
    type: 'success',
  };
}

function cmdMatrix(): CommandOutput {
  return {
    text: 'Matrix rain toggled! (Feature in development)',
    type: 'success',
  };
}

function cmdHack(): CommandOutput {
  return {
    text: `
[INITIATING HACK SEQUENCE...]
[████████████████████████] 100%

Access: GRANTED
Level: 1337 H4X0R
Status: Elite Mode Activated

Just kidding! Type 'help' for real commands 😉
`,
    type: 'success',
  };
}

function cmdSudo(args: string[]): CommandOutput {
  if (args.length === 0) {
    return {
      text: 'sudo: missing command\nUsage: sudo <command>',
      type: 'error',
    };
  }

  return {
    text: `[sudo] password for guest:
Permission denied. Nice try though! 😏

(This is a demo terminal - all commands run without privileges)`,
    type: 'warning',
  };
}
