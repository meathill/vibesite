import {
  CodeIcon,
  FileZipIcon,
  GlobeIcon,
  GraduationCapIcon,
  LightningIcon,
  RocketIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@phosphor-icons/react/dist/ssr';

export const AI_TOOLS = [
  '豆包',
  'DeepSeek',
  'Cursor',
  'Bolt',
  'Lovable',
  'v0',
  'ChatGPT',
  'Claude',
  'Windsurf',
  'Replit',
];

export const WHY_POINTS = [
  {
    icon: CodeIcon,
    title: '不需要懂命令行',
    desc: '告别 npm install、git push、CI/CD 配置。上传 zip 就行。',
  },
  {
    icon: GlobeIcon,
    title: '不需要注册托管平台',
    desc: '不用折腾 Cloudflare、Vercel、Netlify 的账号和配置。',
  },
  {
    icon: LightningIcon,
    title: '10 分钟内部署完成',
    desc: '全球 CDN 分发，任何设备、任何网络都能访问。',
  },
  {
    icon: ShieldCheckIcon,
    title: '免费预览，零风险',
    desc: '先看效果，满意了再考虑长期托管。不花一分钱。',
  },
];

export const PERSONAS = [
  {
    icon: RocketIcon,
    title: 'AI 工具用户',
    desc: '用 Cursor、Bolt、Lovable、v0 生成了网页，想让别人也能看到。',
  },
  {
    icon: UserIcon,
    title: '小商家',
    desc: '想要一个简单的在线展示页面，但不想花几千块找人做。',
  },
  {
    icon: GraduationCapIcon,
    title: '学生',
    desc: '课程作业或个人项目需要一个可访问的链接来提交。',
  },
  {
    icon: FileZipIcon,
    title: '自由职业者',
    desc: '需要快速给客户展示作品集或项目原型。',
  },
];

export const PRICING_PLANS = [
  {
    name: '免费预览',
    price: '0',
    unit: '',
    desc: '72 小时内免费访问',
    features: ['全球 CDN 部署', '可分享的预览链接', '72 小时有效期'],
    cta: '立即尝试',
    ctaHref: '/submit',
    highlighted: false,
  },
  {
    name: '基础',
    price: '188',
    unit: '元/年',
    desc: '快速上线，省心省力',
    features: ['HTTPS 证书', '独立二级域名', '全球 CDN 加速', '不限访问次数', '邮件技术支持'],
    cta: '立即开始',
    ctaHref: '/submit',
    highlighted: false,
  },
  {
    name: '全自持',
    price: '988',
    unit: '元/年',
    desc: '完全掌控你的网站',
    features: ['HTTPS 证书', '自定义域名', '完全自主管理', '优先技术支持', '后端数据库支持'],
    cta: '立即开始',
    ctaHref: '/submit',
    highlighted: true,
  },
  {
    name: '人工服务',
    price: '联系我',
    unit: '',
    desc: '专业人工部署与优化',
    features: [
      'HTTPS 证书',
      '专业全栈开发',
      '代码优化建议',
      '一对一支持',
      '除合法合规外无任何限制',
    ],
    cta: '联系我们',
    ctaHref: '/submit',
    highlighted: false,
  },
];

export const FAQS = [
  {
    question: '支持什么格式的文件？',
    answer:
      '支持 .zip 格式的压缩包。包内应该是网站的源代码或构建产物。支持纯 HTML/CSS/JS、Vite 项目和 React SPA。',
  },
  {
    question: '文件大小有限制吗？',
    answer: '单个文件最大支持 50MB。如果你的项目超过了，可以尝试压缩图片等静态资源。',
  },
  {
    question: '预览链接 72 小时后怎么办？',
    answer:
      '免费预览链接会在 72 小时后自动过期。如果你需要长期使用，可以选择我们的付费托管方案，最低 188 元/年。',
  },
  {
    question: '能绑定自己的域名吗？',
    answer: '可以。选择「自定义域名」方案（988 元/年），我们帮你配置域名解析和 HTTPS 证书。',
  },
  {
    question: '我的代码安全吗？',
    answer:
      '我们仅将你的文件用于部署，不会查看、修改或分享你的代码。预览链接过期后，源文件会从我们的服务器上删除。',
  },
  {
    question: '不支持哪些类型的项目？',
    answer:
      '目前不支持需要后端服务的项目（如 Next.js SSR、Express、数据库连接），也不支持需要 Docker 容器化部署的项目。我们专注于纯前端静态网站的部署。',
  },
];
