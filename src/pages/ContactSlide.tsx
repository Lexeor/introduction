import Container from '@/components/Container';
import CVDownloadWidget from '@/components/CVDownloadWidget';
import Multilingual from '@/components/Multilingual';
import SvgIcon from '@/components/SvgIcon';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactSlideProps {
}

const ContactSlide: FC<ContactSlideProps> = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: 'LinkedIN_white',
      url: 'https://www.linkedin.com/in/alexander-tarasov-react/',
      label: 'Alexander Tarasov',
    },
    {
      name: 'Github',
      icon: 'Github_white',
      url: 'https://github.com/Lexeor',
      label: '@Lexeor',
    },
    {
      name: 'Telegram',
      icon: 'Telegram_white',
      url: 'https://t.me/lexeor',
      label: '@lexeor',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission (e.g., open mailto or send to API)
      // window.location.href = `mailto:your@email.com?subject=Portfolio Contact&body=${encodeURIComponent(message)}`;
      setMessage('');
    }
  };

  return (
    <Container className="pb-10 pt-16">
      <div
        className={cn(
          'px-6 sm:px-12 py-12 rounded-[42px]',
          'bg-cover bg-bottom-right footer__bg sm:bg-none',
          'bg-white/10 backdrop-blur-xl',
          'bg-[url(/exclude.svg)]! pb-62! md:pb-42! lg:pb-22!',
        )}
      >
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-12 text-white"
        >
          <Multilingual translationKey="projects.contact-me" align="left" />
        </motion.h1>

        <CVDownloadWidget />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-white/60 text-sm uppercase tracking-wider mb-8">
              <Multilingual translationKey="contacts.FindMeOn" align="left" />
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-2xl',
                    'bg-gradient-to-r from-white/10 to-transparent hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5',
                    'transition-colors duration-400',
                    'group cursor-pointer',
                  )}
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                    <SvgIcon name={link.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs uppercase tracking-wider">
                      {link.name}
                    </span>
                    <span className="text-white font-medium">{link.label}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 text-sm uppercase tracking-wider mb-8">
              <Multilingual translationKey="contacts.DropMeAMessage" align="left" />
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                className={cn(
                  'relative rounded-2xl overflow-hidden',
                  'transition-all duration-300',
                  isFocused
                    ? 'bg-white/10'
                    : 'bg-white/5',
                )}
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={t('contacts.WriteMe')}
                  rows={5}
                  className={cn(
                    'w-full px-5 py-4 bg-transparent',
                    'text-white placeholder:text-white/30',
                    'resize-none outline-none',
                    'text-base',
                  )}
                />
              </div>

              <motion.button
                type="submit"
                disabled={!message.trim()}
                whileHover={{ scale: message.trim() ? 1.02 : 1 }}
                whileTap={{ scale: message.trim() ? 0.98 : 1 }}
                className={cn(
                  'w-full py-4 px-6 rounded-2xl',
                  'flex flex-row items-center justify-center gap-3',
                  'font-medium text-base',
                  'transition-all duration-300',
                  'bg-blue-500! rounded-2xl! px-4! py-2!',
                  message.trim()
                    ? 'bg-white text-gray-900 hover:bg-white/90'
                    : 'bg-white/10 text-white/40 cursor-not-allowed',
                )}
              >
                <div className="flex flex-row justify-center items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>{t`contacts.SendMessage`}</span>
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default ContactSlide;