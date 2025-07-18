import * as React from 'react';

import { IllustrationProps } from './types';

export const HomeOffice: React.FC<IllustrationProps> = ({
  className,
  height,
  width,
  'aria-hidden': ariaHidden,
}) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    fill="none"
    height={height}
    viewBox="0 0 640 402"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Home Office Illustration</title>
    <mask
      height="295"
      id="a"
      maskUnits="userSpaceOnUse"
      width="219"
      x="348"
      y="0"
    >
      <path
        d="M349.424 293.5c0-3.08.13-190.773.382-193.796a107.866 107.866 0 01215.034.995c.202 2.699.303 190.06.303 192.801H349.424z"
        fill="#fff"
        stroke="#10162F"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </mask>
    <g mask="url(#a)" stroke="#10162F" strokeWidth="2">
      <path
        d="M701.968 339.234c0 92.617-75.081 167.698-167.698 167.698s-167.698-75.081-167.698-167.698 75.081-167.698 167.698-167.698 167.698 75.081 167.698 167.698z"
        fill="url(#pattern0)"
      />
      <path
        d="M517.166 137.097c34.467 0 62.407-27.941 62.407-62.408s-27.94-62.408-62.407-62.408c-34.466 0-62.407 27.941-62.407 62.408s27.941 62.408 62.407 62.408zM380.087 449.498c65.147 0 117.96-52.813 117.96-117.962 0-65.148-52.813-117.962-117.96-117.962-65.148 0-117.961 52.814-117.961 117.962 0 65.149 52.813 117.962 117.961 117.962z"
        strokeMiterlimit="10"
      />
    </g>
    <path
      d="M349.424 293.5c0-3.08.13-190.773.382-193.796a107.866 107.866 0 01215.034.995c.202 2.699.303 190.06.303 192.801H349.424z"
      stroke="#10162F"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="M416.126 361.82l44.529 26.363v10.139H1v-10.139h1.098l44.53-26.363.253-.338V147.709h368.992v213.773l.253.338z"
      fill="#FFF0E5"
      stroke="#10162F"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M404.581 158.259H57.075v194.288H404.58V158.259z"
      fill="#fff"
      stroke="#10162F"
      strokeWidth="2"
    />
    <path
      d="M460.655 388.183H2.099l44.529-26.363h369.498l44.529 26.363z"
      fill="#FFF0E5"
      stroke="#10162F"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M77.915 255.88v51.591H26.324V255.88h51.59zM66.253 186.478v51.591h-51.59v-51.591h51.59z"
      fill="#FFD300"
      stroke="#10162F"
      strokeWidth="2"
    />
    <path
      d="M136.998 217.264l-33.024-14.08v8.576l23.36 9.152-23.36 9.152v8.64l33.024-14.144v-7.296zm38.559 28.48V238h-28.672v7.744h28.672z"
      fill="#1557FF"
    />
    <path
      d="M540.822 341.047h-13.696c.096-7.455-.051-15.046-.199-22.665-.086-4.434-.172-8.879-.211-13.311-.108-12.425.158-24.818 1.836-36.89 4.923-35.435 28.078-73.374 65.876-80.339 8.996-1.658 19.118-.986 27.442 3.07 8.279 4.035 14.834 11.439 16.777 23.423.353 2.176.236 5.648-.251 9.167-.488 3.521-1.324 6.922-2.324 8.979-6.318 12.992-16.478 17.227-28.019 19.824-2.847.641-5.766 1.18-8.734 1.727l-.147.027c-3.012.556-6.072 1.122-9.119 1.812-6.093 1.38-12.181 3.264-17.852 6.596-12.263 7.205-20.557 14.09-25.529 25.803-4.874 11.483-6.504 27.495-5.85 52.777z"
      fill="#AEE938"
      stroke="#10162F"
      strokeWidth="2"
    />
    <path
      d="M616.326 288.252l.981-.19-.981.19c.194.996.136 2.664-.154 4.41-.29 1.745-.781 3.379-1.336 4.331-3.677 6.304-9.735 7.95-16.871 8.77-1.516.175-3.063.31-4.639.448l-.827.073c-1.856.164-3.745.34-5.623.596-3.754.51-7.518 1.339-11.003 3.046-3.747 1.836-6.561 3.78-8.629 6.117-2.079 2.348-3.358 5.041-4.114 8.298-.751 3.235-.988 7.038-.99 11.618-.001 3.624.146 7.782.315 12.576l.102 2.897h-12.776c.044-3.602-.042-7.273-.127-10.946a517.2 517.2 0 01-.127-6.673c-.065-6.244.096-12.443 1.1-18.469 1.474-8.84 5.438-19.491 11.911-27.966 6.465-8.464 15.363-14.676 26.735-14.897 8.094-.158 14.292.886 18.734 3.392 4.382 2.471 7.161 6.425 8.319 12.379zM476.232 227.077c19.333 8.108 29.783 27.528 35.416 49.939 5.529 21.994 6.353 46.612 6.517 65.567h-8.198c-.085-10.28-1.494-22.658-5.445-33.6-4.078-11.291-10.922-21.201-21.968-25.543-4.492-1.766-9.043-2.538-13.475-3.007a202.458 202.458 0 00-5.636-.492c-.309-.024-.616-.047-.923-.072-2.151-.168-4.249-.345-6.294-.613-4.091-.535-7.912-1.428-11.391-3.298-3.465-1.862-6.644-4.721-9.404-9.27-9.965-16.415-1.438-36.529 15.225-41.315 6.627-1.904 11.545-2.078 15.51-1.495 3.776.555 6.735 1.799 9.6 3.004l.466.195z"
      fill="#AEE938"
      stroke="#10162F"
      strokeWidth="2"
    />
    <mask fill="#fff" id="b">
      <path
        clipRule="evenodd"
        d="M497.293 332.191v40.08c0 16.017 12.983 29 29 29h17.881c16.016 0 29-12.983 29-29v-40.08h-75.881z"
        fillRule="evenodd"
      />
    </mask>
    <path
      clipRule="evenodd"
      d="M497.293 332.191v40.08c0 16.017 12.983 29 29 29h17.881c16.016 0 29-12.983 29-29v-40.08h-75.881z"
      fill="#1557FF"
      fillRule="evenodd"
    />
    <path
      d="M497.293 332.191v-2h-2v2h2zm75.881 0h2v-2h-2v2zm-73.881 40.08v-40.08h-4v40.08h4zm27 27c-14.912 0-27-12.088-27-27h-4c0 17.121 13.879 31 31 31v-4zm17.881 0h-17.881v4h17.881v-4zm27-27c0 14.912-12.088 27-27 27v4c17.121 0 31-13.879 31-31h-4zm0-40.08v40.08h4v-40.08h-4zm2-2h-75.881v4h75.881v-4z"
      fill="#10162F"
      mask="url(#b)"
    />
    <defs>
      <pattern
        height=".19"
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width=".19"
      >
        <use transform="scale(.00296)" xlinkHref="#image0" />
      </pattern>
      <image
        height="64"
        id="image0"
        width="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAChSURBVHgB7dgxDoAwDMXQ5P53BoaIARaE2iJa+23p6j81ImKPK9qtk0ugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLK8ikugsryKS6CyvIpLoLI8VN4faOW3gLJ8QOXDjSuPWYLlH+5l5csbV37ZJVj+5b2MbLxx5ZdZguUb72ll5xtXftolWL7zPY0cfOPKT7MEyw++fys/vnHlsb/DFwf+rf4QcSN+5wAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);
