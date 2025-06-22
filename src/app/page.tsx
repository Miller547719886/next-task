import Avatar from "./components/Avatar";

// Mock post data type
type Post = {
  id: number;
  user: {
    name: string;
    username: string;
    verified?: boolean;
    avatar?: string;
  };
  content: string;
  timestamp: string;
};

// Mock post data
const mockPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "Baye",
      username: "waylybaye",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/512Logo.png"
    },
    content: "越来越认同：\"人类并不是活在国家之中，而是活在语言之中\"这句话。遍全世界，很多人可能也看不到更多的东西。但是语言可以。语言对人是广泛又深远的，能够改变人的世界观和思维方式。",
    timestamp: "Jun 19"
  },
  {
    id: 2,
    user: {
      name: "张三",
      username: "zhangsan",
      verified: false
    },
    content: "今天天气真不错，适合出门散步。🌞 #美好生活",
    timestamp: "2小时前"
  },
  {
    id: 3,
    user: {
      name: "李开发",
      username: "dev_li",
      verified: true,
      avatar: "https://image.sjsys.shijieu.cn/toc-item-bg.png"
    },
    content: "刚刚完成了一个 React 项目的重构，使用了最新的 Next.js 14 特性。性能提升了 40%！💪 \n\n主要优化点：\n- 使用 App Router\n- 图片优化\n- 代码分割",
    timestamp: "4小时前"
  },
  {
    id: 4,
    user: {
      name: "设计师小王",
      username: "designer_wang",
      verified: false
    },
    content: "分享一个设计心得：好的用户界面应该是无形的，用户在使用时不会注意到它的存在，只会专注于完成自己的任务。",
    timestamp: "6小时前"
  },
  {
    id: 5,
    user: {
      name: "产品经理赵某",
      username: "pm_zhao",
      verified: true
    },
    content: "用户调研结果出来了：\n✅ 新功能使用率提升 25%\n✅ 用户满意度 4.8/5\n✅ 留存率增长 15%\n\n数据驱动的产品决策果然有效！📊",
    timestamp: "8小时前"
  },
  {
    id: 6,
    user: {
      name: "前端工程师",
      username: "frontend_dev",
      verified: false,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/512Logo.png"
    },
    content: "刚发现一个超有用的 CSS 技巧：\n\n```css\naspect-ratio: 16/9;\n```\n\n再也不用计算 padding-bottom 了！🎉",
    timestamp: "10小时前"
  },
  {
    id: 7,
    user: {
      name: "创业者老孙",
      username: "entrepreneur_sun",
      verified: true
    },
    content: "创业三年的感悟：技术很重要，但理解用户需求更重要。最好的产品不是功能最多的，而是最能解决用户痛点的。",
    timestamp: "12小时前"
  },
  {
    id: 8,
    user: {
      name: "UI 设计师",
      username: "ui_designer",
      verified: false
    },
    content: "今天学习了无障碍设计原则，发现很多细节都没注意到：\n- 色彩对比度要达到 4.5:1\n- 交互元素最小尺寸 44px\n- 键盘导航支持\n\n设计不仅要美观，更要包容 ♿️",
    timestamp: "1天前"
  },
  {
    id: 9,
    user: {
      name: "技术博主",
      username: "tech_blogger",
      verified: true,
      avatar: "https://image.sjsys.shijieu.cn/toc-item-bg.png"
    },
    content: "写了一篇关于 Next.js 14 图片优化的文章，总结了：\n🔸 remotePatterns 配置\n🔸 next/image 最佳实践\n🔸 性能优化技巧\n🔸 无障碍设计\n\n链接在评论区 👇",
    timestamp: "1天前"
  },
  {
    id: 10,
    user: {
      name: "全栈开发者",
      username: "fullstack_dev",
      verified: false
    },
    content: "刚完成了一个全栈项目：\n- 前端：Next.js + TailwindCSS\n- 后端：Node.js + PostgreSQL\n- 部署：Vercel + Railway\n\n现代 Web 开发栈真是越来越成熟了 🚀",
    timestamp: "2天前"
  },
  {
    id: 11,
    user: {
      name: "数据科学家",
      username: "data_scientist",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "今天用 Python 做了一个有趣的数据分析：\n📊 用户行为模式识别\n🤖 机器学习预测模型\n📈 可视化报告生成\n\n数据真的很有趣！",
    timestamp: "2天前"
  },
  {
    id: 12,
    user: {
      name: "移动端开发",
      username: "mobile_dev",
      verified: false
    },
    content: "Flutter vs React Native 的选择困难症又犯了 😅\n\n各有优势：\n- Flutter: 性能更好，UI一致性\n- RN: 生态成熟，学习成本低\n\n你们怎么选？",
    timestamp: "3天前"
  },
  {
    id: 13,
    user: {
      name: "系统架构师",
      username: "architect",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "分享一个微服务架构的最佳实践：\n🔸 单一职责原则\n🔸 数据库隔离\n🔸 服务间异步通信\n🔸 容错和降级机制\n\n架构设计需要权衡取舍 ⚖️",
    timestamp: "3天前"
  },
  {
    id: 14,
    user: {
      name: "DevOps工程师",
      username: "devops_engineer",
      verified: false
    },
    content: "刚部署了一套 CI/CD 流水线：\n✅ 自动化测试\n✅ 代码质量检查\n✅ 容器化部署\n✅ 监控告警\n\n开发效率提升了一个档次！🚀",
    timestamp: "3天前"
  },
  {
    id: 15,
    user: {
      name: "安全专家",
      username: "security_expert",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "Web安全提醒 🔐：\n- 永远不要相信用户输入\n- 使用HTTPS传输敏感数据\n- 定期更新依赖包\n- 实施最小权限原则\n\n安全无小事！",
    timestamp: "4天前"
  },
  {
    id: 16,
    user: {
      name: "技术写作者",
      username: "tech_writer",
      verified: false
    },
    content: "写技术文档的小技巧：\n📝 用例子说明抽象概念\n🎯 站在读者角度思考\n📚 结构化组织内容\n✨ 适当使用图表和代码\n\n好文档胜过千言万语！",
    timestamp: "4天前"
  },
  {
    id: 17,
    user: {
      name: "AI研究员",
      username: "ai_researcher",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "GPT-4 在代码生成方面的能力真的很强：\n🤖 理解需求准确\n💡 代码质量高\n🔧 支持多种语言\n⚡ 生成速度快\n\nAI辅助编程时代已经到来！",
    timestamp: "4天前"
  },
  {
    id: 18,
    user: {
      name: "开源爱好者",
      username: "opensource_lover",
      verified: false
    },
    content: "刚给一个开源项目提交了PR：\n- 修复了内存泄漏问题\n- 添加了单元测试\n- 更新了文档\n\n开源精神让技术更美好 ❤️",
    timestamp: "5天前"
  },
  {
    id: 19,
    user: {
      name: "性能优化师",
      username: "performance_guru",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "Web性能优化checklist：\n⚡ 图片压缩和懒加载\n🗜️ 代码分割和按需加载\n🚀 CDN和缓存策略\n📱 移动端适配\n\n每1秒的提升都很珍贵！",
    timestamp: "5天前"
  },
  {
    id: 20,
    user: {
      name: "数据库专家",
      username: "db_expert",
      verified: false
    },
    content: "SQL优化经验分享：\n🔍 合理使用索引\n📊 分析执行计划\n🔄 避免N+1查询\n💾 适当的缓存策略\n\n好的查询性能是艺术！",
    timestamp: "5天前"
  },
  {
    id: 21,
    user: {
      name: "云架构师",
      username: "cloud_architect",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "云原生应用设计原则：\n☁️ 容器化部署\n🔄 微服务架构\n📈 弹性伸缩\n🛡️ 故障隔离\n📊 可观测性\n\n云时代的新思维！",
    timestamp: "6天前"
  },
  {
    id: 22,
    user: {
      name: "前端架构师",
      username: "frontend_architect",
      verified: false
    },
    content: "现代前端架构思考：\n🎨 组件化设计\n⚡ 状态管理\n🔧 构建工具链\n📱 响应式设计\n♿ 无障碍支持\n\n用户体验至上！",
    timestamp: "6天前"
  },
  {
    id: 23,
    user: {
      name: "测试工程师",
      username: "qa_engineer",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "自动化测试金字塔：\n🔼 单元测试 (70%)\n🔳 集成测试 (20%)\n🔽 端到端测试 (10%)\n\n质量保障从代码开始！✅",
    timestamp: "6天前"
  },
  {
    id: 24,
    user: {
      name: "区块链开发",
      username: "blockchain_dev",
      verified: false
    },
    content: "智能合约开发心得：\n⛽ Gas费用优化\n🔒 安全审计重要性\n🧪 充分的测试覆盖\n📝 清晰的代码注释\n\nWeb3世界很精彩！",
    timestamp: "1周前"
  },
  {
    id: 25,
    user: {
      name: "游戏开发者",
      username: "game_developer",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "Unity vs Unreal选择指南：\n🎮 Unity: 2D游戏首选，学习曲线平缓\n🎯 Unreal: 3A大作利器，视觉效果惊艳\n\n选择合适的工具很重要！",
    timestamp: "1周前"
  },
  {
    id: 26,
    user: {
      name: "机器学习工程师",
      username: "ml_engineer",
      verified: false
    },
    content: "模型部署的挑战：\n🔄 版本管理\n📊 监控指标\n⚡ 性能优化\n🔧 A/B测试\n\n从实验室到生产环境的距离！",
    timestamp: "1周前"
  },
  {
    id: 27,
    user: {
      name: "技术经理",
      username: "tech_manager",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "团队管理心得：\n👥 倾听团队声音\n🎯 设定明确目标\n🌱 培养成长机会\n⚖️ 平衡技术债务\n\n技术和人的双重挑战！",
    timestamp: "1周前"
  },
  {
    id: 28,
    user: {
      name: "创新产品经理",
      username: "innovation_pm",
      verified: false
    },
    content: "产品创新方法论：\n🎯 用户痛点挖掘\n💡 MVP快速验证\n📊 数据驱动迭代\n🚀 持续价值交付\n\n创新永远在路上！",
    timestamp: "1周前"
  },
  {
    id: 29,
    user: {
      name: "技术顾问",
      username: "tech_consultant",
      verified: true,
      avatar: "https://shijiesys-1256650073.cos.ap-beijing.myqcloud.com/qiniu/0.jpg"
    },
    content: "企业数字化转型建议：\n🏗️ 基础设施现代化\n🔄 业务流程优化\n📱 移动优先策略\n🤖 自动化和AI赋能\n\n变革从技术开始！",
    timestamp: "1周前"
  },
  {
    id: 30,
    user: {
      name: "开发者社区",
      username: "dev_community",
      verified: false
    },
    content: "感谢所有开发者朋友们的分享！💙\n\n这个社区因为大家的贡献而精彩：\n🎓 知识分享\n🤝 互帮互助\n🌟 共同成长\n\n让我们一起打造更美好的技术世界！🌍",
    timestamp: "1周前"
  }
];

/**
 * Post component
 */
const PostItem: React.FC<{ post: Post; isFirst10?: boolean }> = ({ post, isFirst10 = false }) => {
  return (
    <article className="flex gap-3 p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      {/* User avatar */}
      <div className="flex-shrink-0">
        <Avatar
          src={post.user.avatar}
          alt={`${post.user.name}'s avatar`}
          size={48}
          priority={isFirst10} // Prioritize loading avatars for the first 10 posts (within the viewport)
          ariaLabel={`View ${post.user.name}'s profile`}
          quality={90}
        />
      </div>
      
      {/* Post content */}
      <div className="flex-1 min-w-0">
        {/* User info row */}
        <div className="flex items-center gap-1 mb-1">
          <div className="font-bold text-gray-900 text-sm">
            {post.user.name}
          </div>
          {post.user.verified && (
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          <span className="text-gray-500 text-sm">@{post.user.username}</span>
          <span className="text-gray-400 text-sm">·</span>
          <time className="text-gray-500 text-sm">{post.timestamp}</time>
        </div>
        
        {/* Post content */}
        <div className="text-gray-900 text-sm leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </article>
  );
};

/**
 * Home page component - list of user posts
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page title */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Home</h1>
        </div>
      </header>
      
      {/* Post list */}
      <main className="max-w-2xl mx-auto">
        {mockPosts.map((post, index) => (
          <PostItem 
            key={post.id} 
            post={post} 
            isFirst10={index < 10} // Prioritize loading avatars for the first 10 posts (within the viewport)
          />
        ))}
      </main>
    </div>
  );
}
