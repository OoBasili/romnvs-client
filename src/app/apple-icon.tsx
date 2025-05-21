import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function Icon() {
  const halfSize = size.width / 2;
  const padding = size.width / 8;
  const strokeWidth = (size.width - 2 * padding) / 8;
  const start = strokeWidth / 2 + padding;
  const middle = (halfSize - start) / 2;
  return new ImageResponse(
    (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${size.width} ${size.height}`}
        style={{ backgroundColor: '#ffd43b' }}
      >
        <path
          fill={'none'}
          stroke={'#0f0f0f'}
          stroke-width={strokeWidth}
          stroke-linecap={'round'}
          stroke-linejoin={'round'}
          d={`
            m ${start},${start}
            h ${middle}
            c 0,0 ${middle},0 ${middle},${middle} 0,${middle} -${middle},${middle} -${middle},${middle}
            L ${halfSize},${size.width - start} ${size.width - start},${start}
          `}
        />
      </svg>
    ),
    size
  );
}
