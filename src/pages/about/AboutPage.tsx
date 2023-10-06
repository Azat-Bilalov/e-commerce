import Text, { TextColor, TextTag, TextView } from '@/components/Text';
import styles from './AboutPage.module.scss';

export const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <img
        className={styles.aboutPageImage}
        src="https://lh3.googleusercontent.com/ogw/AKPQZvyBmr_hUih3Yeuj2q5rjejGpDppU7DRJmttOTmHVw=s300-c-mo"
        alt="about"
      />
      <div className={styles.aboutPageContent}>
        <Text view={TextView.Title} tag={TextTag.H1}>
          Hello
        </Text>
        <Text view={TextView.P18} color={TextColor.Accent}>
          I am a front-end developer. I love to create beautiful and functional
          interfaces. I am constantly learning new technologies and improving my
          skills. This is a test project for the KTS studio. I used React, Mobx,
          TypeScript, SCSS, Webpack, and other technologies to create it. I hope
          you enjoy it.
        </Text>
        <Text view={TextView.P18} color={TextColor.Secondary}>
          Link to my github:{' '}
          <a href="https://github.com/azat-bilalov" className={styles.link}>
            azat-bilalov
          </a>
        </Text>
      </div>
    </div>
  );
};
