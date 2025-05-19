import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  const padding = size.width / 8;
  const sizeWithoutPadding = size.width - 2 * padding;

  const strokeWidth = sizeWithoutPadding / 8;
  const halfStrokeWidth = strokeWidth / 2;
  const halfSize = sizeWithoutPadding / 2;
  const middle = (halfSize - halfStrokeWidth) / 2;
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          padding,
        }}
      >
        <svg width={size.width} height={size.width} viewBox={`0 0 ${size.width} ${size.width}`}>
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
            L ${halfSize},${sizeWithoutPadding - halfStrokeWidth} ${
              sizeWithoutPadding - halfStrokeWidth
            },${halfStrokeWidth}`}
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
