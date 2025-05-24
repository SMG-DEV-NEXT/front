import * as React from "react";

export const HugeGlow = (props = {}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1100}
    height={550}
    fill="none"
    {...props}
  >
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="80%">
        <stop offset="0%" stopColor="#8B6DCA" stopOpacity="1" />
        <stop offset="60%" stopColor="#8B6DCA" stopOpacity="1" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      <filter
        id="blur"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feGaussianBlur stdDeviation="100" />
      </filter>
    </defs>

    <g filter="url(#blur)">
      <circle cx={550} cy={20} r={220} fill="url(#glow)" />
    </g>
  </svg>
);

export const LeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={160}
    height={468}
    fill="none"
    {...props}
  >
    <g opacity={0.3}>
      <g filter="url(#c)">
        <circle cx={-73.991} cy={234.356} r={86.009} fill="#8B6DCA" />
      </g>
      <g filter="url(#d)">
        <circle cx={-73.991} cy={234.356} r={86.009} fill="#8B6DCA" />
      </g>
    </g>
    <defs>
      <filter
        id="c"
        width={467.202}
        height={467.202}
        x={-307.592}
        y={0.755}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_1162"
          stdDeviation={73.796}
        />
      </filter>
      <filter
        id="d"
        width={467.202}
        height={467.202}
        x={-307.592}
        y={0.755}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_1162"
          stdDeviation={73.796}
        />
      </filter>
    </defs>
  </svg>
);

export const RightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={252}
    height={734}
    fill="none"
    {...props}
  >
    <g filter="url(#g)">
      <circle cx={366.957} cy={366.868} r={135.042} fill="#8B6DCA" />
    </g>
    <g filter="url(#d)">
      <circle cx={366.957} cy={366.868} r={135.042} fill="#8B6DCA" />
    </g>
    <radialGradient id="glow" cx="50%" cy="50%" r="80%">
      <stop offset="0%" stopColor="#8B6DCA" stopOpacity="1" />
      <stop offset="60%" stopColor="#8B6DCA" stopOpacity="1" />
      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
    </radialGradient>
    <defs>
      <filter
        id="g"
        width={733.551}
        height={733.55}
        x={0.182}
        y={0.093}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_1159"
          stdDeviation={115.866}
        />
      </filter>
      <filter
        id="d"
        width={733.551}
        height={733.55}
        x={0.182}
        y={0.093}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_1159"
          stdDeviation={115.866}
        />
      </filter>
    </defs>
  </svg>
);

