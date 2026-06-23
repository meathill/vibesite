import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: '#171717',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 700,
      }}
    >
      V
    </div>,
    { ...size },
  );
}
