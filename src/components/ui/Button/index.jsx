import classnames from 'classnames';
import styled from 'styled-components';

import Icon from '../Icon';

import Styles from './styles.module.scss';

const StyledButton = styled.button`
  color: ${props => (props.$color)};
  background-color: ${props => (props.$bgColor)};
  &:hover {
    background-color: ${props => (props.$bgColorHover)};
    
    img {
      filter: ${props => (props.$iconColorHover)};
    }
  }
  &:active {
    background-color: ${props => (props.$bgColorActive)};
  }
  img {
    filter: ${props => (props.$iconColor)};
  }
`;

const Button = (
  {
    fullWidth,
    icon,
    children,
    className,
    size,
    color,
    bgColor,
    bgColorHover,
    bgColorActive,
    iconColor,
    iconColorHover,
    type,
    onClick
  }
) => {
  const styleClasses = `size-${size}`;

  return (
    <StyledButton
      $color={color}
      $bgColor={bgColor}
      $bgColorHover={bgColorHover}
      $bgColorActive={bgColorActive}
      $iconColor={iconColor}
      $iconColorHover={iconColorHover}
      className={classnames(Styles.button, className, Styles[styleClasses], {
        [Styles.onlyIcon]: !children,
        [Styles.fullWidth]: fullWidth
      })}
      type={type}
      onClick={onClick}
    >
      {icon && <Icon src={icon} />}
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  fullWidth: false,
  size: 'medium',
  color: '#333',
  bgColor: 'transparent',
  bgColorHover: 'transparent',
  bgColorActive: 'transparent',
  iconColor: 'none',
  iconColorHover: 'none'
};

export default Button;
