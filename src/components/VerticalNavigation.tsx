import { useState } from 'react';
import { Home, Grid3x3, PlayCircle, DollarSign, Heart, Plus, X, Menu, ListChecks } from 'lucide-react';
import { NavLink } from './NavLink';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import mobileLogo from '@/assets/anvevoice-mobile-logo.png';
import desktopLogo from '@/assets/anvevoice-orb-logo.png';
const navItems = [{
  icon: Home,
  label: 'Home',
  path: '/'
}, {
  icon: Grid3x3,
  label: 'Features',
  path: '/#features'
}, {
  icon: PlayCircle,
  label: 'Demo',
  path: '/demo'
}, {
  icon: DollarSign,
  label: 'Pricing',
  path: '/offers'
}, {
  icon: ListChecks,
  label: 'Waiting List',
  path: '/waiting-list'
}, {
  icon: Heart,
  label: 'Contact',
  path: '/contact'
}];
export const VerticalNavigation = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Desktop navigation
  if (!isMobile) {
    return <motion.nav initial={{
      x: -80,
      opacity: 0
    }} animate={{
      x: 0,
      opacity: 1
    }} transition={{
      duration: 0.5
    }} className="fixed left-0 top-0 h-screen w-20 bg-slate-950 border-r border-border/50 z-50 flex flex-col items-center py-6">
        {/* Logo */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="mb-6">
          <img src={desktopLogo} alt="AnveVoice" className="w-12 h-12 rounded-full object-contain" />
        </motion.div>

        {/* Theme Toggle */}
        

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col gap-6">
          {navItems.map(item => <NavLink key={item.path} to={item.path} end={item.path === '/'} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group" activeClassName="text-primary">
              <motion.div whileHover={{
            scale: 1.1
          }} className="w-10 h-10 rounded-lg bg-slate-900/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:shadow-glow transition-all">
                <item.icon className="w-5 h-5" />
              </motion.div>
              <span className="text-xs font-medium hidden md:block">{item.label}</span>
            </NavLink>)}
        </div>
      </motion.nav>;
  }

  // Mobile navigation
  return <>
      {/* Mobile Header */}
      <motion.div initial={{
      y: -60,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.5
    }} className="fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-border/50 z-50 flex items-center justify-between px-4">
        {/* Logo and Menu Button */}
        <div className="flex items-center gap-3">
          <motion.button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-lg bg-slate-900/50 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors" whileTap={{
          scale: 0.95
        }}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>

          <motion.img src={mobileLogo} alt="AnveVoice" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="w-10 h-10 rounded-full object-contain" />
        </div>

        {/* Theme Toggle */}
        
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        x: '-100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '-100%'
      }} transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }} className="fixed top-16 left-0 bottom-0 w-64 bg-slate-950 border-r border-border/50 z-[70] flex flex-col py-6 px-4">
            {/* Navigation Items */}
            <div className="flex flex-col gap-4">
              {navItems.map(item => <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group p-3 rounded-lg hover:bg-slate-900/30" activeClassName="text-primary bg-slate-900/50">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>)}
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-[60] top-16" />}
      </AnimatePresence>
    </>;
};