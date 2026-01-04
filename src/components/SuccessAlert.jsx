import { motion, AnimatePresence } from "framer-motion";

export default function SuccessAlert({ message, onClose }) {
  return (
    <AnimatePresence>
        {message && (
            <motion.div className="fixed bottom-4 right-4 z-50" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                }}
            >
                <div role="alert" className="alert alert-success shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{message}</span>

                    {onClose && (
                        <button onClick={onClose} className="btn btn-sm btn-ghost ml-auto">✕</button>
                    )}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  );
}