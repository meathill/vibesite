/**
 * VibeSite 品牌图形：浏览器窗口 + 上传箭头，与 app/icon.svg 同源。
 * 仅绘制白色线条部分，颜色继承 currentColor，背景色由外层容器提供（通常是 bg-primary 圆角方块）。
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect
        x="6.75"
        y="8"
        width="18.5"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M 7 12.75 H 25" stroke="currentColor" strokeWidth="2" />
      <path d="M 16 21.5 V 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M 12.9 18.6 L 16 15.5 L 19.1 18.6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
