import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../components/Container';
import SvgIcon from '../components/SvgIcon';
import { cn } from '../lib/utils';

interface ContactSlideProps {
}

const ContactSlide: FC<ContactSlideProps> = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div
        className={cn('px-4 sm:px-10 pt-10 pb-10 rounded-[32px] flex items-start md:flex-row flex-col gap-14',
          'bg-cover bg-bottom-right footer__bg sm:bg-none bg-[#181818]/20 backdrop-blur-md h-182 bg-[url(/exclude.svg)]!')}>
        <h1 className="text-[48px] md:text-[48px] mx-2">
          {t('projects.contact-me')}
        </h1>
        <div className="flex flex-col gap-8">
          <SvgIcon name="Github_white" className="w-12 h-12" />
          <SvgIcon name="LinkedIN_white" className="w-12 h-12" />
          <SvgIcon name="Telegram_white" className="w-12 h-12" />
        </div>
      </div>
    </Container>
  );
};

export default ContactSlide;