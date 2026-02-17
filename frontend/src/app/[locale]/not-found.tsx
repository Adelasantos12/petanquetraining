'use client';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-8">
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="text-accent-orange font-bold tracking-widest uppercase text-xs mb-4 block">Error 404</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-graphite mb-6">Page not found.</h1>
        <p className="text-gray-secondary max-w-md mx-auto mb-10 leading-relaxed">
          The requested resource is unavailable or has been relocated within our high-performance architecture.
        </p>
        <Link href="/">
          <Button size="lg">Return to performance</Button>
        </Link>
      </motion.div>
    </div>
  );
}
