import { ImageResponse } from 'next/og';

export const size = {
  width: 96,
  height: 96,
};
export const contentType = 'image/png';

export default function Icon() {
  const strokeWidth = size.width / 8;
  const halfSize = size.width / 2;
  const halfStrokeWidth = strokeWidth / 2;
  const middle = (halfSize - halfStrokeWidth) / 2;
  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex' }}>
        <svg width={size.width} height={size.height} viewBox={`0 0 ${size.width} ${size.height}`}>
          <path
            fill={'none'}
            stroke={'#aa1414'}
            stroke-width={strokeWidth}
            stroke-linecap={'round'}
            stroke-linejoin={'round'}
            d={`
              m ${halfStrokeWidth},${halfStrokeWidth}
              h ${middle}
              c 0,0 ${middle},0 ${middle},${middle} 0,${middle} -${middle},${middle} -${middle},${middle}
              L ${halfSize},${size.width - halfStrokeWidth} ${size.width - halfStrokeWidth},${halfStrokeWidth}`}
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
