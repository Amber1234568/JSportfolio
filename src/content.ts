export type Lang = 'en' | 'zh';

export interface SolutionStep {
  step: string;
  title: string;
  body: string;
}

export interface Artifact {
  label: string;
  file: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  dates: string;
  notes?: string;
}

export interface CaseStudyProject {
  title: string;
  subtitle: string;
  oneLiner: string;
  tags: string[];
  bullets: string[];
  background: string;
  problem: string;
  role: string;
  tools: string[];
  solution: SolutionStep[];
  artifacts: Artifact[];
  nextSteps: string[];
  links: ProjectLink[];
  githubUrl?: string;
  figmaUrl?: string;
}

export interface SiteContent {
  name: string;
  role: string;
  availability: string;
  nav: {
    langToggleEn: string;
    langToggleZh: string;
  };
  work: {
    title: string;
    subtitle: string;
    resume: string;
    email: string;
    viewCase: string;
    viewGitHub: string;
    viewFigma: string;
    comingSoon: string;
    sections: {
      bio: string;
      experience: string;
      projects: string;
      skills: string;
      education: string;
      contact: string;
    };
  };
  bio: string;
  experience: Experience[];
  skills: SkillGroup[];
  education: Education[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    note: string;
  };
  projects: {
    daplink: CaseStudyProject;
    adhd: CaseStudyProject;
    studypal: CaseStudyProject;
  };
}

