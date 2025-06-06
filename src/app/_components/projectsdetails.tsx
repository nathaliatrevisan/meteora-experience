'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
};

type Props = {
  project: Project;
  onClose: () => void;
};

export function ProjectDetails({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white text-black rounded-2xl p-6 max-w-xl w-full relative shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <X size={20} />
          </button>

          <img
            src={project.image}
            alt={project.title}
            className="rounded-xl w-full mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Tecnologias:</strong> {project.technologies.join(', ')}
          </p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              className="inline-block mt-2 text-[#1d2428] bg-[#29F8FF] px-4 py-2 rounded-md font-semibold hover:brightness-110 transition"
            >
              Ver Projeto
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
