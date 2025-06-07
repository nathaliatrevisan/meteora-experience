import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { Project } from './projects';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1d2428] text-white p-6 rounded-lg w-full max-w-2xl relative shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl transition"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">{project.title}</h2>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Vídeo no lugar do GIF - Propriedade 'alt' removida */}
          <div className="flex justify-center md:w-1/2 w-full">
            <video
              src={project.videoUrl}
              // Removido: alt={project.title} // <-- Esta linha foi removida!
              className="w-[180px] h-[360px] object-contain rounded-md md:mx-0 mx-auto"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-center md:text-left">
            <p className="text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>

            <div>
              <p className="font-semibold text-white mb-1">Compatível com:</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {project.compatibility.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-lg text-cyan-400">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-white mb-1">Tecnologias usadas:</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {project.technologies.map((tech, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Image src={tech.icon} alt={tech.label} width={20} height={20} />
                    <span>{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}