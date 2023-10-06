import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '@/components/icons/BackIcon';
import Text, { TextColor, TextTag, TextView } from '@components/Text';

export type BackButtonProps = {
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = React.useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <div className={className} onClick={handleClick}>
      <BackIcon color="primary" />
      <Text tag={TextTag.Span} view={TextView.P20} color={TextColor.Primary}>
        Back
      </Text>
    </div>
  );
};

export default React.memo(BackButton);