export const Axyus = ({ wid = 1440 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wid}
      height={748}
      fill="none"
    >
      <mask
        id="b2"
        width={1433}
        height={551}
        x={13}
        y={66}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path fill="url(#a2)" d="M13.534 66.493h1431.61v550.276H13.534z" />
      </mask>
      <g fill="#181A1F" mask="url(#b2)">
        <path d="M15.025-20h1.491v768h-1.491zM64.237-20h1.491v768h-1.491zM113.449-20h1.491v768h-1.491zM162.661-20h1.491v768h-1.491zM211.872-20h1.491v768h-1.491zM261.084-20h1.491v768h-1.491zM310.296-20h1.491v768h-1.491zM359.508-20h1.491v768h-1.491zM408.719-20h1.491v768h-1.491zM457.931-20h1.491v768h-1.491zM507.143-20h1.491v768h-1.491zM556.354-20h1.491v768h-1.491zM605.565-20h1.491v768h-1.491zM654.777-20h1.491v768h-1.491zM703.989-20h1.491v768h-1.491zM753.2-20h1.491v768H753.2zM802.412-20h1.491v768h-1.491zM851.624-20h1.491v768h-1.491zM900.836-20h1.491v768h-1.491zM950.047-20h1.491v768h-1.491zM999.259-20h1.491v768h-1.491zM1048.47-20h1.491v768h-1.491zM1097.68-20h1.491v768h-1.491zM1146.89-20h1.491v768h-1.491zM1196.11-20h1.491v768h-1.491zM1245.32-20h1.491v768h-1.491zM1294.53-20h1.491v768h-1.491zM1343.74-20h1.491v768h-1.491zM1392.95-20h1.491v768h-1.491z" />
        <path d="M-322 94.082V92.59h2102.68v1.49zM-322 143.293v-1.491h2102.68v1.491zM-322 192.505v-1.491h2102.68v1.491zM-322 241.717v-1.491h2102.68v1.491zM-322 290.928v-1.491h2102.68v1.491zM-322 340.14v-1.491h2102.68v1.491zM-322 389.351v-1.491h2102.68v1.491zM-322 438.563v-1.491h2102.68v1.491zM-322 487.775v-1.491h2102.68v1.491zM-322 536.986v-1.491h2102.68v1.491zM-322 586.198v-1.491h2102.68v1.491z" />
      </g>
      <defs>
        <linearGradient
          id="a2"
          x1={1037.66}
          x2={828.509}
          y1={145.903}
          y2={586.571}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.245} stopColor="#D9D9D9" />
          <stop offset={0.562} stopColor="#D9D9D9" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const BottomAxyus = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1440}
      height={768}
      fill="none"
    >
      <mask
        id="b12"
        width={1433}
        height={551}
        x={12}
        y={131}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path
          fill="url(#a12)"
          d="M0 0h1431.61v550.276H0z"
          transform="matrix(1 0 0 -1 12.534 681.507)"
        />
      </mask>
      <g fill="#181A1F" mask="url(#b12)">
        <path d="M14.025 768h1.491V0h-1.49zM63.237 768h1.491V0h-1.49zM112.449 768h1.491V0h-1.491zM161.661 768h1.491V0h-1.491zM210.872 768h1.491V0h-1.491zM260.084 768h1.491V0h-1.491zM309.296 768h1.491V0h-1.491zM358.508 768h1.491V0h-1.491zM407.719 768h1.491V0h-1.491zM456.931 768h1.491V0h-1.491zM506.143 768h1.491V0h-1.491zM555.354 768h1.491V0h-1.491zM604.565 768h1.491V0h-1.491zM653.777 768h1.491V0h-1.491zM702.989 768h1.491V0h-1.491zM752.2 768h1.491V0H752.2zM801.412 768h1.491V0h-1.491zM850.624 768h1.491V0h-1.491zM899.836 768h1.491V0h-1.491zM949.047 768h1.491V0h-1.491zM998.259 768h1.491V0h-1.491zM1047.47 768h1.491V0h-1.491zM1096.68 768h1.491V0h-1.491zM1145.89 768h1.491V0h-1.491zM1195.11 768h1.491V0h-1.491zM1244.32 768h1.491V0h-1.491zM1293.53 768h1.491V0h-1.491zM1342.74 768h1.491V0h-1.491zM1391.95 768h1.491V0h-1.491z" />
        <path d="M-323 653.918v1.491h2102.68v-1.491zM-323 604.707v1.491h2102.68v-1.491zM-323 555.495v1.491h2102.68v-1.491zM-323 506.283v1.491h2102.68v-1.491zM-323 457.072v1.491h2102.68v-1.491zM-323 407.86v1.491h2102.68v-1.491zM-323 358.648v1.491h2102.68v-1.491zM-323 309.437v1.491h2102.68v-1.491zM-323 260.225v1.491h2102.68v-1.491zM-323 211.014v1.491h2102.68v-1.491zM-323 161.802v1.491h2102.68v-1.491z" />
      </g>
      <defs>
        <linearGradient
          id="a12"
          x1={1024.12}
          x2={814.975}
          y1={79.41}
          y2={520.078}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.245} stopColor="#D9D9D9" />
          <stop offset={0.562} stopColor="#D9D9D9" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};
