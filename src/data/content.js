// ============================================================
// Site content: hero, stats, services, experience, toolkit, education.
// Icons are referenced by key and drawn as inline SVG in Services.astro.
// ============================================================

export const profile = {
  name: 'Umair Saleem',
  title: 'WordPress & Web Developer',
  email: 'umairdhami143@gmail.com',
  phone: '+92 310 4542479',
  location: 'Lahore, Pakistan',
  linkedin: '#', // <- paste your LinkedIn URL
  github: '#',   // <- paste your GitHub URL
};

export const stats = [
  { value: '9+', label: 'Websites shipped' },
  { value: '3+', label: 'Years of experience' },
  { value: '6', label: 'Core service areas' },
  { value: '24/7', label: 'Maintenance & care' },
];

export const marquee = ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'Elementor', 'Speed', 'Security'];

export const services = [
  {
    icon: 'code',
    title: 'WordPress Development',
    desc: 'Responsive, easy-to-manage websites tailored to business goals and real user needs.',
    tags: ['WordPress', 'PHP', 'MySQL'],
  },
  {
    icon: 'layout',
    title: 'Page Builders & UI',
    desc: 'Pixel-conscious layouts and flexible page experiences with the leading builders.',
    tags: ['Elementor', 'Divi', 'WPBakery'],
  },
  {
    icon: 'cart',
    title: 'WooCommerce',
    desc: 'Store experiences, product layouts, and e-commerce flows that are built to sell.',
    tags: ['WooCommerce', 'Payments'],
  },
  {
    icon: 'plug',
    title: 'Front-end & Integrations',
    desc: 'Custom styling, interactive details, and reliable third-party connections.',
    tags: ['HTML', 'CSS', 'JavaScript', 'APIs'],
  },
  {
    icon: 'gauge',
    title: 'Speed & Optimization',
    desc: 'Performance-focused improvements for a smoother, faster browsing experience.',
    tags: ['Core Web Vitals', 'Caching', 'SEO'],
  },
  {
    icon: 'shield',
    title: 'Security & Maintenance',
    desc: 'Website upkeep, security tools, forms, and reliable ongoing site management.',
    tags: ['Wordfence', 'Sucuri', 'Forms'],
  },
];

export const experience = [
  {
    when: 'Sep 2023 — Present',
    current: true,
    role: 'Senior WordPress Developer',
    org: 'Core Growth · Pakistan',
    points: [
      'Write well-designed, testable, and efficient code using development best practices.',
      'Create website layouts and user interfaces with HTML and CSS.',
      'Customize and update WordPress plugins and themes to enhance functionality.',
      'Manage projects with Asana and collaborate with designers to deliver the intended visual experience.',
      'Stay current with emerging technologies and development practices.',
    ],
  },
  {
    when: 'Nov 2022 — Jul 2023',
    current: false,
    role: 'Commercial Excellence Officer',
    org: 'CCL Pharmaceuticals · Pakistan',
    points: [
      'Collected and uploaded distributor sales data into the Sales Analysis System (SAS).',
      'Supported systems aligned with commercial terms, CRM, analytics, dashboards, and insights.',
      'Maintained physical and digital records for accurate documentation.',
    ],
  },
];

export const toolkit = [
  { cat: 'Development', items: [['WordPress', true], ['HTML5'], ['CSS3'], ['JavaScript'], ['PHP'], ['MySQL']] },
  { cat: 'Platforms & Builders', items: [['Elementor'], ['Divi'], ['WPBakery'], ['WooCommerce', true]] },
  { cat: 'Optimization & Security', items: [['WP Rocket'], ['W3 Total Cache'], ['Wordfence'], ['Sucuri'], ['Rank Math']] },
  { cat: 'Workflow & Analytics', items: [['Git'], ['GitHub'], ['Bitbucket'], ['Asana'], ['ClickUp'], ['Google Analytics'], ['cPanel']] },
  { cat: 'Forms & Integrations', items: [['Gravity Forms'], ['Contact Form 7'], ['API Integrations'], ['Third-party Tools']] },
];

export const education = [
  { years: '2018 — 2022', degree: 'Bachelor of Science · Computer Science', inst: 'National College of Business Administration & Economics · Pakistan', kind: 'Degree' },
  { years: '2015 — 2017', degree: 'Intermediate · Computer Science', inst: 'Punjab Group of Colleges · Pakistan', kind: 'Pre-eng' },
  { years: '2022', degree: 'Java Development', inst: 'ICT Institute · Pakistan', kind: 'Certificate' },
];
