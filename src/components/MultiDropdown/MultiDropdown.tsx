import React from 'react';
import { cn } from '@bem-react/classname';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';

import './MultiDropdown.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}: MultiDropdownProps) => {
  const cnDropdown = cn('dropdown');
  const classes = cnDropdown({ disabled }, [className]);

  const [isOpened, setIsOpened] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState(
    value.length > 0 ? getTitle(value) : '',
  );

  const handleFocus = () => {
    if (!disabled) {
      setIsOpened(true);
    }

    setFieldValue('');
  };

  /** при нажатии мимо дропдауна закрываем его */
  React.useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        setIsOpened(false);

        if (value.length > 0) {
          setFieldValue(getTitle(value));
        }
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [onChange, value, getTitle]);

  /** при изменении disabled блокируем дропдаун */
  React.useEffect(() => {
    if (disabled) {
      setIsOpened(false);
    }
  }, [disabled]);

  /** при изменении value обновляем поле ввода */
  React.useEffect(() => {
    if (value.length > 0) {
      setFieldValue(getTitle(value));
    } else {
      setFieldValue('');
    }
  }, [value, getTitle]);

  return (
    <div className={classes}>
      <Input
        className={cnDropdown('input')}
        value={fieldValue}
        placeholder={getTitle(value)}
        onChange={setFieldValue}
        onFocus={handleFocus}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      <div className={cnDropdown('options')}>
        {isOpened &&
          options.map((option) => {
            const isVisible =
              fieldValue.length === 0 ||
              option.value.toLowerCase().includes(fieldValue.toLowerCase());

            const isSelected = value.some(
              (item) => item.key === option.key && item.value === option.value,
            );

            const classes = cnDropdown('option', { selected: isSelected });

            return (
              isVisible && (
                <div
                  className={classes}
                  key={option.key}
                  onClick={() => {
                    if (isSelected) {
                      onChange(
                        value.filter(
                          (item) =>
                            item.key !== option.key &&
                            item.value !== option.value,
                        ),
                      );
                    } else {
                      onChange([...value, option]);
                    }
                  }}
                >
                  {option.value}
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default MultiDropdown;
