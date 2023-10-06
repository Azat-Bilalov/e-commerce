import React from 'react';
import cn from 'classnames';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';

import styles from './MultiDropdown.module.scss';

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
  /** Максимальное количество выбранных опций */
  maxSelected?: number;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  maxSelected,
}: MultiDropdownProps) => {
  const cnDropdown = cn(
    styles.dropdown,
    { [styles.dropdownDisabled]: disabled },
    className,
  );

  const [isOpened, setIsOpened] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState(
    value.length > 0 ? getTitle(value) : '',
  );

  const handleFocus = React.useCallback(() => {
    if (!disabled) {
      setIsOpened(true);
    }

    setFieldValue('');
  }, [disabled]);

  /** при нажатии мимо дропдауна закрываем его */
  React.useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.dropdown}`)) {
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
    <div className={cnDropdown}>
      <Input
        className={styles.dropdownInput}
        value={fieldValue}
        placeholder={getTitle(value)}
        onChange={setFieldValue}
        onFocus={handleFocus}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      <div className={styles.dropdownOptions}>
        {isOpened &&
          options.map((option) => {
            const isVisible =
              fieldValue.length === 0 ||
              option.value.toLowerCase().includes(fieldValue.toLowerCase());

            const isSelected = value.some(
              (item) => item.key === option.key && item.value === option.value,
            );

            const cnDropdownOption = cn(styles.dropdownOption, {
              [styles.dropdownOptionSelected]: isSelected,
            });

            return (
              isVisible && (
                <div
                  className={cnDropdownOption}
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
                      if (maxSelected && value.length >= maxSelected) {
                        return onChange([...value.slice(1), option]);
                      }
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