export const content: Record<Lang, SiteContent> = {
  en: {
    name: 'Jingcheng Shao (Amber)',
    role: 'AI Product / PM Intern',
    availability: 'Available · 4+ days/week · CN-time overlap',
    nav: {
      langToggleEn: '中文',
      langToggleZh: 'English',
    },
    work: {
      title: 'Work',
      subtitle: 'an overview of my career',
      resume: 'Resume',
      email: 'Email',
      viewCase: 'Case study',
      viewGitHub: 'GitHub ↗',
      viewFigma: 'Figma ↗',
      comingSoon: 'GitHub (coming soon)',
      sections: {
        bio: 'Bio',
        experience: 'Experience',
        projects: 'Projects',
        skills: 'Skills',
        education: 'Education',
        contact: 'Contact',
      },
    },
    bio: "I'm a data and product person currently finishing an M.S. in Biostatistics at UC San Diego. I like turning messy, real-world workflows into product experiences that are easier to use—especially for AI tools where trust, guidance, and error recovery make the difference between adoption and abandonment. I prototype fast, in Figma and in code.",
    experience: [
      {
        role: 'AI Product / PM Intern',
        company: 'SupStat',
        location: 'Remote',
        dates: '2024 – Present',
        bullets: [
          'Designed and shipped a 3-stage AI valuation pipeline for dental clinic M&A—from data ingestion to one-click report to grounded chatbot Q&A.',
          'Owned the full product arc: problem framing, UX flows, data transformation layer, RAG integration, and frontend.',
        ],
      },
      {
        role: '[Your Previous Role]',
        company: '[Company]',
        location: '[Location]',
        dates: '[Dates]',
        bullets: [],
      },
    ],
    skills: [
      { category: 'Product', items: ['User Research', 'Figma', 'Information Architecture', 'A/B Testing', 'Funnel Analysis', 'UX Writing'] },
      { category: 'Technical', items: ['React', 'TypeScript', 'Python', 'SQL'] },
      { category: 'AI / ML', items: ['LLM Integration', 'RAG Pipelines', 'Prompt Engineering', 'Structured Outputs'] },
    ],
    education: [
      {
        degree: 'M.S. Biostatistics',
        school: 'UC San Diego',
        dates: '2023 – 2025 (Expected)',
      },
      {
        degree: '[Your Bachelor\'s Degree]',
        school: '[Your University]',
        dates: '[Dates]',
      },
    ],
    contact: {
      email: 'j2shao@ucsd.edu',
      github: 'Amber1234568',
      linkedin: 'LinkedIn (coming soon)',
      note: 'Open to AI PM internship opportunities. Feel free to reach out.',
    },
    projects: {
      daplink: {
        title: 'SupStat / DaplinkDemo',
        subtitle: 'AI workflow · dental clinic valuation automation',
        oneLiner: 'Automated dental clinic valuation: structured inputs → one-click report → grounded chatbot Q&A.',
        tags: ['AI Product', 'Workflow Automation', 'RAG', 'Full-stack'],
        bullets: [
          'Designed and built the full 3-stage pipeline as both PM and engineer',
          'Deterministic JSON transformation makes the pipeline auditable and LLM-context-efficient',
          'RAG-grounded chatbot keeps answers bounded to the generated report',
        ],
        background:
          'SupStat helps buyers and brokers evaluate dental clinic acquisitions. The existing process was entirely manual—analysts spent days compiling financial and operational data into valuation reports, and clients had no easy way to explore or question the results.',
        problem:
          'The workflow had three pain points: (1) data compilation was slow and error-prone, (2) report generation was inconsistent across analysts, and (3) clients needed to schedule another meeting just to ask follow-up questions. The goal was to compress this cycle without sacrificing auditability.',
        role: 'PM + AI App Engineer',
        tools: ['Python', 'OpenAI API', 'RAG', 'React', 'FastAPI', 'Structured JSON'],
        solution: [
          {
            step: '1',
            title: 'Deterministic data transformation → Structured JSON',
            body: 'All clinic financial and operational inputs are transformed deterministically—no LLM involved at this stage—into a typed JSON schema. This ensures every number is traceable to its source, reduces LLM context size significantly, and makes the pipeline predictable and debuggable. Auditability was a hard requirement for this domain.',
          },
          {
            step: '2',
            title: 'One-click report generation with valuation logic + RAG',
            body: 'The structured JSON feeds into a report generation layer that applies domain valuation logic (EBITDA multiples, risk adjustments, comparable transactions) and retrieves relevant market benchmarks via RAG. Non-technical users—brokers, buyers—get a complete valuation report in one click. No spreadsheet expertise required.',
          },
          {
            step: '3',
            title: 'Grounded chatbot with bounded answers',
            body: "A chatbot grounded in the generated report and the source JSON lets clients ask follow-up questions without scheduling a call. Prompt boundaries prevent hallucination beyond the report's scope. Structured tables and visuals are returned where applicable. On the roadmap: natural-language-driven report edits directly through chat.",
          },
        ],
        artifacts: [
          { label: 'Pipeline architecture', file: 'images/daplink-pipeline.png' },
          { label: 'Structured JSON example', file: 'images/daplink-json.png' },
        ],
        nextSteps: [
          'NL-driven report edits via chatbot',
          'Confidence scoring on RAG-retrieved benchmark data',
          'Multi-clinic comparison view',
          'Branded PDF export',
        ],
        links: [{ label: 'GitHub', url: 'https://github.com/Amber1234568/DaplinkDemo' }],
        githubUrl: 'https://github.com/Amber1234568/DaplinkDemo',
      },
      adhd: {
        title: 'ADHD Focus Companion',
        subtitle: 'UX design · coded prototype · wellbeing',
        oneLiner: 'A kinder focus loop for ADHD: easier start, supportive re-entry, reflective insights.',
        tags: ['UX Design', 'Accessibility', 'Coded Prototype'],
        bullets: [
          'Guided micro-step templates lower the activation barrier for starting tasks',
          'Re-entry flow celebrates returning from distraction instead of punishing it',
          'Fully personalizable: edit steps, timing, sounds; save custom routines',
        ],
        background:
          'Most focus apps are built for neurotypical users. Pomodoro-style timers treat distraction as failure and offer no support for getting back on track. For people with ADHD, the real challenge is rarely sustaining focus—it\'s starting and re-entering.',
        problem:
          "The activation barrier—that paralysis before starting a task—is underserved. And when distraction happens, conventional apps make users feel like they've failed, increasing the chance they abandon the session entirely.",
        role: 'Solo product designer + prototype developer',
        tools: ['React', 'TypeScript', 'Figma'],
        solution: [
          {
            step: '1',
            title: 'Reducing activation friction: guided companion templates',
            body: "Instead of a blank 'Start timer' button, users pick a task type and receive a guided micro-step sequence. Breaking 'write report' into 'open doc → read last paragraph → write one sentence' dramatically lowers the cognitive barrier to start. Templates are built-in but fully editable.",
          },
          {
            step: '2',
            title: 'Kind re-entry: celebrate returns, not streaks',
            body: 'When focus breaks, the app asks "What pulled you away?" without judgment—tracking distraction reasons as data, not shame. Returning to focus triggers a small warm celebration. Over time, the pattern of distractions becomes an insight, not a record of failures.',
          },
          {
            step: '3',
            title: 'Personalization: editable steps, timing, and sounds',
            body: 'ADHD is heterogeneous. What works for one person may not work for another. Users can edit every micro-step, adjust timing, choose ambient sounds, and save named routines. The app adapts to the person, not the other way around.',
          },
        ],
        artifacts: [
          { label: 'Focus flow diagram', file: 'images/adhd-flow.png' },
          { label: 'Focus session screen', file: 'images/adhd-screen-focus.png' },
          { label: 'Re-entry screen', file: 'images/adhd-screen-reentry.png' },
        ],
        nextSteps: [
          'Usability testing with 5 ADHD participants',
          'Distraction insight dashboard with weekly patterns',
          'Calendar integration to auto-suggest focus windows',
          'Therapist/coach sharing mode',
        ],
        links: [],
      },
      studypal: {
        title: 'StudyPal',
        subtitle: 'UX research · Figma · information architecture',
        oneLiner: 'A study/work-spot discovery app built from research to paper prototype to Figma.',
        tags: ['UX Research', 'Figma', 'Information Architecture'],
        bullets: [
          'Research-defined rating dimensions specific to study/work needs (noise, outlets, lighting, seating)',
          'Filter IA built around task types, not generic "ambiance" categories',
          'Community layer for study buddy matching drives retention',
        ],
        background:
          "Knowledge workers and students pick study spots constantly, but existing apps—Yelp, Google Maps—treat cafes and libraries like restaurants. Their ratings capture vibe and food quality, not the things that actually matter for focused work.",
        problem:
          'There was no way to reliably filter locations by outlet density, noise level, lighting quality, or seating availability. Users relied on word-of-mouth or wasted trips. The opportunity was to build a discovery layer designed specifically around study and work tasks.',
        role: 'UX Researcher + Designer',
        tools: ['Figma', 'User Interviews', 'Affinity Mapping', 'Paper Prototyping'],
        solution: [
          {
            step: '1',
            title: 'Research-driven rating dimensions',
            body: 'Conducted user interviews and surveys to identify what attributes actually matter when choosing a place to study or work. Consolidated findings into 6 task-specific dimensions: noise level, outlet density, lighting quality, seating comfort, Wi-Fi reliability, and peak-hours occupancy. These became the rating schema.',
          },
          {
            step: '2',
            title: 'Filter system designed around task types, not attributes',
            body: "The filter IA is organized around what you're trying to do: 'Deep work,' 'Group study,' 'Quick call,' 'Casual reading.' Each preset activates the relevant subset of filters automatically. Users don't browse attributes—they browse tasks. The cognitive load is lower and the results are more relevant.",
          },
          {
            step: '3',
            title: 'Community: study buddy matching',
            body: 'A lightweight community layer lets users share their current spot and study goal. Matching by goal type, subject, and schedule creates serendipitous co-study sessions. This adds a retention mechanic that generic location apps lack and makes the app feel alive.',
          },
        ],
        artifacts: [
          { label: 'Figma prototype frames', file: 'images/studypal-frames.png' },
        ],
        nextSteps: [
          'Usability testing with students and remote workers',
          'Live data via Yelp/Google Places API',
          'Occupancy heatmap from crowdsourced check-ins',
          'Study buddy scheduling + in-app messaging',
        ],
        links: [
          {
            label: 'Figma',
            url: 'https://www.figma.com/design/wvP7GMV3Z0voaZxr0rIL1z/%E5%BE%88%E7%89%9B%E7%9A%84project?node-id=0-1&t=3Wt1kPQChsqXsWnQ-1',
          },
        ],
        figmaUrl:
          'https://www.figma.com/design/wvP7GMV3Z0voaZxr0rIL1z/%E5%BE%88%E7%89%9B%E7%9A%84project?node-id=0-1&t=3Wt1kPQChsqXsWnQ-1',
      },
    },
  },

  zh: {
    name: '邵竞澄 (Amber)',
    role: 'AI 产品 / PM 实习生',
    availability: '可接受实习 · 每周 4+ 天 · 支持中国时区',
    nav: {
      langToggleEn: '中文',
      langToggleZh: 'English',
    },
    work: {
      title: '作品集',
      subtitle: '我的经历与作品概览',
      resume: '简历',
      email: '邮件',
      viewCase: '查看案例',
      viewGitHub: 'GitHub ↗',
      viewFigma: 'Figma ↗',
      comingSoon: 'GitHub（即将上线）',
      sections: {
        bio: '简介',
        experience: '经历',
        projects: '项目',
        skills: '技能',
        education: '教育',
        contact: '联系',
      },
    },
    bio: '我目前在加州大学圣地亚哥分校（UCSD）读生物统计硕士，背景是数据与产品。我喜欢把真实世界里繁琐的流程拆解成更易用的产品体验——尤其是 AI 工具，在这里引导、信任感和失败兜底直接决定了产品能否被真正采用。我能用 Figma 和代码快速出原型。',
    experience: [
      {
        role: 'AI 产品 / PM 实习生',
        company: 'SupStat',
        location: '远程',
        dates: '2024 – 至今',
        bullets: [
          '以 PM + 工程师身份，设计并交付了面向牙科诊所并购的三段式 AI 估值 pipeline——从数据接入、一键报告到有依据的 Chatbot 追问。',
          '负责完整产品链路：问题定义、UX 流程、数据转换层、RAG 集成与前端实现。',
        ],
      },
      {
        role: '[上一段经历]',
        company: '[公司]',
        location: '[地点]',
        dates: '[日期]',
        bullets: [],
      },
    ],
    skills: [
      { category: '产品', items: ['用户调研', 'Figma', '信息架构', 'A/B 测试', '漏斗分析', 'UX 文案'] },
      { category: '技术', items: ['React', 'TypeScript', 'Python', 'SQL'] },
      { category: 'AI / ML', items: ['LLM 集成', 'RAG Pipeline', 'Prompt 工程', '结构化输出'] },
    ],
    education: [
      {
        degree: '生物统计硕士（M.S. Biostatistics）',
        school: '加州大学圣地亚哥分校（UCSD）',
        dates: '2023 – 2025（预计）',
      },
      {
        degree: '[本科学位]',
        school: '[学校]',
        dates: '[日期]',
      },
    ],
    contact: {
      email: 'j2shao@ucsd.edu',
      github: 'Amber1234568',
      linkedin: 'LinkedIn（待更新）',
      note: '欢迎 AI PM 实习相关机会，随时联系。',
    },
    projects: {
      daplink: {
        title: 'SupStat / DaplinkDemo',
        subtitle: 'AI 工作流 · 牙科诊所估值自动化',
        oneLiner: '将牙科诊所估值拆成：结构化数据 → 一键生成报告 → 可追问的 Chatbot。',
        tags: ['AI 产品', '流程自动化', 'RAG', '全栈'],
        bullets: [
          '以 PM + 工程师身份，设计并实现完整三段式 pipeline',
          '确定性 JSON 转换让 pipeline 可审计、降低 LLM 上下文消耗',
          'RAG 接地的 Chatbot 将回答边界限制在已生成的报告范围内',
        ],
        background:
          'SupStat 帮助买方和经纪人评估牙科诊所并购价值。原有流程完全人工——分析师需花数天整理财务与运营数据，客户如有疑问只能预约下次会议。',
        problem:
          '流程存在三个痛点：（1）数据整理耗时且容易出错；（2）不同分析师出具的报告质量参差不齐；（3）客户追问只能靠约会议解决。目标是在不牺牲可审计性的前提下压缩这一周期。',
        role: 'PM + AI 工程师',
        tools: ['Python', 'OpenAI API', 'RAG', 'React', 'FastAPI', '结构化 JSON'],
        solution: [
          {
            step: '1',
            title: '确定性数据转换 → 结构化 JSON',
            body: '所有诊所财务与运营输入经确定性逻辑（无 LLM 参与）转换为有类型约束的 JSON Schema。每个数字都可溯源，LLM 上下文大幅缩减，pipeline 可预测且易调试。在这个领域，可审计性是硬性需求。',
          },
          {
            step: '2',
            title: '一键报告生成（估值逻辑 + RAG）',
            body: '结构化 JSON 进入报告生成层，结合领域估值逻辑（EBITDA 倍数、风险调整、可比交易）并通过 RAG 检索市场基准数据。经纪人、买方等非技术用户一键获得完整估值报告，无需任何电子表格技能。',
          },
          {
            step: '3',
            title: '基于报告的 Chatbot（有边界的回答）',
            body: 'Chatbot 基于已生成的报告和源 JSON 回答追问，无需预约会议。Prompt 边界防止回答超出报告范围。结构化表格和图表按需返回。路线图：通过对话直接驱动报告修改。',
          },
        ],
        artifacts: [
          { label: 'Pipeline 架构图', file: 'images/daplink-pipeline.png' },
          { label: '结构化 JSON 示例', file: 'images/daplink-json.png' },
        ],
        nextSteps: [
          '自然语言驱动报告修改',
          'RAG 检索数据可信度评分',
          '多诊所横向对比视图',
          '品牌 PDF 导出',
        ],
        links: [{ label: 'GitHub', url: 'https://github.com/Amber1234568/DaplinkDemo' }],
        githubUrl: 'https://github.com/Amber1234568/DaplinkDemo',
      },
      adhd: {
        title: 'ADHD 专注伴侣',
        subtitle: 'UX 设计 · 代码原型 · 健康',
        oneLiner: '为 ADHD 用户设计：更易启动、温和拉回、可复盘的专注闭环。',
        tags: ['UX 设计', '无障碍', '代码原型'],
        bullets: [
          '引导式微步骤模板降低任务启动的认知门槛',
          '重新投入流程庆祝"回来"而非惩罚分心',
          '完全个性化：可编辑步骤、时间、声音，可保存自定义流程',
        ],
        background:
          '大多数专注应用针对神经典型用户设计。番茄钟式计时器把分心视为失败，不提供任何拉回支持。对 ADHD 用户而言，真正的挑战往往不是"维持"专注，而是"开始"和"重新投入"。',
        problem:
          '启动阻力——那种在开始任务前的瘫痪感——几乎没有产品在认真解决。而当分心发生时，传统应用让用户感到失败，反而增大了放弃整个专注任务的概率。',
        role: '独立产品设计师 + 原型开发者',
        tools: ['React', 'TypeScript', 'Figma'],
        solution: [
          {
            step: '1',
            title: '降低启动阻力：引导式伴侣模板',
            body: '不是一个冷冰冰的「开始计时」按钮，而是让用户选择任务类型，获得分步引导序列。将「写报告」拆成「打开文档 → 读最后一段 → 写一句话」，大幅降低认知启动门槛。模板内置但完全可编辑。',
          },
          {
            step: '2',
            title: '温和拉回：庆祝回来，而非坚持连击',
            body: '专注中断时，应用无评判地询问"什么打扰了你？"——把分心原因作为数据而非罪感记录下来。重新投入时触发一个小小的温暖庆祝。分心规律随时间积累，成为洞察，而不是失败记录。',
          },
          {
            step: '3',
            title: '个性化：可编辑步骤、时间与声音',
            body: 'ADHD 是个体化的，适合一个人的方式不一定适合另一个人。用户可以编辑每一个微步骤、调整时间设置、选择背景音效并保存命名流程。应用适应人，而不是人适应应用。',
          },
        ],
        artifacts: [
          { label: '专注流程图', file: 'images/adhd-flow.png' },
          { label: '专注界面', file: 'images/adhd-screen-focus.png' },
          { label: '重新投入界面', file: 'images/adhd-screen-reentry.png' },
        ],
        nextSteps: [
          '与 5 名 ADHD 用户进行可用性测试',
          '分心洞察看板（周维度规律）',
          '日历集成，自动建议专注时段',
          '治疗师/教练共享模式',
        ],
        links: [],
      },
      studypal: {
        title: 'StudyPal',
        subtitle: 'UX 研究 · Figma · 信息架构',
        oneLiner: '从调研到纸面原型再到 Figma：面向学习/工作场景的地点发现体验。',
        tags: ['用户研究', 'Figma', '信息架构'],
        bullets: [
          '调研驱动的评分维度，专为学习/工作需求设计（噪音、插座、照明、座位）',
          '筛选信息架构围绕任务类型而非泛化"氛围"标签构建',
          '学习伙伴匹配的社区层提升留存',
        ],
        background:
          '知识工作者和学生频繁选择学习场所，但现有应用——大众点评、Google Maps——把咖啡馆和图书馆当餐厅评价。它们的评分维度抓住的是"氛围"和食物质量，而不是专注工作真正需要的东西。',
        problem:
          '没有办法可靠地按插座密度、噪音等级、照明质量或座位情况筛选地点。用户只能靠口耳相传或白跑一趟。机会在于构建一个专门针对学习和工作任务设计的发现层。',
        role: 'UX 研究员 + 设计师',
        tools: ['Figma', '用户访谈', '亲和图分析', '纸面原型'],
        solution: [
          {
            step: '1',
            title: '基于研究的评分维度',
            body: '通过用户访谈和问卷，明确选择学习/工作场所时真正重要的属性。将发现整合为 6 个任务专属维度：噪音等级、插座密度、照明质量、座位舒适度、Wi-Fi 可靠性和高峰时段上座率。这些成为评分 Schema。',
          },
          {
            step: '2',
            title: '围绕任务类型设计的筛选系统',
            body: '筛选信息架构围绕你要做的事组织："深度工作""小组学习""快速通话""随意阅读"。每种预设自动激活相关筛选项。用户不再浏览属性——而是浏览任务。认知负担更低，结果更精准。',
          },
          {
            step: '3',
            title: '社区：学习伙伴匹配',
            body: '轻量社区层允许用户分享当前所在地点和学习目标。按目标类型、学科和时间匹配，创造偶发的共同学习机会。这增加了一个通用地点应用所缺少的留存机制，让应用感觉活着。',
          },
        ],
        artifacts: [
          { label: 'Figma 原型帧', file: 'images/studypal-frames.png' },
        ],
        nextSteps: [
          '与目标用户（学生、远程工作者）进行可用性测试',
          '接入 Yelp/Google Places API 获取实时数据',
          '基于众包打卡的上座率热力图',
          '学习伙伴排期 + 应用内消息',
        ],
        links: [
          {
            label: 'Figma',
            url: 'https://www.figma.com/design/wvP7GMV3Z0voaZxr0rIL1z/%E5%BE%88%E7%89%9B%E7%9A%84project?node-id=0-1&t=3Wt1kPQChsqXsWnQ-1',
          },
        ],
        figmaUrl:
          'https://www.figma.com/design/wvP7GMV3Z0voaZxr0rIL1z/%E5%BE%88%E7%89%9B%E7%9A%84project?node-id=0-1&t=3Wt1kPQChsqXsWnQ-1',
      },
    },
  },
};
