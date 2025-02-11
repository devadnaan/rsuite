import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import Checkbox, { CheckboxProps } from '../Checkbox';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface DropdownMenuCheckItemProps extends WithAsProps {
  active?: boolean;
  checkboxAs?: React.ElementType | string;
  classPrefix?: string;
  disabled?: boolean;
  checkable?: boolean;
  indeterminate?: boolean;
  value?: string | number;
  focus?: boolean;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  onSelect?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onCheck?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onSelectItem?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  renderMenuItemCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;
}

const DropdownMenuCheckItem: RsRefForwardingComponent<'div', DropdownMenuCheckItemProps> =
  React.forwardRef((props: DropdownMenuCheckItemProps, ref) => {
    const {
      active = false,
      as: Component = 'div',
      checkboxAs: CheckboxItem = Checkbox,
      classPrefix = 'check-item',
      checkable = true,
      disabled,
      value,
      focus,
      children,
      className,
      indeterminate,
      onKeyDown,
      onSelect,
      onCheck,
      onSelectItem,
      renderMenuItemCheckbox,
      ...rest
    } = props;

    const handleChange = useCallback(
      (value: any, checked: boolean, event: React.SyntheticEvent) => {
        onSelect?.(value, event, checked);
      },
      [onSelect]
    );

    const handleCheck = useCallback(
      (event: React.SyntheticEvent) => {
        if (!disabled) {
          onCheck?.(value, event, !active);
        }
      },
      [value, disabled, onCheck, active]
    );

    const handleSelectItem = useCallback(
      (event: React.SyntheticEvent) => {
        if (!disabled) {
          onSelectItem?.(value, event, !active);
        }
      },
      [value, disabled, onSelectItem, active]
    );

    const { withClassPrefix } = useClassNames(classPrefix);
    const checkboxItemClasses = withClassPrefix({ focus });

    const checkboxProps: CheckboxProps = {
      value,
      disabled,
      indeterminate,
      checkable,
      children,
      checked: active,
      className: checkboxItemClasses,
      onKeyDown: disabled ? undefined : onKeyDown,
      onChange: handleChange,
      onClick: handleSelectItem,
      onCheckboxClick: handleCheck
    };

    return (
      <Component
        role="option"
        aria-selected={active}
        aria-disabled={disabled}
        data-key={value}
        {...rest}
        ref={ref}
        className={className}
        tabIndex={-1}
      >
        {renderMenuItemCheckbox ? (
          renderMenuItemCheckbox(checkboxProps)
        ) : (
          <CheckboxItem role="checkbox" {...checkboxProps} />
        )}
      </Component>
    );
  });

DropdownMenuCheckItem.displayName = 'DropdownMenuCheckItem';
DropdownMenuCheckItem.propTypes = {
  classPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  checkable: PropTypes.bool,
  indeterminate: PropTypes.bool,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func,
  onSelectItem: PropTypes.func,
  onKeyDown: PropTypes.func,
  focus: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
  checkboxAs: PropTypes.elementType
};

export default DropdownMenuCheckItem;
