import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { SVGProps } from 'react';

export type LogoProps = SVGProps<SVGSVGElement> &
  StyleProps<typeof logoStyles> & {
    height?: number;
    width?: number;
    variant: keyof typeof logoProps;
    mode?: keyof Theme['colorModes']['modes'];
  };

const logoStyles = variance.compose(
  system.layout,
  system.positioning,
  system.space
);

const logoProps = {
  default: { viewBox: '0 0 285 60' },
  pro: { viewBox: '0 0 139 21.705' },
  mini: { viewBox: '0 0 28 22' },
};

const accent = {
  light: 'hyper',
  dark: 'white',
} as const;

const Svg = styled('svg', styledConfig)<Omit<LogoProps, 'variant'>>(
  system.css({ textColor: 'text' }),
  logoStyles
);

export const Logo = ({
  variant = 'default',
  height = 30,
  mode,
  ...props
}: LogoProps) => {
  const {
    colors,
    colorModes: { active },
  } = useTheme();
  const svgProps = logoProps[variant];

  return (
    <Svg
      mode={mode ?? active}
      height={height}
      {...svgProps}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'default' && (
        <g fill="currentColor" fillRule="evenodd">
          <path
            fill="currentColor"
            d="M11.778 41.177C11.24 39.624 11 37.652 11 35.024c0-2.63.24-4.6.778-6.154C13.213 24.45 16.98 22 21.945 22c3.708 0 6.58 1.494 8.553 3.883a.49.49 0 0 1-.06.717l-3.23 2.868c-.24.18-.538.18-.717-.12-1.255-1.374-2.51-2.15-4.544-2.15-2.212 0-3.887 1.075-4.605 3.226-.36 1.254-.48 2.688-.48 4.6 0 1.91.12 3.405.54 4.66.72 2.09 2.393 3.226 4.606 3.226 2.033 0 3.35-.777 4.546-2.15.18-.24.48-.24.718-.06l3.23 2.867c.24.18.18.478.06.717-1.974 2.33-4.845 3.823-8.553 3.823-4.964-.06-8.792-2.45-10.227-6.93m110.998 0c-.538-1.553-.778-3.525-.778-6.153 0-2.63.24-4.6.778-6.154 1.435-4.42 5.203-6.87 10.167-6.87 3.708 0 6.64 1.494 8.553 3.883a.49.49 0 0 1-.06.717l-3.23 2.868c-.24.18-.538.18-.717-.12-1.255-1.374-2.51-2.15-4.544-2.15-2.212 0-3.887 1.075-4.605 3.226-.417 1.254-.54 2.688-.54 4.6 0 1.91.123 3.405.54 4.66.72 2.09 2.394 3.226 4.606 3.226 2.033 0 3.35-.777 4.546-2.15.18-.24.48-.24.718-.06l3.23 2.867c.24.18.18.478.06.717-1.974 2.33-4.845 3.823-8.553 3.823-4.964-.06-8.732-2.45-10.167-6.93m130.14 6.273c-.298 0-.537-.18-.537-.538V32.574c0-3.226-1.615-5.436-4.665-5.436-2.99 0-4.725 2.21-4.725 5.436v14.338c0 .3-.18.538-.538.538h-4.725c-.3 0-.538-.18-.538-.538V32.574c0-3.226-1.615-5.436-4.666-5.436-2.99 0-4.725 2.21-4.725 5.436v14.338c0 .3-.177.538-.536.538h-4.725c-.3 0-.54-.18-.54-.538V23.075c0-.298.18-.537.54-.537h4.724c.3 0 .538.18.538.537v1.793h.06c1.078-1.553 3.23-2.868 6.52-2.868 2.93 0 5.264 1.195 6.76 3.286h.06c1.912-2.09 4.365-3.286 7.893-3.286 5.742 0 8.972 3.943 8.972 9.26v15.712c0 .3-.18.538-.54.538l-4.604-.06zm11.82 8.782c-.3 0-.54-.18-.54-.538v-4.122c0-.3.18-.537.54-.537h.897c1.974 0 2.93-.897 3.708-2.928l.718-2.09-9.032-23.48c-.117-.298.12-.537.42-.537h5.085c.3 0 .538.18.598.538l5.562 16.25h.12l5.323-16.25c.12-.3.3-.538.597-.538h4.845c.298 0 .538.18.418.538l-9.33 25.987c-2.153 5.914-4.187 7.767-8.313 7.767l-1.615-.06zM49.67 39.622c.42-1.313.538-2.51.538-4.6s-.12-3.225-.538-4.6c-.718-2.09-2.333-3.225-4.605-3.225-2.273 0-3.947 1.195-4.665 3.226-.42 1.314-.54 2.45-.54 4.6 0 2.09.12 3.286.54 4.6.718 2.09 2.333 3.227 4.665 3.227 2.272.06 3.887-1.136 4.605-3.227m-14.832 1.553C34.3 39.444 34 37.772 34 35.023c0-2.748.24-4.36.838-6.153C36.213 24.51 39.98 22 45.005 22c4.964 0 8.732 2.51 10.107 6.87.54 1.732.838 3.405.838 6.153 0 2.75-.24 4.36-.838 6.153-1.375 4.36-5.143 6.87-10.107 6.87-4.964 0-8.732-2.51-10.167-6.87M155.288 22c-4.068 0-6.76.956-8.733 2.45-.18.18-.24.418-.12.656l1.914 3.406c.177.238.477.298.715.12 1.197-.956 2.87-1.733 5.622-1.733 4.008 0 5.384 1.192 5.503 3.88v8.305c0 2.867-1.973 4.24-5.502 4.24-2.75 0-4.245-1.014-4.245-3.105 0-2.33 1.614-3.345 5.322-3.345h1.137c.298 0 .538-.18.538-.537v-3.286c0-.298-.18-.538-.538-.538h-2.034c-6.1 0-9.868 2.51-9.868 7.886 0 5.197 3.768 7.588 8.313 7.588 3.47 0 5.8-1.195 6.938-2.868h.06v1.792c0 .3.18.538.54.538h4.306c.3 0 .54-.18.54-.538v-16.19C165.572 24.63 162.82 22 155.286 22M94.732 32.514c-.12 0-.24.06-.24.24v3.883c0 .12.06.24.24.24h12.68c.358 0 .538-.18.538-.538 0-4.004-.24-5.736-.838-7.47-1.376-4.24-5.084-6.87-10.168-6.87-4.904 0-8.73 2.51-10.107 6.87C86.3 30.485 86 32.455 86 35.025c0 2.568.36 4.48.897 6.093 1.376 4.36 5.084 6.93 10.287 6.93 4.545 0 8.014-1.733 10.167-4.24.18-.24.18-.54-.06-.718l-2.99-2.69c-.237-.18-.536-.18-.775.12-1.256 1.373-2.99 2.39-5.802 2.39-2.75 0-4.725-1.316-5.502-3.765-.12-.36-.24-.717-.3-1.076a20.057 20.057 0 0 1-.297-3.585c.06-1.434.12-2.33.3-3.465v-.12c.06-.297.118-.536.178-.775.66-2.032 2.513-3.226 4.845-3.226 2.333 0 4.128 1.192 4.785 3.224a7.01 7.01 0 0 1 .298 2.09c0 .18-.12.3-.3.3h-6.995zM81.232 12h-4.725c-.3 0-.538.18-.538.538v23.478c-.06 1.434-.24 2.39-.48 3.226-.66 2.09-2.273 3.167-4.606 3.167-2.273 0-3.888-1.138-4.545-3.17-.36-1.134-.54-2.39-.54-4.66s.18-3.524.54-4.66c.656-2.03 2.21-3.165 4.425-3.225H72.8c.118 0 .178-.12.178-.238v-4.72c0-.12-.06-.18-.18-.24H69.27c-4.126.06-7.117 2.032-8.373 5.975-.598 1.912-.897 3.644-.897 6.99 0 3.345.24 5.078.897 6.99 1.256 4.002 4.366 5.974 8.553 5.974 3.35 0 5.382-1.255 6.52-2.928h.06v1.85c0 .3.178.54.537.54h4.725c.3 0 .538-.18.538-.54V12.3c-.06-.12-.3-.298-.598-.298m123.5 20.512c-.12 0-.24.06-.24.24v3.883c0 .12.06.24.24.24h12.68c.358 0 .538-.18.538-.538 0-4.004-.24-5.736-.838-7.47-1.376-4.24-5.084-6.87-10.168-6.87-4.904 0-8.73 2.51-10.107 6.87-.538 1.615-.837 3.585-.837 6.155 0 2.568.36 4.48.897 6.093 1.376 4.36 5.084 6.93 10.287 6.93 4.545 0 8.014-1.733 10.167-4.24.18-.24.18-.54-.06-.718l-2.987-2.69c-.24-.18-.54-.18-.778.12-1.256 1.374-2.99 2.39-5.802 2.39-2.75 0-4.725-1.315-5.502-3.764-.12-.36-.24-.717-.3-1.076a20.045 20.045 0 0 1-.297-3.584c.06-1.434.12-2.33.3-3.465v-.12c.06-.296.118-.535.178-.774.66-2.032 2.513-3.226 4.845-3.226 2.333 0 4.128 1.193 4.785 3.225a7.01 7.01 0 0 1 .298 2.09c0 .18-.12.3-.3.3h-6.995zM191.232 12h-4.725c-.3 0-.538.18-.538.538v23.538c-.06 1.433-.24 2.39-.48 3.226-.66 2.09-2.273 3.226-4.606 3.226-2.333 0-3.888-1.136-4.545-3.226-.36-1.135-.54-2.39-.54-4.66s.18-3.525.54-4.66c.656-2.03 2.21-3.167 4.425-3.226h2.033c.298 0 .537-.18.537-.538v-4.122c0-.3-.18-.538-.538-.538h-3.47c-4.127.06-7.177 2.032-8.433 5.974-.598 1.912-.897 3.645-.897 7.05 0 3.346.24 5.138.897 7.05 1.256 4.002 4.366 5.974 8.553 5.974 3.35 0 5.382-1.255 6.58-2.927h.058v1.85c0 .3.18.537.538.537h4.725c.3 0 .54-.18.54-.538V12.477c-.12-.3-.36-.478-.658-.478M123 55v4c0 .752.175 1 1 1h16c.767 0 1-.186 1-1v-4c0-.752-.175-1-1-1h-17c.175 0 0 .186 0 1"
          />
          <path
            fill="currentColor"
            d="M6.99 54H6c.12-.06 0-.238 0 0V6c0 .238.12.06 0 0h107c-.12.06 0 .238 0 0v47c0 .703-.12.88 0 1H6.99zM119 0c-.12.18-.12.12 0 0-.12.12-.12.12 0 0-.24.06-.36 0-1 0H0c.12.12 0 .3 0 1v59c0-.3.06-.18 0 0h118c.64 0 .76-.06 1 0-.06-.24 0-.36 0-1V0z"
          />
        </g>
      )}
      {variant === 'pro' && (
        <g fill="none" fillRule="nonzero">
          <path
            fill="currentColor"
            d="M4.213 14.896c-.192-.562-.278-1.275-.278-2.226 0-.95.086-1.664.278-2.226.513-1.599 1.86-2.485 3.637-2.485 1.326 0 2.353.54 3.06 1.404a.18.18 0 01-.022.26L9.732 10.66c-.086.066-.192.066-.256-.043-.45-.497-.9-.778-1.626-.778-.792 0-1.39.39-1.648 1.167-.128.454-.17.973-.17 1.664 0 .692.042 1.232.192 1.686.257.756.856 1.167 1.647 1.167.727 0 1.198-.28 1.626-.778.064-.086.171-.086.257-.022l1.155 1.038c.086.065.064.173.022.26-.707.842-1.734 1.382-3.06 1.382-1.775-.021-3.145-.886-3.658-2.507zm39.704 0c-.192-.562-.278-1.275-.278-2.226 0-.95.086-1.664.278-2.226.514-1.599 1.862-2.485 3.637-2.485 1.326 0 2.375.54 3.06 1.404a.18.18 0 01-.022.26l-1.155 1.037c-.086.066-.193.066-.257-.043-.45-.497-.899-.778-1.626-.778-.791 0-1.39.39-1.647 1.167-.15.454-.193.973-.193 1.664 0 .692.043 1.232.193 1.686.257.756.856 1.167 1.647 1.167.727 0 1.198-.28 1.626-.778.064-.086.171-.086.257-.022l1.155 1.038c.086.065.064.173.022.26-.707.842-1.734 1.382-3.06 1.382-1.775-.021-3.123-.886-3.637-2.507zm46.552 2.27c-.107 0-.192-.066-.192-.195v-5.187c0-1.167-.578-1.967-1.67-1.967-1.069 0-1.69.8-1.69 1.967v5.187c0 .108-.064.195-.192.195h-1.69c-.107 0-.192-.066-.192-.195v-5.187c0-1.167-.578-1.967-1.67-1.967-1.069 0-1.69.8-1.69 1.967v5.187c0 .108-.063.195-.192.195h-1.69c-.107 0-.192-.066-.192-.195V8.348c0-.108.064-.195.192-.195h1.69c.107 0 .193.065.193.195v.648h.021c.385-.562 1.155-1.037 2.332-1.037 1.048 0 1.883.432 2.418 1.189h.021c.684-.757 1.562-1.19 2.824-1.19 2.054 0 3.209 1.427 3.209 3.35v5.685c0 .108-.064.194-.193.194l-1.647-.021zm4.228 3.177c-.108 0-.193-.066-.193-.195v-1.491c0-.108.064-.194.193-.194h.32c.707 0 1.048-.325 1.327-1.06l.257-.756-3.231-8.494c-.043-.108.043-.194.15-.194h1.818c.107 0 .193.065.214.194l1.99 5.879h.043l1.904-5.879c.043-.108.107-.194.213-.194h1.733c.108 0 .193.065.15.194l-3.337 9.401c-.77 2.14-1.498 2.81-2.974 2.81l-.577-.021zm-76.93-6.009c.15-.475.192-.908.192-1.664 0-.756-.043-1.167-.192-1.664-.257-.757-.835-1.167-1.647-1.167-.813 0-1.412.432-1.669 1.167-.15.475-.193.886-.193 1.664 0 .756.043 1.189.193 1.664.257.757.835 1.167 1.669 1.167.812.022 1.39-.41 1.647-1.167zm-5.306.562c-.192-.627-.3-1.232-.3-2.226s.087-1.578.3-2.226c.492-1.578 1.84-2.485 3.637-2.485 1.776 0 3.124.907 3.615 2.485.193.627.3 1.232.3 2.226s-.086 1.578-.3 2.226c-.491 1.578-1.84 2.485-3.615 2.485-1.775 0-3.123-.907-3.637-2.485zm43.085-6.937c2.695 0 3.68.95 3.722 3.155v5.857c0 .13-.085.195-.192.195h-1.54c-.13 0-.193-.087-.193-.195v-.648h-.022c-.406.605-1.24 1.037-2.481 1.037-1.626 0-2.974-.865-2.974-2.745 0-1.945 1.348-2.853 3.53-2.853h.728c.128 0 .192.087.192.195v1.189c0 .13-.086.194-.192.194h-.407c-1.327 0-1.904.368-1.904 1.21 0 .757.535 1.124 1.519 1.124 1.262 0 1.968-.497 1.968-1.534v-3.004c-.043-.973-.535-1.405-1.968-1.405-.984 0-1.583.281-2.011.627-.086.064-.193.043-.257-.043l-.685-1.233c-.042-.086-.021-.172.043-.237.706-.54 1.67-.886 3.124-.886zm-21.66 3.803h2.502c.065 0 .108-.043.108-.108 0-.302-.043-.54-.108-.756-.235-.735-.877-1.167-1.711-1.167-.834 0-1.498.432-1.733 1.167-.021.087-.043.173-.064.28v.044c-.064.41-.086.735-.107 1.254-.003.434.033.868.107 1.296.021.13.064.26.107.39.278.885.984 1.361 1.968 1.361 1.006 0 1.626-.367 2.075-.864.086-.109.193-.109.278-.044l1.07.973c.086.065.086.173.021.26-.77.907-2.01 1.534-3.636 1.534-1.862 0-3.188-.93-3.68-2.507-.193-.584-.321-1.276-.321-2.205 0-.93.107-1.642.3-2.226.492-1.577 1.86-2.485 3.615-2.485 1.818 0 3.145.95 3.637 2.485.214.627.3 1.254.3 2.702 0 .13-.065.194-.193.194h-4.536c-.064 0-.085-.043-.085-.086v-1.405c0-.065.043-.087.085-.087zm-4.83-7.42c.107 0 .193.064.214.107v12.319c0 .13-.085.195-.192.195h-1.69c-.128 0-.193-.087-.193-.195v-.67h-.021c-.407.605-1.134 1.06-2.332 1.06-1.498 0-2.61-.714-3.06-2.162-.234-.692-.32-1.319-.32-2.529s.107-1.837.32-2.528c.45-1.427 1.52-2.14 2.996-2.161h1.262c.043.02.064.043.064.086v1.707c0 .044-.021.087-.064.087h-.727c-.792.021-1.348.432-1.583 1.167-.129.41-.193.864-.193 1.685 0 .822.064 1.276.193 1.686.235.735.812 1.146 1.625 1.146.835 0 1.412-.39 1.648-1.146a4.85 4.85 0 00.171-1.167V4.536c0-.13.085-.195.192-.195h1.69zm44.176 7.42h2.503c.064 0 .107-.043.107-.108 0-.302-.043-.54-.107-.756-.235-.735-.877-1.167-1.712-1.167-.834 0-1.497.432-1.732 1.167a5.779 5.779 0 00-.064.28v.044c-.064.41-.086.735-.107 1.254-.003.434.033.868.106 1.296.022.13.065.26.108.39.278.885.984 1.361 1.968 1.361 1.006 0 1.626-.367 2.075-.864.086-.109.193-.109.278-.044l1.07.973c.085.065.085.173.021.26-.77.907-2.011 1.534-3.637 1.534-1.86 0-3.187-.93-3.68-2.507-.192-.584-.32-1.276-.32-2.205 0-.93.107-1.642.3-2.226.491-1.577 1.86-2.485 3.614-2.485 1.819 0 3.145.95 3.638 2.485.213.627.3 1.254.3 2.702 0 .13-.065.194-.193.194h-4.536c-.064 0-.086-.043-.086-.086v-1.405c0-.065.043-.087.086-.087zm-4.829-7.42c.107 0 .193.064.236.172v12.319c0 .13-.086.194-.193.194h-1.69c-.128 0-.192-.086-.192-.194v-.67h-.022c-.428.605-1.155 1.059-2.353 1.059-1.498 0-2.61-.713-3.06-2.161-.235-.692-.32-1.34-.32-2.55 0-1.232.107-1.86.32-2.551.45-1.426 1.54-2.14 3.017-2.161h1.24c.129 0 .193.086.193.194v1.492c0 .13-.085.194-.192.194h-.727c-.792.022-1.349.433-1.584 1.167-.128.41-.192.865-.192 1.686s.064 1.275.192 1.686c.235.756.792 1.167 1.626 1.167.835 0 1.412-.41 1.648-1.167.085-.302.15-.649.17-1.167V4.536c0-.13.086-.195.193-.195h1.69zM50.078 19.534c.295 0 .357.09.357.362v1.447c0 .294-.083.362-.357.362h-5.723c-.296 0-.358-.09-.358-.362v-1.447c0-.295.052-.362.358-.362h5.723zM0 .362C0 .109.043.043 0 0h42.208c.23 0 .272.022.358 0v21.344c0 .231-.021.275 0 .362-.086-.022-.129 0-.358 0H0v-.002l.007-.028c.006-.037-.002-.053-.006-.012L0 21.69V.361zm2.146 19.173H40.42c-.043-.043 0-.107 0-.362V2.171H2.146v17.364z"
          />
          <path
            fill={colors[accent[active]]}
            d="M133.374 7.744c2.639 0 4.758 1.963 4.758 4.706 0 2.743-2.119 4.706-4.758 4.706s-4.758-1.963-4.758-4.706c0-2.743 2.119-4.706 4.758-4.706zm0 7.748c1.716 0 2.873-1.3 2.873-3.042 0-1.742-1.157-3.042-2.873-3.042-1.716 0-2.873 1.3-2.873 3.042 0 1.742 1.157 3.042 2.873 3.042zM124.168 7.9c1.989 0 3.159 1.183 3.159 2.769 0 .858-.351 1.95-1.729 2.496L127.925 17h-2.08l-2.015-3.497h-1.274V17h-1.807V7.9h3.419zm-15.383 0L105.61 17h-2.06l3.176-9.1h2.06zm6.945 0c2.145 0 3.276 1.339 3.276 2.99 0 1.638-1.131 3.029-3.276 3.029h-1.287V17h-1.794V7.9h3.081zm-.273 1.56h-1.014v2.912h1.014c.988 0 1.703-.468 1.703-1.482s-.715-1.43-1.703-1.43zm8.477 0h-1.378v2.47h1.378c1.001 0 1.586-.468 1.586-1.248 0-.806-.585-1.222-1.586-1.222z"
          />
        </g>
      )}
      {variant === 'mini' && (
        <path
          fill="currentColor"
          d="M19.1955 0.043956C19.1955 0.043956 19.1955 0.0659341 19.1955 0.043956C19.2179 0.0879121 19.2402 0.131868 19.2626 0.197802V21.7582C19.2626 21.8242 19.2402 21.8681 19.2179 21.8901C19.1732 21.9341 19.1285 21.956 19.0615 21.956H0.178771C0.134078 21.956 0.0893855 21.956 0.0670391 21.9341C0.0223464 21.8901 0 21.8462 0 21.7802V0.175824C0 0.0879121 0.0446927 0.021978 0.111732 0H19.0615C19.1061 0 19.1732 0.021978 19.1955 0.043956ZM17.095 19.6923V2.28571C17.095 2.1978 17.0503 2.13187 16.9832 2.10989H2.23464C2.1676 2.13187 2.12291 2.1978 2.12291 2.28571V19.6923C2.12291 19.7802 2.1676 19.8462 2.23464 19.8681H16.9832C17.0503 19.8462 17.095 19.7802 17.095 19.6923ZM27.7989 19.8681C27.933 19.8681 28 19.9341 28 20.0659V21.8022C28 21.9341 27.9106 22 27.7989 22H21.2737C21.1397 22 21.0726 21.9121 21.0726 21.8022V20.0659C21.0726 19.9341 21.162 19.8681 21.2737 19.8681H27.7989ZM8.08939 8.08791C9.47486 8.08791 10.5475 8.63736 11.2849 9.51648C11.3296 9.58242 11.352 9.71429 11.2626 9.78022L10.0559 10.8352C9.96648 10.9011 9.85475 10.8791 9.78771 10.7912C9.34078 10.2857 8.84916 10 8.08939 10C7.26257 10 6.63687 10.3956 6.36872 11.1648C6.21229 11.6264 6.1676 12.1538 6.1676 12.8571C6.1676 13.5604 6.21229 14.1099 6.36872 14.5714C6.63687 15.3626 7.26257 15.7582 8.08939 15.7582C8.84916 15.7582 9.31844 15.4725 9.78771 14.967C9.85475 14.8791 9.96648 14.8791 10.0559 14.9451L11.2626 16C11.352 16.0659 11.3296 16.1758 11.2849 16.2637C10.5475 17.1209 9.47486 17.6703 8.08939 17.6703C6.23464 17.6703 4.82682 16.7692 4.2905 15.1429C4.08939 14.5714 4 13.8462 4 12.8791C4 11.9121 4.08939 11.1868 4.2905 10.6154C4.82682 8.98901 6.23464 8.08791 8.08939 8.08791Z"
        />
      )}
    </Svg>
  );
};
