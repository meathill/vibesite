import { ImageResponse } from 'next/og';

export const alt = 'VibeSite - AI 生成网页一键上线';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        gap: 32,
      }}
    >
      {/* Logo + 品牌名 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: '#DF2321',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect
              x="6.75"
              y="8"
              width="18.5"
              height="16"
              rx="2.5"
              stroke="white"
              strokeWidth="2.5"
            />
            <path d="M 7 12.75 H 25" stroke="white" strokeWidth="2" />
            <path d="M 16 21.5 V 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path
              d="M 12.9 18.6 L 16 15.5 L 19.1 18.6"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span style={{ fontSize: 32, fontWeight: 700, color: '#171717' }}>VibeSite</span>
      </div>

      {/* 标题 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#171717',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          AI 写好了网页，我们帮你上线
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#525252',
            textAlign: 'center',
          }}
        >
          上传 zip · 10 分钟部署 · 免费预览
        </div>
      </div>

      {/* 工具标签 */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {['Cursor', 'Bolt', 'Lovable', 'v0', 'ChatGPT', 'Claude'].map((tool) => (
          <div
            key={tool}
            style={{
              padding: '8px 18px',
              borderRadius: 8,
              background: 'white',
              color: '#404040',
              fontSize: 16,
              fontWeight: 500,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              display: 'flex',
            }}
          >
            {tool}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
