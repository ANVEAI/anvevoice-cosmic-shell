import { Home, Grid3x3, PlayCircle, DollarSign, Heart, Plus, X } from 'lucide-react';
import { NavLink } from './NavLink';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Grid3x3, label: 'Features', path: '/#features' },
  { icon: PlayCircle, label: 'Demo', path: '/demo' },
  { icon: DollarSign, label: 'Pricing', path: '/offers' },
  { icon: Heart, label: 'Support', path: '/contact' },
];

export const VerticalNavigation = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-20 bg-slate-950 border-r border-border/50 z-50 flex flex-col items-center py-6"
    >
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="mb-8 w-12 h-12 rounded-lg bg-slate-900/50 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: theme === 'light' ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'light' ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </motion.div>
      </motion.button>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
            activeClassName="text-primary"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-lg bg-slate-900/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:shadow-glow transition-all"
            >
              <item.icon className="w-5 h-5" />
            </motion.div>
            <span className="text-xs font-medium hidden md:block">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};
